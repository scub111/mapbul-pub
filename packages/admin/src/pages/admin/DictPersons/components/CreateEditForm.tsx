import * as React from 'react';
import * as bcrypt from 'bcryptjs';
import { Box } from 'grommet';
import { Error, StyledInput, CheckboxEx } from 'ui';
import {
  Form,
  MobxForm,
  isRequired,
  isEmail,
  minLength,
} from '@we-ui-components/form';
import { observable, computed } from 'mobx';
import { IRate, IBusinessRole, TRole } from 'interfaces';
import { observer, inject } from 'mobx-react';
import { TActionModalProps } from 'components';
import { P, guid, hasWords } from 'utils';
import { IStores } from 'stores';
import { Title } from '@we-ui-components/base';
import { UserInfoEx } from '..';

@inject('catalogs', 'user')
@observer
export class CreateEditForm extends React.Component<
  TActionModalProps<IRate> & Pick<IStores, 'catalogs' | 'user'>
> {
  formRef: MobxForm;

  creatorType = this.props.catalogs.companies.find(
    item => item.id === this.props.user.userInfo.companyId,
  )?.type;

  defaultData: Partial<UserInfoEx> = {
    accountId: guid(),
    personId: guid(),
    isCreate: true,
    username: '',
    password: null,
    companyId: this.props.user.userInfo.companyId,
    businessRoles: [this.creatorType],
    participantAddress: this.props.user.userInfo.participantAddress,
  };

  @computed
  get roles() {
    return this.props.catalogs.businessRoles
      .filter(
        role =>
          !this.props.catalogs.companyTypes.find(
            type => type.name === role.name,
          ) || role.name === this.creatorType,
      )
      //Hardcode to exclude CORRECTOR role for OBSERVER type company
      .filter(
        role =>
          !(this.creatorType === 'OBSERVER' && role.name === 'CORRECTOR'),
      );
  }

  @observable
  data: Partial<UserInfoEx> =
    this.props.config.options.initData || this.defaultData;

  onValidate = () =>
    this.formRef.validateFields().then((data: UserInfoEx) => {
      data.roles = data.businessRoles.some(role => role === 'ADMINISTRATOR')
        ? [
            'WE_IDENTITY_READ',
            'WE_IDENTITY_WRITE',
            'WE_OAUTH2_READ',
            'WE_OAUTH2_WRITE',
          ]
        : ['WE_IDENTITY_READ'];

      return Promise.resolve({
        ...data,
        password: data.password ? bcrypt.hashSync(data.password, 10) : null,
      });
    });

  onRoleSelect = (role: IBusinessRole, value: boolean) => {
    if (value) {
      if (!this.data.businessRoles.some(i => i === role.name)) {
        this.data.businessRoles.push(role.name as TRole);
      }
    } else {
      this.data.businessRoles = this.data.businessRoles.filter(
        item => item !== role.name,
      );
    }
  };

  render() {
    return (
      <Box width="100%" style={{ backgroundColor: 'white', padding: '0' }}>
        <Box pad={{ horizontal: 'xlarge' }}>
          <Form ref={(ref: any) => (this.formRef = ref)} data={this.data}>
            <Box pad={{ vertical: 'large' }}>
              <Box width="100%">
                <StyledInput
                  name={P<UserInfoEx>(p => p.lastName)}
                  label="ФИО пользователя"
                  placeholder="Введите ФИО пользователя"
                  rules={[
                    isRequired,
                    hasWords(2, 'Фамилия и имя должны быть указаны'),
                  ]}
                  style={{ width: '100%' }}
                />
              </Box>
              {this.data.isCreate && (
                <Box direction="row" justify="between" width="100%">
                  <StyledInput
                    name={P<UserInfoEx>(p => p.username)}
                    label="Логин"
                    placeholder="Введите логин"
                    mask="^[a-zA-Z0-9]+$"
                    rules={[isRequired]}
                    style={{ width: '370px' }}
                  />
                  <StyledInput
                    name={P<UserInfoEx>(p => p.password)}
                    type="password"
                    label="Пароль"
                    placeholder="Введите пароль"
                    rules={[isRequired, minLength(6, 'Не меньше 6 символов')]}
                    style={{ width: '370px' }}
                  />
                </Box>
              )}
              <Box
                direction="row"
                justify="between"
                width="100%"
                style={{ paddingBottom: 6 }}
              >
                <StyledInput
                  name={P<UserInfoEx>(p => p.phone)}
                  label="Телефон"
                  placeholder="Введите телефон"
                  rules={[isRequired]}
                  style={{ width: '370px' }}
                />
                <StyledInput
                  name={P<UserInfoEx>(p => p.email)}
                  label="E-mail"
                  placeholder="Введите E-mail"
                  rules={[isRequired, isEmail]}
                  style={{ width: '370px' }}
                />
              </Box>
              <Title color="Black" style={{ paddingBottom: 26 }}>
                Роль в системе
              </Title>
              <Box direction="row" width="100%" style={{ flexWrap: 'wrap' }}>
                {this.props.catalogs &&
                  this.roles.map((item: IBusinessRole, index: number) => {
                    const disabled =
                      (this.data.isAdministrator &&
                        item.name === 'ADMINISTRATOR') ||
                      item.name === this.creatorType;
                    return (
                      <Box
                        key={index}
                        style={{
                          flex: '1 1 50%',
                          maxWidth: '50%',
                          paddingRight: 30,
                        }}
                      >
                        <CheckboxEx
                          key={index}
                          title={item.displayName}
                          label={item.description}
                          name={item.name}
                          value={this.data.businessRoles.some(
                            i => i === item.name,
                          )}
                          onChange={value =>
                            !disabled && this.onRoleSelect(item, value)
                          }
                          disabled={disabled}
                        />
                      </Box>
                    );
                  })}
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
