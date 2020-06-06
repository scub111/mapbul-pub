import * as React from 'react';
import { Checkbox } from '@we-ui-components/base';

type OptionProps = {
  onChange: () => void;
  value: boolean;
  label: string;
  style?: object;
  disabled?: boolean;
};

export const MultiSelectOption = ({
  value,
  onChange,
  label,
  style = {},
  disabled,
}: OptionProps) => {
  return (
    <Checkbox
      value={value}
      disabled={disabled}
      onChange={onChange}
      label={label}
      style={{ padding: '16px 24px', alignItems: 'flex-start', ...style }}
      size="auto"
    />
  );
};
