import * as React from 'react';
import { Box } from 'grommet';
import { BoxProps } from 'grommet/es6';
import { TRole } from 'interfaces';
import { useState, useCallback } from 'react';
import { TabContainer, TabItem, SubTabContainer, SubTabItem } from './components';
import { withTheme } from 'styled-components';
import { IStyledProps } from 'themes';

export const Tabs: React.FC<IProps & BoxProps> = ({
  onChange,
  selected,
  tabs,
  small,
  children,
  ...rest
}) => {
  return (
    <Box direction="row" {...rest}>
      {tabs.map(item => (
        <Tab
          key={item.id}
          onChange={onChange}
          selected={selected}
          small={small}
          {...item}
        />
      ))}
      {children}
    </Box>
  );
};

const Tab: React.FC<ITabProps & IStyledProps> = withTheme(({ selected,
  id,
  text,
  onChange,
  small,
  children
}: ITabProps & IStyledProps) => {

  const [showSubMenu, setShowSubMenu] = useState<boolean>(false);

  const onClick = useCallback(
    (id: string) => {
      id && onChange && onChange(id);
      // if (!!children) {
      //   setShowSubMenu(false);
      // }
    },
    [showSubMenu],
  )

  const onMouseEnter = useCallback(
    () => {
      if (!!children) {
        setShowSubMenu(true);
      }
    },
    [showSubMenu],
  )

  const onMouseLeave = useCallback(
    () => {
      setShowSubMenu(false);
    },
    [showSubMenu],
  )

  return (
    <TabContainer
      active={selected === id || children && children.some(item => selected === item.id)}
      small={small}
      onMouseLeave={onMouseLeave}
    >
      <TabItem
        onClick={() => onClick(id)}
        onMouseEnter={() => onMouseEnter()}
      >
        {text}
      </TabItem>
      {showSubMenu && (
        <SubTabContainer>
          {children.map(item => <SubTabItem
            key={item.id}
            active={selected === item.id}
            onClick={() => onClick(item.id)}
          >
            {item.text}
          </SubTabItem>)
          }
        </SubTabContainer>
      )
      }
    </TabContainer>
  );
});

export namespace Tabs {
  export type TTabsProps = IProps;
  export type TTabProps = ITabOptions;
}

export interface ITabProps extends ITabOptions, React.ComponentProps<any> {
  selected?: string;
  onChange?: (id: string) => void;
  small?: boolean;
}

export interface ITabOptions {
  text: string | React.ReactNode;
  id?: string;
  disabled?: boolean;
  roles?: TRole[];
  children?: Array<ITabOptions>;
}

interface IProps {
  selected?: string;
  onChange?: (id: string) => void;
  tabs: Array<ITabOptions>;
  small?: boolean;
}
