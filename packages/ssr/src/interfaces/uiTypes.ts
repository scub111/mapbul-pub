import { Theme } from '@material-ui/core';
import { CSSProperties, ReactElement } from 'react';

export interface IThemeProps {
  theme?: Theme;
}

export type IStyleProps = {
  style?: CSSProperties;
};

export interface WindowProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children?: ReactElement;
};
