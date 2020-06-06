import { observable } from 'mobx';
import { api } from '../api';
import { ENDPOINTS } from 'services/endpoints';
import { createAsyncPolling } from 'utils/polling';

interface TrackingInfo {
  listeners: Array<() => void>;
  pollingPromise: Promise<any>;
  abort: () => void;
}

const trackedTransactions = observable.map<string, TrackingInfo>();

export function getTransactionsCount() {
  return trackedTransactions.size;
}

export function clearAll() {
  for (let value of trackedTransactions.values()) {
    value.abort();
  }
  trackedTransactions.clear();
}

export function usePendingTransaction() {
  return trackedTransactions.size > 0;
}

export function track(transactionId: string, callback: () => void) {
  if (trackedTransactions.has(transactionId)) {
    const value = trackedTransactions.get(transactionId);
    if (!value.listeners.some((l: () => void) => l === callback)) {
      value.listeners.push(callback);
    }
    return trackedTransactions.get(transactionId);
  }

  const abortController = new AbortController();

  const pollingPromise = createAsyncPolling({
    asyncFn: () => api.get(ENDPOINTS.transaction(transactionId)),
    interval: 3000,
    shouldStop: response => {
      return response.status === 'SUCCESS';
    },
    signal: abortController.signal,
  });

  pollingPromise.then(() => {
    const value = trackedTransactions.get(transactionId);
    trackedTransactions.delete(transactionId);

    value.listeners.forEach((l: () => void) => l());
  });

  trackedTransactions.set(transactionId, {
    pollingPromise,
    abort: () => abortController.abort(),
    listeners: [callback],
  });

  return pollingPromise;
}
