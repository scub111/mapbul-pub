import * as React from 'react';
import { Box } from 'grommet';
import { MultiSelectOption as Option } from './Option';
import { MultiSelectSearch as Search } from './Search';
import { MultiSelectTitle as SelectTitle } from './Title';
import styled from 'styled-components';
import { rusalTheme } from 'themes';
import { observer } from 'mobx-react';

type MultiSelectProps = {
  options: Array<string>;
  value: Array<string>;
  onSelect: (value: string) => void;
  onSelectAll: () => void;
  label?: string;
  style?: object;
  disabled?: boolean;
};

export const MultiSelect = observer(
  ({
    options,
    onSelect,
    value,
    onSelectAll,
    label,
    style = {},
    disabled,
  }: MultiSelectProps) => {
    const [visible, setVisible] = React.useState(false);
    const [search, setSearch] = React.useState('');

    const target = useClickOutside(() => setVisible(false));

    const filtered = React.useMemo(() => {
      if (!search) return options;
      return options.filter(it => it.toLowerCase().includes(search.toLowerCase()));
    }, [search, options]);

    return (
      <div
        style={{
          position: 'relative',
          width: 256,
          ...style,
        }}
        ref={target}
      >
        <SelectTitle
          visible={visible}
          onClick={() => setVisible(!visible)}
          chosen={value}
          label={label}
        />

        <OptionGroup visible={visible}>
          <Search onChange={setSearch} value={search} />

          <Option
            onChange={onSelectAll}
            value={value.length === options.length}
            style={{
              borderBottom: `solid 1px ${rusalTheme.palette.Basic200}`,
            }}
            disabled={disabled}
            label="Выбрать все"
          />

          <Box
            style={{
              maxHeight: 215,
              overflowY: 'scroll',
            }}
          >
            {filtered.map((option, i) => (
              <Option
                disabled={disabled}
                key={i}
                value={value.includes(option)}
                onChange={() => onSelect(option)}
                label={option}
              />
            ))}
          </Box>
        </OptionGroup>
      </div>
    );
  },
);

const useClickOutside = (onClickOutside: () => void) => {
  const savedCb = React.useRef(onClickOutside);
  const target = React.useRef<HTMLDivElement>(null);

  React.useEffect((): void | (() => void) => {
    if (target) {
      const handler = (e: MouseEvent) => {
        if (!target.current.contains(e.target as Element)) {
          savedCb.current();
        }
      };

      window.addEventListener('click', handler);
      return () => window.removeEventListener('click', handler);
    }
  });

  return target;
};

const OptionGroup = styled.div<{ visible: boolean }>`
  position: absolute;
  width: 256px;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
  box-shadow: 8px 8px 8px 0 rgba(115, 115, 146, 0.16);
  background-color: white;
  border: solid 1px ${rusalTheme.palette.Basic200};
  z-index: 10;
  visibility: ${props => (props.visible ? 'visible' : 'hidden')};
`;
