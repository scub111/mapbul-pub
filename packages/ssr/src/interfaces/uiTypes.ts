import { Theme } from '@material-ui/core';
import { CSSProperties } from 'react';

export interface IThemeProps {
  theme?: Theme;
}

export type IStyleProps = {
  style?: CSSProperties;
};

export interface WindowProps {
  // window?: () => Window;
  window?: Window;
};

export interface IPageUrl {
  page: string;
  url: string;
}
