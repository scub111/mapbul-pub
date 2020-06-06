import * as React from 'react';
import { Box, BoxProps } from 'grommet';
import { Title, Tabs, Text, TDataItemProps } from '@we-ui-components/base';
import { CloseIcon, ProposalDetailStatus, Spinner } from 'ui';
import { PROCESS_TYPE, TProcessType } from 'interfaces';
import { DownloadFileBox } from './DownloadFileBox';
import styled, { withTheme } from 'styled-components';
import { IStyledProps } from 'themes';
import background from 'assets/images/header.png';

export type TAB_ID = PROCESS_TYPE | 'COUNT';

interface IHederProps {
  onClose: () => any;
  title: string;
  status: any;
  type: TProcessType;
  pending: boolean;
  children: React.ReactNode;
}

export const Header = withTheme(
  ({
    pending,
    title,
    status,
    type,
    onClose,
    theme,
    children,
  }: IHederProps & IStyledProps) => (
    <Box
      direction="column"
      justify="between"
      align="start"
      pad={{ horizontal: 'xlarge', vertical: 'large' }}
      style={{ backgroundImage: `url(${background})`, height: 150 }}
    >
      <Box
        direction="row"
        justify="between"
        align="center"
        style={{ width: '100%' }}
      >
        <Title
          size="large"
          style={{ marginRight: '16px' }}
          color="StandardWhite"
        >
          {title}
        </Title>
        <CloseIcon size="large" hover={true} onClick={onClose} fill="white" />
      </Box>
      {pending ? (
        <Spinner style={{ width: 20, height: 20 }} />
      ) : (
        <Box
          direction="row"
          justify="start"
          align="center"
          margin={{ top: '15px' }}
        >
          <Box
            style={{
              padding: '7px 20px 10px 20px',
              border: '2px solid white',
              borderRadius: 4,
            }}
          >
            <ProposalDetailStatus data={{ status, type }} size="small" />
          </Box>
          {children}
        </Box>
      )}
    </Box>
  ),
);

interface ITabsProps {
  selected: string;
  onChange: (id: any) => void;
  tabs: Array<{ id: string; text: string }>;
}

export const TabsPanel = ({ selected, onChange, tabs }: ITabsProps) => (
  <div style={{ borderBottom: '1px solid rgb(231, 236, 247)' }}>
    <Box pad={{ horizontal: 'xlarge' }}>
      <Tabs selected={selected} onChange={onChange} tabs={tabs}></Tabs>
    </Box>
  </div>
);

export const Loader = () => (
  <Box align="center" justify="center" style={{ height: 500 }}>
    Загрузка...
  </Box>
);

export const Body = (props: { children: React.ReactNode; style?: object }) => (
  <div>
    <Box
      pad={{ horizontal: 'xlarge', bottom: 'xlarge' }}
      direction="row"
      justify="between"
      style={props.style}
    >
      {props.children}
    </Box>
  </div>
);

export const Bullet = styled.div`
  width: 10px;
  height: 10px;
  position: relative;
  flex: 0 0 auto;
  background-color: ${props => props.theme.palette.Basic400};
  border-radius: 2px;
  border-top-right-radius: 1px;
  border-bottom-right-radius: 1px;
  margin-right: 12px;

  &:after {
    content: '';
    position: absolute;
    left: 100%;
    top: 0;
    height: 0;
    width: 0;
    border: 5px solid transparent;
    border-left-color: ${props => props.theme.palette.Basic400};
  }
`;

export const FilesItem: React.FC<TDataItemProps> = ({
  label,
  value,
  bold,
  fileName,
  url,
  ...boxProps
}: {
  label: string;
  value: any[];
  bold: boolean;
  fileName: string;
  url: string;
}) => {
  return (
    <Box flex={{ grow: 1, shrink: 0 }} {...(boxProps as BoxProps)}>
      <Text size="xsmall" color="#9698a7" style={{ paddingBottom: '6px' }}>
        {label}
      </Text>
      <Box>
        {value.map(file => (
          <Box direction="row" align="center">
            <Bullet />
            <Text
              key={file.name}
              margin={{ right: 'small' }}
              color="Basic800"
              style={{
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
              }}
            >
              {file.name}
            </Text>
          </Box>
        ))}
      </Box>
      <Box direction="row" margin={{ top: 'xsmall' }}>
        <DownloadFileBox url={url} title={fileName} fileName={fileName} />
      </Box>
    </Box>
  );
};
