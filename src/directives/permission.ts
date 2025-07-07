import type { Directive, DirectiveBinding } from 'vue';
import { usePermissionStore } from '@/store/modules/permission';

const permission: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const { value } = binding;
    const permissionStore = usePermissionStore();

    if (value && Array.isArray(value) && value.length > 0) {
      const hasPermission = permissionStore.hasPermission(value[0]);

      if (!hasPermission) {
        // 根据指令参数决定是隐藏还是禁用
        if (value[1] === 'disable') {
          el.classList.add('is-disabled');
          if (el.tagName === 'BUTTON') {
            el.setAttribute('disabled', 'disabled');
          }
        } else {
          el.parentNode?.removeChild(el);
        }
      }
    } else {
      throw new Error(`需要指定权限标识，如 v-permission="['user:add']"`);
    }
  },
};

export default permission;
