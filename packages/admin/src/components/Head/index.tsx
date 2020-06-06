import * as React from 'react';
import styled, { withTheme } from 'styled-components';
import usersSVG from './users.svg';
import { BoxProps, Box } from 'grommet';
import { useStores } from 'stores';
import { useHistory } from 'react-router';
import { observer } from 'mobx-react-lite';
import { useIsLoginRoute } from 'pages/utils';
import { Icon, Title, Text } from '@we-ui-components/base';
import { IStyledChildrenProps } from 'interfaces';
import { mergeUserNames } from 'utils';
import { ProcessSearch, BackButton } from 'components';
import { useRoutes } from 'utils/useRoutes';
import mainLogoPNG from './main_logo.png';

const MainLogo = styled.img`
  width: 62px;
  height: 62px;
`;

export const Head: React.FC<IStyledChildrenProps<BoxProps>> = withTheme(
  observer(({ theme, ...props }: IStyledChildrenProps<BoxProps>) => {
    const history = useHistory();
    const isLogin = useIsLoginRoute();
    const { user, routing } = useStores();
    const Routes = useRoutes();

    const { company } = user;
    const { palette, container } = theme;
    const { minWidth, maxWidth } = container;
    const isShowSearch =
      user.isContainOneOfRoles(['REGULATOR', 'BANK', 'OBSERVER']) &&
      routing.location.pathname === `/${Routes.processes}`;

    return (
      <Box
        style={{
          background: palette.StandardWhite,
          overflow: 'visible',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box
          direction="row"
          align="center"
          style={{
            minWidth,
            maxWidth,
            margin: '0 auto',
            padding: '0px 30px',
            height: 100,
            minHeight: 100,
            width: '100%',
          }}
        >
          <BackButton url="/" border={false} style={{ paddingLeft: 0 }} />
          <Box
            align="center"
            margin={{ right: 'small' }}
            style={{ flex: '1 0 auto' }}
          >
            <MainLogo src={mainLogoPNG} />
          </Box>
          <Box style={{ minWidth: 250, flex: '0 1 auto' }}>
            <Title size="small" color="BlackTxt" bold>
              Система льготного кредитования
            </Title>
          </Box>
          <Box
            direction="row"
            justify="end"
            align="center"
            margin={{ horizontal: '25px' }}
            style={{ flex: '1 1 100%' }}
          >
            {isShowSearch && <ProcessSearch />}
            {user.isContainOneOfRoles(['ADMINISTRATOR']) && (
              <Box
                direction="row"
                onClick={() => history.push(`/${Routes.dictPersons}`)}
                style={{
                  borderLeft: isShowSearch ? '1px solid #CDDDF0' : '',
                  borderRight: '1px solid #CDDDF0',
                  padding: '0 25px',
                  marginLeft: 25,
                  minWidth: 196,
                }}
              >
                <img style={{ marginRight: 13 }} src={usersSVG} />
                <Text size="small" color="BlackTxt">
                  Пользователи системы
                </Text>
              </Box>
            )}
          </Box>
          {!isLogin && user.isAuthorized && (
            <Box
              direction="row"
              justify="end"
              align="center"
              style={{ flex: '1 0 auto' }}
            >
              <Box>
                <Text size="small" color="BlackTxt">
                  {mergeUserNames(user.userInfo).lastName}
                </Text>
                <Text size="small" color="BlackTxt">
                  {company.name}
                </Text>
              </Box>
              <Box
                onClick={() => {
                  user.logoutEx();
                }}
                margin={{ left: 'medium' }}
              >
                <Icon
                  glyph="Logout"
                  size="24px"
                  style={{ opacity: 0.5 }}
                  color="BlackTxt"
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    );
  }),
);
