import * as React from 'react';
import { TextInput, Icon } from '@we-ui-components/base';
import { Box } from 'grommet';

type MultiSelectSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export const MultiSelectSearch = ({
  value,
  onChange,
}: MultiSelectSearchProps) => {
  const handleResetSearch = () => onChange('');

  return (
    <TextInput
      value={value}
      onChange={(value: string) => onChange(value)}
      placeholder="Найти в списке"
      renderLeft={<Icon color="Basic500" glyph="Search" size="16px" />}
      renderRight={
        <Box onClick={handleResetSearch}>
          <Icon color="Basic500" glyph="Close" size="16px" />
        </Box>
      }
      style={{
        width: '100%',
        backgroundColor: 'white',
        padding: '16px 23px',
      }}
    />
  );
};
