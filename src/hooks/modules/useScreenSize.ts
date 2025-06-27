import { debounce } from 'lodash-es';

import { useSystemStore } from '@/store/modules/systemStore';

export const useScreenSize = (breakpoint = 900) => {
  const systemStore = useSystemStore();
  const isMobile = ref(false);

  const checkScreenSize = debounce(
    () => {
      const mobile = window.innerWidth < breakpoint;

      if (isMobile.value !== mobile) {
        isMobile.value = mobile;
        if (mobile) {
          systemStore.setCollapsed(true);
        }
      }
    },
    200,
    { leading: true },
  );

  onMounted(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize);
    checkScreenSize.cancel();
  });

  return { isMobile };
};
