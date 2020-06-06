import * as React from 'react';
import mobxStores, { StoresProvider, IStores } from 'stores';
import { App } from './App';
import { Provider as MobxProvider } from 'mobx-react';
import { AppBaseNameProvider } from 'utils/app-basename';
import { api, setApiUrlPrefix } from 'services';
import { useEffect } from 'react';

interface AppProps {
  basename?: string;
  stores?: Partial<IStores>;
  apiPrefix?: string;
}

export const Base: React.FC<AppProps> = ({ basename, stores, apiPrefix }) => {
  if (apiPrefix) {
    setApiUrlPrefix(apiPrefix)
  }

  useEffect(() => api.clearAuthToken(), []);

  if (stores) {
    replaceStores(stores);
  }

  return (
    <StoresProvider stores={mobxStores}>
      <MobxProvider {...mobxStores}>
        <AppBaseNameProvider value={basename}>
          <App />
        </AppBaseNameProvider>
      </MobxProvider>
    </StoresProvider>
  );
};

function replaceStores(storesToReplace: Partial<IStores>) {
  for (const [storeName, store] of Object.entries(storesToReplace)) {
    mobxStores[storeName] = store;
  }
}

export default Base;
