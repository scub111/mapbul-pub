import * as React from 'react';
import { Box } from 'grommet';
import { Text, Icon } from '@we-ui-components/base';
import { rusalTheme } from 'themes';

type MultiSelectTitleProps = {
  visible: boolean;
  onClick: () => void;
  chosen: Array<string>;
  label: string;
};

export const MultiSelectTitle = ({
  onClick,
  chosen,
  label,
  visible,
}: MultiSelectTitleProps) => (
  <div
    onClick={onClick}
    style={{
      height: '42px',
      borderTopLeftRadius: '4px',
      borderTopRightRadius: '4px',
      backgroundColor: '#ffffff',
      borderBottom: '2px solid #4740a1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 16,
    }}
  >
    <TitleText chosen={chosen} label={label} />
    <Icon
      color="#4740a1"
      size="16px"
      style={{
        marginRight: 11,
        zIndex: 0,
      }}
      glyph={visible ? 'ArrowUp' : 'ArrowDown'}
    />
  </div>
);

type MultiSelectTitleTextProps = {
  chosen?: Array<string>;
  label: string;
};

function TitleText({ chosen, label }: MultiSelectTitleTextProps) {
  const text = () => {
    if (!chosen?.length) return label;
    if (chosen.length === 1) return chosen[0];
    return (
      <Box direction="row">
        Выбрано
        <Box
          margin={{ left: '10px' }}
          pad="3px 8px"
          style={{ borderRadius: 4, fontSize: '11px' }}
          background={rusalTheme.palette.Purple500}
        >
          {chosen.length}
        </Box>
      </Box>
    );
  };

  return (
    <Text
      style={{
        fontSize: '14px',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      }}
    >
      {text()}
    </Text>
  );
}
