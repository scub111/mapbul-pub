import * as React from 'react';
import { Box, BoxProps } from 'grommet';
import { ArrowUp, ArrowDown } from './icons';
import { Title } from '@we-ui-components/base';

export const Collapse = ({
  children,
  title,
  titleProps,
  prefix,
  collapsable = true,
  ...wrapperProps
}: CollapseProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleCollapse = () => {
    if (collapsable) setIsOpen(!isOpen);
  };

  return (
    <Box style={{ borderRadius: '4px' }} {...wrapperProps}>
      <Box
        onClick={toggleCollapse}
        direction="row"
        align="start"
        {...titleProps}
      >
        {prefix && prefix}

        <Title
          style={{ flex: 1, lineHeight: '32px' }}
          color={titleProps.color}
          size="small"
        >
          {title}
        </Title>

        {collapsable && (
          <OpenStatusIcon
            open={isOpen}
            alignSelf="center"
            color={titleProps.color}
          />
        )}
      </Box>
      {isOpen && children}
    </Box>
  );
};

const OpenStatusIcon = ({
  open,
  color,
  ...props
}: BoxProps & { open: boolean; color: string }) => {
  return (
    <Box {...props}>
      {open ? <ArrowUp color={color} /> : <ArrowDown color={color} />}
    </Box>
  );
};

type CollapseProps = React.PropsWithChildren<BoxProps> & {
  prefix: React.ReactNode;
  title: React.ReactNode;
  titleProps: BoxProps & { color?: string };
  collapsable?: boolean;
};
