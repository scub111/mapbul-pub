import { track, getTransactionsCount } from './transactionTracker';

jest.mock('services/api', () => {
  return {
    api: {
      get: () =>
        new Promise(resolve => {
          process.nextTick(() => resolve({ status: 'SUCCESS' }));
        }),
    },
  };
});

function createPromise() {
  const result = {} as { promise: Promise<void>; resolve: () => void };
  result.promise = new Promise(resolve => {
    result.resolve = resolve;
  });
  return result;
}

describe('transactionTracker', () => {
  it('Invokes callback on success', async () => {
    const { promise, resolve: callback } = createPromise();
    const mockCallback = jest.fn(callback);

    track('some-string-id', mockCallback);

    await promise;
    expect(mockCallback).toHaveBeenCalled();
  });

  it('Supports adding multiple callbacks for the same transaction', async () => {
    const { promise: promise1, resolve: fn1 } = createPromise();
    const { promise: promise2, resolve: fn2 } = createPromise();
    const { promise: promise3, resolve: fn3 } = createPromise();

    const mockCallback1 = jest.fn(fn1);
    const mockCallback2 = jest.fn(fn2);
    const mockCallback3 = jest.fn(fn3);

    const transactionId = '123';

    track(transactionId, mockCallback1);
    track(transactionId, mockCallback2);
    track(transactionId, mockCallback3);

    await Promise.all([promise1, promise2, promise3]);

    expect(mockCallback1).toHaveBeenCalled();
    expect(mockCallback2).toHaveBeenCalled();
    expect(mockCallback3).toHaveBeenCalled();
  });

  it('Supports adding same callback multiple times', async () => {
    const { promise: promise1, resolve: fn1 } = createPromise();
    const mockCallback1 = jest.fn(fn1);

    const transactionId = '123';

    track(transactionId, mockCallback1);
    track(transactionId, mockCallback1);

    await promise1;

    expect(mockCallback1).toHaveBeenCalled();
    expect(mockCallback1).toHaveBeenCalledTimes(1);
  });

  it('Removes transaction from memory after it successfully resolves', async () => {
    const { promise, resolve: fn1 } = createPromise();
    const mockCallback1 = jest.fn(fn1);

    // no transactions are tracked
    expect(getTransactionsCount()).toBe(0);

    // one transaction is tracked
    track('some-string-id', mockCallback1);

    await promise;
    // no transactions are tracked again
    expect(getTransactionsCount()).toBe(0);
  });
});
