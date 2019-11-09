declare module '@mapbul-pub/types';

export * from './server';

export type queryFn = (expression: string) => Promise<any>;
