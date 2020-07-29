import * as React from 'react';
import { useMediaQuery, Theme } from '@material-ui/core';
import { SimpleList, List, Datagrid, EmailField, TextField } from 'react-admin';

export const CategoryList = (props: any) => {
  const isSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  return (
    <List title="All categories" {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record: any) => record.name}
          secondaryText={(record: any) => record.username}
          tertiaryText={(record: any) => record.email}
        />
      ) : (
          <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
          </Datagrid>
        )}
    </List>
  );
};
