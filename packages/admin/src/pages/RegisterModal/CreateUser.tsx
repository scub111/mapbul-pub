import * as React from 'react';
import { Box } from 'grommet';
import { Form, MobxForm, Input, isRequired } from '@we-ui-components/form';
import { observable } from 'mobx';
import { IAdminUser, ICompany } from 'interfaces';
import { P } from 'utils';
import { Title } from '@we-ui-components/base';
import { observer } from 'mobx-react';
import { isTheSameAs, oneOfLengths } from 'utils/validators';
import styled from 'styled-components';

export function limitLength(value: string | number, limit = 19) {
  return String(value).slice(0, limit);
}

@observer
export class CreateUser extends React.Component<{ initData?: IAdminUser }> {
  formRef: MobxForm;

  defaultData: Partial<IAdminUser> & { repeatPassword: string } = {
    account: {
      username: '',
      password: '',
    },
    person: {
      firstName: '',
      lastName: '',
      meta: {
        permitionDocumentName: '',
        position: '',
        patronymic: '',
      },
    },

    repeatPassword: '',
  };

  @observable
  data: Partial<IAdminUser> = this.props.initData || this.defaultData;

  onValidate = () => this.formRef.validateFields();

  render() {
    const defaultFieldWidth = '370px';

    return (
      <Box width="100%" background="white" pad="40px">
        <Form
          ref={(ref: any) => (this.formRef = ref)}
          data={this.data}
          {...({} as any)}
        >
          <Title style={{ paddingBottom: '24px' }} size="large">
            Регистрация
          </Title>

          <Box direction="row" justify="between" align="start">
            <StyledInput
              name={P<ICompany>(p => p.inn)}
              style={{ width: defaultFieldWidth }}
              label="ИНН"
              placeholder="Введите ИНН"
              rules={[oneOfLengths([10, 12], 'Введите 10 (12 для ИП) цифр')]}
              mask="^[0-9]+$"
              normalize={(value: string) => limitLength(value, 12)}
            />
          </Box>

          <Box direction="row" justify="between" align="start">
            <StyledInput
              name={P<IAdminUser>(p => p.account.password)}
              type="password"
              style={{ width: defaultFieldWidth }}
              label="Пароль"
              placeholder="Введите пароль"
              rules={[isRequired]}
            />
            <StyledInput
              name="repeatPassword"
              type="password"
              style={{ width: defaultFieldWidth }}
              label="Подтверждение пароля"
              placeholder="Подтвердите пароль"
              rules={[isTheSameAs('account.password', 'Пароли не совпадают')]}
            />
          </Box>
        </Form>
      </Box>
    );
  }
}

const StyledInput = styled(Input)`
  ::placeholder {
    color: ${props => props.theme.palette.Basic500};
  }
`;
