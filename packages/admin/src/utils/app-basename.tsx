import * as React from 'react';

type BaseName = string;

const AppBaseNameContext = React.createContext<BaseName>(undefined);

export const AppBaseNameProvider = AppBaseNameContext.Provider;
export const useAppBaseName = () => React.useContext(AppBaseNameContext);
