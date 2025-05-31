/** 菜单 */
interface Menu {
  name: string;
  path: string;
  meta?: Record<string, any>;
  children?: Menu[];
}

interface MenuTab {
  path: string;
  title: string;
  closable: boolean;
  icon: any
}