import {PROCESS_TYPE} from 'interfaces';

export function getTypeByUrlType(type: string): PROCESS_TYPE {
  return type.toUpperCase() as PROCESS_TYPE;
}

export const generateProductUrl = (
  root: string,
  type: PROCESS_TYPE,
  id: string,
  options?: any,
) => {
  let url = `/${root}?type=${type.toLowerCase()}&id=${id}`;

  if (options.claimId) {
    url = `/${root}?type=${type.toLowerCase()}&id=${id}&claimId=${
      options.claimId
    }`;
  }

  return url;
};
