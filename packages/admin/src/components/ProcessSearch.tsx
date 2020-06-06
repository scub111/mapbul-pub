import * as React from 'react';
import { useStores } from 'stores';
import { Box, BoxProps } from 'grommet';
import { TextInput, Icon } from '@we-ui-components/base';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { rusalTheme } from 'themes';
import { P } from 'utils';
import { IProcess } from 'interfaces';
import { useState, useEffect, CSSProperties } from 'react';

export const ProcessSearch = observer(
  ({ style, ...props }: { style?: CSSProperties } & BoxProps) => {
    const [show, setShow] = useState(false);

    const { user, processList } = useStores();

    const filterField = user.isContainOneOfRoles(['BANK'])
      ? P<IProcess>(p => p.bankInnSearch)
      : P<IProcess>(p => p.companyInn);

    const searchText = processList.dataFlow.filters[filterField] || ""

    useEffect(() => {
      return () => {
        processList.onChangeDataFlow({ filters: { [filterField]: undefined } });
      };
    }, []);

    const setSearchParams = (searchText: string, withDebounce?: boolean) => {
      if (searchText) {
        processList.onChangeDataFlow({ filters: { [filterField]: searchText } }, withDebounce)
      } else {
        processList.onChangeDataFlow({ filters: { [filterField]: undefined } });
      }
    };

    return (
      <Box
        direction="row"
        align="center"
        width="100%"
        justify="end"
        style={{ ...style }}
        onKeyDown={event => {
          if (event.key === 'Enter') setSearchParams(searchText, false);
        }}
        {...props}
      >
        {show ? (
          <StyledInput
            style={{
              background: 'white',
              flex: 1,
              padding: '0 0 0 16px',
              height: 48,
            }}
            renderLeft={
              <Box>
                <Icon
                  glyph="Search"
                  size="20px"
                  color="#A4A7AB"
                  style={{ marginRight: 5 }}
                />
              </Box>
            }
            renderRight={
              <Box direction="row">
                {searchText && (
                  <Icon
                    onClick={() => setSearchParams('', false)}
                    glyph="Close"
                    size="20px"
                    color="#D1D3D5"
                    style={{ marginRight: 10, marginLeft: 10 }}
                  />
                )}
                {/* <Box
                  style={{
                    backgroundColor: '#0066B3',
                    width: 80,
                    height: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                  }}
                >
                  <Icon
                    glyph="Search"
                    size="20px"
                    color="white"
                    style={{ marginRight: 5, marginLeft: 5 }}
                  />
                </Box> */}
              </Box>
            }
            placeholder="Введите ИНН"
            value={searchText}
            onChange={value => setSearchParams(value, true)}
          />
        ) : (
          <Icon
            glyph="Search"
            size="20px"
            color="#0066B3"
            style={{ marginRight: 5, marginLeft: 5 }}
            onClick={() => setShow(!show)}
          />
        )}
      </Box>
    );
  },
);

const StyledInput = styled(TextInput)`
  padding: 0px;
  color: ${rusalTheme.palette.BlackTxt};
  font-size: 16px;
  ::placeholder {
    color: ${rusalTheme.palette.Basic400};
  }
`;
