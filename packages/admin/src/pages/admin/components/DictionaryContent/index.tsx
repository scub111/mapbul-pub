import * as React from 'react';
import './table.scss';
import { useEffect, useCallback } from 'react';
import { ProcessFetchStatus } from 'components';
import { Box } from 'grommet';
import { Button, Text } from '@we-ui-components/base';
import { Table } from '@we-ui-components/rc-table';
import { ListStoreConstructor } from 'stores/core/ListStoreConstructor';
import { observer } from 'mobx-react';
import { DictionaryIcon } from '..';

interface IDictionaryContentProps<T> {
  caption: React.ReactNode;
  columns: any[];
  store: ListStoreConstructor<T>;
  allowCreate?: (data: T) => boolean;
  allowPrivateEdit?: (data: T) => boolean;
  allowEdit?: (data: T) => boolean;
  disablePrivateEdit?: (data: T) => boolean;
  disableEdit?: (data: T) => boolean;
  allowDelete?: (data: T) => boolean;
  disableDelete?: (data: T) => boolean;
  dataFn?: (data: Array<T>) => Array<T>;
  onCreateClick?: () => void;
  onPrivateEditClick?: (data: T) => void;
  onEditClick?: (data: T) => void;
  onRemoveClick?: (data: T) => void;
}

// const PAGE_SIZE = 10;

export const DictionaryContent = observer(
  <T extends object>({
    caption: Caption,
    columns,
    store,
    allowCreate,
    allowPrivateEdit,
    allowEdit,
    disablePrivateEdit,
    disableEdit,
    allowDelete,
    disableDelete,
    onCreateClick,
    onPrivateEditClick,
    onEditClick,
    onRemoveClick,
  }: IDictionaryContentProps<T>) => {
    useEffect(() => {
      store.init();
      store.fetch();
    }, [store]);

    const onCreateClickHandler = useCallback(() => {
      onCreateClick && onCreateClick();
    }, [onCreateClick]);
    const onPrivateEditClickHandler = useCallback(
      (data: T) => {
        onPrivateEditClick && onPrivateEditClick(data);
      },
      [onPrivateEditClick],
    );
    const onEditClickHandler = useCallback(
      (data: T) => {
        onEditClick && onEditClick(data);
      },
      [onEditClick],
    );
    const onRemoveClickHandler = useCallback(
      (data: T) => {
        onRemoveClick && onRemoveClick(data);
      },
      [onRemoveClick],
    );

    const extendColumns = (inits: Array<any>) => {
      const copyInits = [...inits];
      if (allowPrivateEdit || allowEdit || allowDelete) {
        copyInits.push({
          sortable: false,
          width: 120,
          pinned: 'right',
          render: (value: any, data: T) => (
            <Box direction="row" justify="center" gap="20px">
              {allowPrivateEdit && allowPrivateEdit(data) && (
                <DictionaryIcon
                  size="16px"
                  glyph="Password"
                  disable={disablePrivateEdit && disablePrivateEdit(data)}
                  onClick={() => onPrivateEditClickHandler(data)}
                />
              )}
              {allowEdit && allowEdit(data) && (
                <DictionaryIcon
                  size="16px"
                  glyph="Edit"
                  disable={disableEdit && disableEdit(data)}
                  onClick={() => onEditClickHandler(data)}
                />
              )}
              {allowDelete && allowDelete(data) && (
                <DictionaryIcon
                  glyph="PrintFormRemove"
                  size="20px"
                  disable={disableDelete && disableDelete(data)}
                  onClick={() => onRemoveClickHandler(data)}
                />
              )}
            </Box>
          ),
        });
      }
      return copyInits.map(column => ({ ...column, suppressMenu: true }));
    };

    return (
      <>
        <Box direction="row" justify="between">
          {Caption}
          {allowCreate && (
            <Button
              style={{ width: 224, marginBottom: 20 }}
              onClick={onCreateClickHandler}
            >
              <Text size="medium" color="white">
                Добавить пользователя
              </Text>
            </Button>
          )}
        </Box>
        <ProcessFetchStatus
          isLoading={
            store.fetchStatus === 'init' ||
            store.fetchStatus === 'first_fetching'
          }
          error={store.fetchError}
        >
          <Box className="dictionary-content">
            <Table
              columns={extendColumns(columns)}
              data={store.data}
              isPending={store.isPending}
              dataLayerConfig={store.dataFlow}
              onChangeDataFlow={store.onChangeDataFlow}
            />
          </Box>
        </ProcessFetchStatus>
      </>
    );
  },
);
