import * as React from 'react';
import './App.styl';
import { Grommet } from 'grommet';
import { RoleRoute, RedirectEx, RoleRedirect } from 'components';
import { AuthenticationGuard } from 'components';
import { Switch, Route } from 'react-router-dom';
import { Theme, rusalTheme } from 'themes';
import { BaseContainer } from 'components';
import { LoginPage, ProcessesPage, DictPersonsPage, Statistics } from 'pages';
import { Modals, ActionModals } from 'components';
import { createGlobalStyle } from 'styled-components';
import { useRoutes } from 'utils/useRoutes';

const GlobalStyle = createGlobalStyle<any>`
  body {
    font-family: ${props => props.theme.fontBase || 'PF Din Text Cond Pro'};
  }
  
  @-webkit-keyframes autofill {
      to {
          color: #666;
          background: transparent;
      }
  }

    input:-webkit-autofill {
        -webkit-animation-name: autofill;
        -webkit-animation-fill-mode: both;
    }
    
    .ag-header-filter-with {
      position: relative;
      
      &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: #e7ecf7;
        z-index: 2;
      }
    }
`;

export const App: React.FC = () => {
  const Routes = useRoutes()
  return (
    <Grommet
      theme={{ ...Theme, ...rusalTheme }}
      plain={true}
      full={true}
      id="grommetRoot"
    >
      <AuthenticationGuard
        render={({ isAuthenticated }) =>
          !isAuthenticated ? (
            <Switch>
              <Route
                exact={true}
                path={`/${Routes.login}`}
                component={LoginPage}
              />
              <RedirectEx to={`/${Routes.login}`} />
            </Switch>
          ) : (
            <BaseContainer>
              <Switch>
                <RoleRoute
                  roles={['REGULATOR', 'BANK', 'CALLER', 'OBSERVER']}
                  exact={true}
                  path={`/${Routes.processes}`}
                  component={ProcessesPage}
                />
                <RoleRoute
                  roles={['BANK', 'REGULATOR', 'OBSERVER']}
                  exact={true}
                  path={`/${Routes.statistics}`}
                  component={Statistics}
                />
                <RoleRoute
                  roles={['ADMINISTRATOR']}
                  exact={true}
                  path={`/${Routes.dictPersons}`}
                  component={DictPersonsPage}
                />
                <RoleRedirect
                  rolesOptions={[
                    {
                      roles: ['REGULATOR', 'BANK', 'CALLER', 'OBSERVER'],
                      to: `/${Routes.processes}`,
                    },
                    {
                      roles: ['ADMINISTRATOR'],
                      to: `/${Routes.dictPersons}`,
                    },
                  ]}
                />
              </Switch>
            </BaseContainer>
          )
        }
      />
      <Modals />
      <ActionModals />
      <GlobalStyle theme={...rusalTheme as any} />
    </Grommet>
  );
};
