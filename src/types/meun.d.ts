/** 菜单 */
interface Menu {
  name: string;
  path: string;
  meta?: Record<string, any>;
  children?: Menu[];
}

interface MenuTabs {
  name: string;
  path?: string;
  title: string;
  meta?: Record<string, any>;
}