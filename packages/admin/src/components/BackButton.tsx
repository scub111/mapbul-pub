import * as React from 'react';
import { Box, BoxProps } from 'grommet';
import { observer } from 'mobx-react';
import arrowLeftSVG from './arrow-left.svg';
import styled from 'styled-components';
import { useStores } from 'stores';
import { CSSProperties } from 'react';
import { Button } from '@we-ui-components/base';
import { useAppBaseName } from 'utils/app-basename';
import { IStyledProps } from 'themes';

type BackButtonProps = { url?: string; border?: boolean; style?: CSSProperties } & BoxProps & IStyledProps;

const BorderedButton = styled(Button)`
  button {
    border: ${(props: BackButtonProps) => props.border ? `2px solid ${props.theme.palette.Blue}` : ''};
  }
`;

export const BackButton = observer(
  ({ style, url, border = true, ...props }: BackButtonProps) => {
    const { routing } = useStores();
    const basename = useAppBaseName();

    return (
      <BorderedButton
        color="Blue"
        pad="13px 31px"
        transparent
        onClick={() => routing.push(url || `/${basename}`)}
        border={border}
        style={{ ...style }}
        {...props}
      >
        <Box direction="row" align="center">
          <img style={{ marginRight: 13 }} src={arrowLeftSVG} />
          Назад
        </Box>
      </BorderedButton>
    );
  },
);
