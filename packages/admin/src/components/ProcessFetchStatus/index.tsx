import * as React from 'react';
import { ReactNode } from 'react';
import { Spinner, Error } from 'ui';
import { NormalizedError } from 'services/api/errorHandler';
import { PropsWithChildren } from 'react';
import { ReactRenderFn } from 'interfaces';

export const ProcessFetchStatus: React.FC<PropsWithChildren<ReactNode> & {
  error: NormalizedError;
  isLoading: boolean;
  successRender?: ReactRenderFn
}> = ({ isLoading, error, children, successRender }) => {
  if (error && error.message) {
    return <Error error={error && error.message} />;
  }

  if (isLoading) {
    return <Spinner style={{ width: 24, height: 24 }} />;
  }

  return <>
    {children}
    {successRender && successRender()}
  </>
};
