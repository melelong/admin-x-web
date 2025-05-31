import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import crypto from 'crypto';

// 动态导入 fast-glob
const fastGlob = await import('fast-glob');

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置参数
const LOCALE_DIR = path.join(__dirname, 'locales');
const SRC_DIR = path.join(__dirname, '../..', 'src');
const FILE_PATTERNS = ['**/*.vue', '**/*.ts', '**/*.tsx'];

// 匹配 t('...') 调用
const TRANSLATE_REGEX = /t\(['"]([\u4e00-\u9fa5a-zA-Z0-9_\s,.?!;:]+?)['"]\)/g;

// 生成稳定的大写KEY（12位更安全）
function generateStableKey(text) {
  const hash = crypto.createHash('sha256');
  hash.update(text);
  const digest = hash.digest('hex');
  return digest.substring(0, 12).toUpperCase();
}

async function runExtraction() {
  console.log('🔍 开始扫描源代码文件...');

  // 扫描所有文件
  const files = await fastGlob.default.glob(FILE_PATTERNS, {
    cwd: SRC_DIR,
    absolute: true,
    ignore: ['**/node_modules/**', '**/dist/**'],
  });

  console.log(`📂 找到 ${files.length} 个文件`);

  // 提取翻译文本和位置信息
  const textUsageMap = new Map(); // 文本 -> [文件路径, ...]
  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf8');
      const matches = [...content.matchAll(TRANSLATE_REGEX)];

      matches.forEach((match) => {
        const text = match[1];
        const locations = textUsageMap.get(text) || [];
        locations.push(file);
        textUsageMap.set(text, locations);
      });
    } catch (error) {
      console.warn(`⚠️ 读取文件失败: ${file}`, error.message);
    }
  }

  // 当前使用的文本集合
  const usedTexts = new Set(textUsageMap.keys());
  console.log(`🔤 提取到 ${usedTexts.size} 个实际使用的翻译文本`);

  // 确保 locales 目录存在
  await fs.mkdir(LOCALE_DIR, { recursive: true });
  console.log(`📁 创建/确认 locales 目录: ${LOCALE_DIR}`);

  // 定义语言文件路径
  const zhPath = path.join(LOCALE_DIR, 'zh-CN.json');
  const enPath = path.join(LOCALE_DIR, 'en-US.json');

  // 加载或初始化语言文件
  let existingZh = {};
  let existingEn = {};

  try {
    const zhContent = await fs.readFile(zhPath, 'utf8');
    existingZh = JSON.parse(zhContent);
    console.log(`📖 已加载现有中文翻译 (${Object.keys(existingZh).length} 项)`);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn('⚠️ 读取中文翻译文件失败:', error.message);
    }
  }

  try {
    const enContent = await fs.readFile(enPath, 'utf8');
    existingEn = JSON.parse(enContent);
    console.log(`📖 已加载现有英文翻译 (${Object.keys(existingEn).length} 项)`);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      console.warn('⚠️ 读取英文翻译文件失败:', error.message);
    }
  }

  // 创建双向映射
  const textToKeyMap = new Map();  // 文本 → KEY
  const keyToTextMap = new Map();  // KEY → 文本

  // 从现有中文文件填充映射
  for (const [key, value] of Object.entries(existingZh)) {
    if (typeof value === 'string') {
      textToKeyMap.set(value, key);
      keyToTextMap.set(key, value);
    }
  }

  console.log(`🗺️ 现有翻译映射: ${textToKeyMap.size} 项`);

  // 准备更新数据
  const newZh = { ...existingZh };
  const newEn = { ...existingEn };
  let addedCount = 0;
  let removedTextCount = 0;

  // 处理每个实际使用的文本
  for (const text of usedTexts) {
    // 如果文本已有映射，跳过
    if (textToKeyMap.has(text)) continue;

    // 生成新KEY
    const key = generateStableKey(text);

    // 检查KEY冲突
    if (keyToTextMap.has(key)) {
      const existingText = keyToTextMap.get(key);
      if (existingText !== text) {
        throw new Error(
          `发现KEY冲突: key=${key}\n` +
          `  现有文本: "${existingText}"\n` +
          `  新文本: "${text}"\n` +
          `解决方案: 修改其中一个文本内容`
        );
      }
    }

    // 添加新映射
    textToKeyMap.set(text, key);
    keyToTextMap.set(key, text);
    newZh[key] = text;
    newEn[key] = existingEn[key] || text; // 保留现有翻译或使用文本
    addedCount++;
  }

  // 步骤1: 识别当前使用的所有KEY
  const usedKeys = new Set();
  for (const text of usedTexts) {
    if (textToKeyMap.has(text)) {
      usedKeys.add(textToKeyMap.get(text));
    }
  }

  // 步骤2: 删除未使用的KEY（翻译文件中）
  let removedKeyCount = 0;

  // 检查中文文件中的未使用KEY
  for (const key of Object.keys(newZh)) {
    if (!usedKeys.has(key)) {
      delete newZh[key];
      removedKeyCount++;
    }
  }

  // 检查英文文件中的未使用KEY
  for (const key of Object.keys(newEn)) {
    if (!usedKeys.has(key)) {
      delete newEn[key];
      removedKeyCount++;
    }
  }

  // 步骤3: 识别并报告源代码中未使用的文本
  const unusedTexts = [];
  for (const [text, key] of textToKeyMap) {
    if (!usedTexts.has(text)) {
      unusedTexts.push({ text, key, locations: [] });
    }
  }

  // 保存文件
  await fs.writeFile(zhPath, JSON.stringify(newZh, null, 2));
  await fs.writeFile(enPath, JSON.stringify(newEn, null, 2));

  console.log('✅ 国际化文件更新完成');
  console.log(`🆕 新增翻译项: ${addedCount}`);
  console.log(`🗑️ 移除未使用KEY: ${removedKeyCount}`);
  console.log(`🔑 当前有效翻译项: ${usedKeys.size}`);
  console.log(`📝 中文文件: ${zhPath}`);
  console.log(`📝 英文文件: ${enPath}`);

  // 报告未使用的文本
  if (unusedTexts.length > 0) {
    console.log('\n⚠️ 检测到源代码中未使用的文本:');
    unusedTexts.forEach((item, index) => {
      console.log(`  ${index + 1}. KEY: ${item.key}`);
      console.log(`     文本: "${item.text}"`);

      // 尝试找到最初定义的位置
      for (const [text, locations] of textUsageMap) {
        if (text === item.text && locations.length > 0) {
          console.log(`     可能位置: ${locations[0]}`);
          break;
        }
      }
    });

    console.log('\n💡 建议:');
    console.log('  1. 检查这些文本是否确实不再使用');
    console.log('  2. 如果确定不再使用，可以安全地从代码中删除');
    console.log('  3. 它们会保留在翻译文件中，但不会被移除');
  }

  // 返回统计信息
  return {
    totalFiles: files.length,
    usedTexts: usedTexts.size,
    addedCount,
    removedKeyCount,
    unusedTexts: unusedTexts.length,
    totalKeys: usedKeys.size
  };
}

// 运行提取
runExtraction()
  .then(stats => {
    console.log('\n✨ 操作成功完成');
    process.exit(0);
  })
  .catch(error => {
    console.error('❌ 提取过程中发生错误:', error.message);
    process.exit(1);
  });