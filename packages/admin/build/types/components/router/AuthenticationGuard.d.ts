import * as React from 'react';
interface Props {
    render: (props: {
        isAuthenticated: boolean;
    }) => React.ReactNode;
}
export declare const AuthenticationGuard: React.FunctionComponent<Props>;
export {};
