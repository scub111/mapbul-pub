import * as React from 'react';
import { Box } from 'grommet';
import { Title } from '@we-ui-components/base';
import { CloseIcon, Spinner } from 'ui';
import { withTheme } from 'styled-components';
import { IStyledProps } from 'themes';
// import background from '../../assets/images/header.png';
import background from '../../../assets/images/header.png';

// interface IHedaerProps {
//   title: string;
//   onClose: () => void;
// }
//
// export const Header = ({ title, onClose }: IHedaerProps) => (
//   <Box
//     direction="row"
//     justify="between"
//     align="center"
//     pad={{ horizontal: 'xlarge', vertical: 'large' }}
//     style={{ borderBottom: '1px solid rgb(231, 236, 247)' }}
//   >
//     <Box direction="row" style={{ alignItems: 'baseline' }}>
//       <Title size="small" style={{ marginRight: '16px' }}>
//         {title}
//       </Title>
//     </Box>
//     <CloseIcon hover={true} onClick={onClose} />
//   </Box>
// );

interface IHederProps {
  onClose: () => any;
  title: string;
  pending: boolean;
}

export const Header = withTheme(
  ({ pending, title, onClose, theme }: IHederProps & IStyledProps) => (
    <Box
      direction="row"
      justify="between"
      align="center"
      pad={{ horizontal: 'xlarge', vertical: 'large' }}
      style={{ backgroundImage: `url(${background})`, height: 100 }}
    >
      <Box
        direction="row"
        style={{ alignItems: pending ? 'center' : 'baseline' }}
      >
        <Title
          size="large"
          color="StandardWhite"
          style={{ marginRight: '16px', maxWidth: '500px' }}
        >
          {title}
        </Title>
        {pending && <Spinner style={{ width: 20, height: 20 }} />}
      </Box>
      <CloseIcon hover={true} fill="white" onClick={onClose} />
    </Box>
  ),
);
