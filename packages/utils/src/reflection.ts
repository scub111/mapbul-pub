export const P = <T>(property: (object: T) => void): string => {
  const chaine = property.toString();
  const arr = chaine.match(/(\.)[\S]+/);
  return arr && !!arr.length ? arr[0].slice(1).replace(/;/g, '') : '';
};
