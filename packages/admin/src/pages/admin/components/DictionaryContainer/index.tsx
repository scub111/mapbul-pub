import * as React from 'react';
import { PageContainer } from 'components';

export const DictionaryContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <PageContainer>{children}</PageContainer>;
};
