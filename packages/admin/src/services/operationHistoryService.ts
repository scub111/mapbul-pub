import { api } from './api';
import { TProcessType, IOperationHistory } from 'interfaces';
import { ENDPOINTS } from './endpoints';

export function getOperationHistories(
  id: string,
  processType: TProcessType,
): Promise<Array<IOperationHistory>> {
  return api.get(ENDPOINTS.operationHistories(id, processType));
}
