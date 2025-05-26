/** 菜单 */
interface Menu {
    name: string
    path: string
    meta?: Record<string, any>
    children?: Menu[]
}