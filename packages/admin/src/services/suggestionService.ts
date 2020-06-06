import { api } from './api';
import { ENDPOINTS } from './endpoints';

export function getProposalFilterOptions(
  fieldName: string,
  filterParams?: any,
): Promise<Array<string>> {
  return api
    .get<Record<string, Array<string>>>(ENDPOINTS.processesDistinct(), {
      ...filterParams,
      attributes: fieldName,
    })
    .then(res => res[fieldName]);
}
