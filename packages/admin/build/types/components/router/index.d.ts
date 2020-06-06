import * as React from 'react';
import { RouteProps, RedirectProps } from 'react-router';
import { TRole } from 'interfaces';
export declare const RoleRoute: React.FC<IRedirect & {
    roles: Array<TRole>;
} & RouteProps>;
export declare const ConditionRouter: ({ condition, redirect, ...rest }: TConditionRoute) => JSX.Element;
export declare const RoleRedirect: React.FunctionComponent<TRoleRedirect>;
declare type TConditionRoute = IRedirect & ICondition & RouteProps;
declare type TRolesOptions = {
    roles?: TRole[];
    to: string;
};
declare type TRoleRedirect = Partial<RedirectProps> & {
    rolesOptions: Array<TRolesOptions>;
};
export declare const RedirectEx: React.FC<RedirectProps>;
interface IRedirect {
    redirect?: string;
}
interface ICondition {
    condition?: boolean;
}
export * from './AuthenticationGuard';
