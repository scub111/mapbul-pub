import * as React from 'react';
import { Box } from 'grommet';
import { Error } from 'ui';
import { observer } from 'mobx-react';
import { Text } from '@we-ui-components/base';
import { TActionModalProps } from 'components';
import { UserInfo } from 'models';
import { mergeUserNames, printDefined } from 'utils';

@observer
export class RemoveForm extends React.Component<TActionModalProps<UserInfo>> {
  render() {
    const { actionData } = this.props;
    const { data } = actionData;
    return (
      <Box width="100%" style={{ backgroundColor: 'white', padding: '0' }}>
        <Box pad={{ horizontal: 'xlarge', vertical: 'xlarge' }}>
          <Text>
            Вы собираетесь удалить пользователя {`${mergeUserNames(data).lastName} [${printDefined(data.username)}]`} {' '}
            из справочника.
          </Text>
          <Text style={{ paddingTop: '16px' }}>
            Вы уверены, что хотите удалить этого пользователя?
          </Text>
        </Box>
        {this.props.config.error ? (
          <Error error={this.props.config.error} />
        ) : null}
      </Box>
    );
  }
}
