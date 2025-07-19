export const useAppLoading = () => {
  const isAppLoaded = ref(false);

  onMounted(() => {
    const appLoading = document.getElementById('app-loading-container');
    if (appLoading) {
      appLoading.style.transition = 'opacity 2048ms ease-in';
      appLoading.style.opacity = '0';
      setTimeout(() => {
        appLoading.remove();
      }, 2048);
    }

    setTimeout(() => {
      isAppLoaded.value = true;
    }, 520);
  });

  return {
    isAppLoaded,
  };
};
