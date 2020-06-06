import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';

interface Props {
  render: (props: { isAuthenticated: boolean }) => React.ReactNode;
}

export const AuthenticationGuard = observer(({ render }: Props) => {
  const { user, catalogs } = useStores();
  if (
    user.status === 'fetching' ||
    (catalogs.fetchStatus === 'init' && user.status === 'success')
  ) {
    return null;
  }

  return (
    <>
      {render({
        isAuthenticated: !user.isLogouting && user.status === 'success',
      })}
    </>
  );
});
