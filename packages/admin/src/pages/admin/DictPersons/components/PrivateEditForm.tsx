import * as React from 'react';
import * as bcrypt from 'bcryptjs';
import { Box } from 'grommet';
import { Error, StyledInput } from 'ui';
import { Form, MobxForm, isRequired, minLength } from '@we-ui-components/form';
import { observable } from 'mobx';
import { IRate } from 'interfaces';
import { observer } from 'mobx-react';
import { TActionModalProps } from 'components';
import { P, splitUserNames, isDefined } from 'utils';
import { UserInfo } from 'models';
import { Text } from '@we-ui-components/base';

@observer
export class PrivateEditForm extends React.Component<TActionModalProps<IRate>> {
  formRef: MobxForm;

  @observable
  data: Partial<UserInfo> = this.props.config.options.initData;

  onValidate = () =>
    this.formRef.validateFields().then((data: UserInfo) => {
      const splitedData = splitUserNames(data);

      if (isDefined(splitedData.lastName) && isDefined(splitedData.firstName)) {
        return Promise.resolve({
          ...data,
          password: bcrypt.hashSync(data.password, 10),
        });
      }
      return Promise.reject('Фамилия и имя должны быть указаны');
    });

  render() {
    return (
      <Box width="100%" style={{ backgroundColor: 'white', padding: '0' }}>
        <Box pad={{ horizontal: 'xlarge' }}>
          <Form ref={(ref: any) => (this.formRef = ref)} data={this.data}>
            <Box pad={{ vertical: 'large' }}>
              <Box width="100%" style={{ paddingBottom: 22 }}>
                <Text
                  size="small"
                  color="Black"
                  style={{ paddingBottom: '6px' }}
                >
                  ФИО пользователя
                </Text>
                <Text size={'medium'} color="BlackTxt">
                  {this.data.lastName}
                </Text>
              </Box>
              <Box width="100%">
                <StyledInput
                  name={P<UserInfo>(p => p.username)}
                  label="Логин"
                  placeholder="Введите логин"
                  mask="^[a-zA-Z0-9]+$"
                  rules={[isRequired]}
                  style={{ width: '100%' }}
                />
                <StyledInput
                  name={P<UserInfo>(p => p.password)}
                  type="password"
                  label="Пароль"
                  placeholder="Введите пароль"
                  rules={[isRequired, minLength(6, 'Не меньше 6 символов')]}
                  style={{ width: '100%' }}
                />
              </Box>
            </Box>
          </Form>
        </Box>
        {this.props.config.error ? (
          <Error error={this.props.config.error} />
        ) : null}
      </Box>
    );
  }
}
