import * as React from 'react';
import { Container, Typography } from '@material-ui/core';
import { useTranslation } from 'hooks';
import { IStyleProps } from 'interfaces';

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
    </Typography>
  );
};

export const Footer = ({ style }: IStyleProps) => {
  const { t } = useTranslation();
  return (
    <Container maxWidth="lg" style={{ ...style }}>
      <Typography variant="subtitle1" align="center" color="textSecondary">
        {t('allRightsReserved')}
      </Typography>
      <Copyright />
    </Container>
  );
};
