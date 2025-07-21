import { debounce } from 'lodash-es';

export const useScreenSize = () => {
  const breakpoint = 640;
  const currentInnerWidth = ref(0);

  const isMobile = computed(() => currentInnerWidth.value < breakpoint);

  let screenCallBack: (value: boolean) => void;
  const onChange = (callback: (value: boolean) => void) => {
    screenCallBack = callback;
  };

  const checkScreenSize = debounce(
    () => {
      currentInnerWidth.value = window.innerWidth;
      if (typeof screenCallBack === 'function') {
        screenCallBack(isMobile.value);
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

  return { onChange, isMobile };
};
