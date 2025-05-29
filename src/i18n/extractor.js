import fs from 'fs/promises';
import path from 'path';
import fastGlob from 'fast-glob';
import { fileURLToPath } from 'url';

// 获取当前文件路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 配置参数
const LOCALE_DIR = path.join(__dirname, 'locales');
const SRC_DIR = path.join(__dirname, '../..', 'src');
const FILE_PATTERNS = ['**/*.vue', '**/*.ts', '**/*.tsx'];

// 匹配 t('...') 调用
const TRANSLATE_REGEX = /t\(['"]([\u4e00-\u9fa5a-zA-Z0-9_\s,.?!;:]+?)['"]\)/g;

// 生成稳定键值
function generateKey(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = (hash << 5) - hash + text.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash).toString(36).substring(0, 8);
}

async function runExtraction() {
    // 1. 扫描所有文件
    const files = await fastGlob.glob(FILE_PATTERNS, {
        cwd: SRC_DIR,
        absolute: true,
        ignore: ['**/node_modules/**', '**/dist/**']
    });

    // 2. 提取翻译文本
    const texts = new Set();
    for (const file of files) {
        const content = await fs.readFile(file, 'utf8');
        const matches = [...content.matchAll(TRANSLATE_REGEX)];
        matches.forEach(match => texts.add(match[1]));
    }

    // 3. 确保 locales 目录存在
    await fs.mkdir(LOCALE_DIR, { recursive: true });

    // 4. 加载现有映射文件
    const keyMapPath = path.join(LOCALE_DIR, 'key-map.json');
    const zhPath = path.join(LOCALE_DIR, 'zh-CN.json');
    const enPath = path.join(LOCALE_DIR, 'en-US.json');

    const existingKeyMap = await loadJSON(keyMapPath) || {};
    const existingZh = await loadJSON(zhPath) || {};
    const existingEn = await loadJSON(enPath) || {};

    // 5. 创建新映射
    const newKeyMap = { ...existingKeyMap };
    const newZh = { ...existingZh };
    const newEn = { ...existingEn };

    // 6. 更新映射和语言文件
    texts.forEach(text => {
        // 生成或获取键值
        const key = newKeyMap[text] || generateKey(text);
        newKeyMap[text] = key;

        // 更新中文文件
        if (!(key in newZh)) {
            newZh[key] = text;
        }

        // 更新英文文件
        if (!(key in newEn)) {
            newEn[key] = existingEn[key] || text;
        }
    });

    // 7. 保存文件
    await saveJSON(keyMapPath, newKeyMap);
    await saveJSON(zhPath, newZh);
    await saveJSON(enPath, newEn);

    console.log('🌐 国际化文件更新完成');
}

// 辅助函数
async function loadJSON(filePath) {
    try {
        return JSON.parse(await fs.readFile(filePath, 'utf8'));
    } catch {
        return {};
    }
}

async function saveJSON(filePath, data) {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

runExtraction().catch(console.error);