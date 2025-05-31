export const getLang = () => {
  return localStorage.getItem('lang');
};

export const setLang = (lang: 'zh-CN' | 'en-US') => {
  localStorage.setItem('lang', lang);
};