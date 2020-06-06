import * as React from 'react';
import { RouteProps, Route, RedirectProps, Redirect, useLocation } from 'react-router';
import { useStores } from 'stores';
import { observer } from 'mobx-react-lite';
import { TRole } from 'interfaces';

export const RoleRoute: React.FC<IRedirect & {
  roles: Array<TRole>;
} & RouteProps> = observer(props => {
  const { roles, ...rest } = props;
  const { user } = useStores();
  return (
    <ConditionRouter condition={user.isContainOneOfRoles(roles)} {...rest} />
  );
});

export const ConditionRouter = ({
  condition,
  redirect,
  ...rest
}: TConditionRoute) =>
  condition ? <Route {...rest} /> : <RedirectEx to={redirect || '/'} />;

export const RoleRedirect = observer(({ rolesOptions } : TRoleRedirect) => {
  const { user } = useStores();
  const redirectProps = rolesOptions.find(
    (item: TRolesOptions) =>
      !item.roles || user.isContainOneOfRoles(item.roles),
  );
  return redirectProps && <RedirectEx {...redirectProps} />;
});

type TConditionRoute = IRedirect & ICondition & RouteProps;
type TRolesOptions = { roles?: TRole[]; to: string };
type TRoleRedirect = Partial<RedirectProps> & {
  rolesOptions: Array<TRolesOptions>;
};

export const RedirectEx: React.FC<RedirectProps> = observer(props => {
  const { user } = useStores();
  const { pathname, search } = useLocation();
  user.saveRedirectUrl(pathname + search);
  return <Redirect {...props} />;
});

interface IRedirect {
  redirect?: string;
}

interface ICondition {
  condition?: boolean;
}

export * from './AuthenticationGuard';
