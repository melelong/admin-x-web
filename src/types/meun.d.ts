/** 菜单 */
interface Menu {
  name: string;
  path: string;
  icon: string;
  cache: boolean;
  visible: boolean;
  permission: string;
  component: string;
  titleZh: string;
  meta: Record<string, any>;
  children?: Menu[];
}

interface MenuTab {
  path: string;
  title: string;
  closable: boolean;
  icon: any;
}
