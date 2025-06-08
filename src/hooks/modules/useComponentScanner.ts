// 组件信息类型
export interface ComponentInfo {
  name: string;        // 组件名称（基于文件路径）
  filePath: string;    // 文件相对路径（相对于src/views）
  fullPath: string;    // 完整文件路径
  importPath: string;  // 导入路径（用于动态导入）
  directory: string;   // 所在目录
  group: string;       // 分组名称（目录的第一级）
}

export function useComponentScanner() {
  const components = ref<ComponentInfo[]>([]);
  const loading = ref(true);

  // 扫描视图组件
  const scanComponents = async () => {
    try {
      // 使用 Vite 的 glob 导入功能获取所有视图组件
      const modules = import.meta.glob('/src/views/**/*.vue');

      const componentList: ComponentInfo[] = [];

      for (const filePath in modules) {
        // 提取相对路径（移除 '/src/views/' 前缀）
        const relativePath = filePath.replace(/^\/src\/views\//, '');

        // 提取目录和文件名
        const pathParts = relativePath.split('/');
        const fileName = pathParts.pop() || '';
        const directory = pathParts.join('/');

        // 移除文件扩展名
        const componentName = fileName.replace(/\.vue$/, '');

        // 获取分组（第一级目录）
        const group = pathParts[0] || '根目录';

        // 创建组件信息对象
        componentList.push({
          name: componentName,
          filePath: relativePath,
          fullPath: filePath,
          importPath: filePath,
          directory,
          group,
        });
      }

      components.value = componentList;
    } catch (error) {
      components.value = [];
    } finally {
      loading.value = false;
    }
  };

  onMounted(async () => {
    await scanComponents();
  });

  return {
    components,
    loading,
    refresh: scanComponents,
  };
}