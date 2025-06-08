const svgModules = import.meta.glob<string>('@/assets/svg/*.svg', {
  as: 'raw',
  eager: false,
});

/**
 * 加载 SVG 图标内容
 * @param name SVG 文件名（不带扩展名）
 * @returns SVG 内容字符串的 Promise
 */
export const loadSvg = async (name: string): Promise<string> => {
  const key = `/src/assets/svg/${name}.svg`;

  if (!svgModules[key]) {
    return '';
  }

  try {
    return await svgModules[key]();
  } catch (error) {
    return '';
  }
};

/**
 * 获取所有可用的 SVG 图标名称
 * @returns 图标名称数组
 */
export const getAllSvgNames = (): string[] => {
  return Object.keys(svgModules)
    .map(path => {
      const match = path.match(/\/svg\/(.+)\.svg$/);
      return match ? match[1] : null;
    })
    .filter(Boolean) as string[];
};