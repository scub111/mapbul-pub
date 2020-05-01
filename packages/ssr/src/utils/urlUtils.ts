export const clearUrl = (url: string): string => {
  return url.replace(/\\/g, '/');
};

export const getActive = (url: string, pathname: string): boolean => {
  if (url === '/[lang]') {
    return url === pathname;
  } else {
    return pathname.includes(url);
  }
};
