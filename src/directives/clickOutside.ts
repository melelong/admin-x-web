import { DirectiveBinding, ObjectDirective } from 'vue';

const handlerMap = new WeakMap<HTMLElement, (event: MouseEvent) => void>();

const clickOutsideDirective: ObjectDirective = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const handler = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };

    handlerMap.set(el, handler);

    document.addEventListener('click', handler, true);
  },
  unmounted(el: HTMLElement) {
    const handler = handlerMap.get(el);

    if (handler) {
      document.removeEventListener('click', handler, true);
      handlerMap.delete(el);
    }
  },
};

export default clickOutsideDirective;
