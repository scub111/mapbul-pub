import * as React from 'react';
import { Box } from 'grommet';
import {
  Form,
  MobxForm,
  isRequired,
  isEmail,
} from '@we-ui-components/form';
import { observable } from 'mobx';
import { ICompany, CallerType } from 'interfaces';
import { P } from 'utils';
import { Title } from '@we-ui-components/base';
import { observer } from 'mobx-react';
import { maxLength, isLengthBetween, limitLength } from 'utils/validators';
import { StyledInput } from 'ui';

@observer
export class CreateOrganization extends React.Component<{
  initData?: Partial<ICompany>;
  organizationType: CallerType;
}> {
  formRef: MobxForm;

  defaultData: Partial<ICompany> = {
    name: '',
    shortName: '',
    address: '',
    phone: '',
    email: '',
    ogrn: '',
    inn: '',
    kpp: '',
    meta: {
      bankName: '',
      bankIdentificationCode: '',
      paymentAccount: '',
      correspondentAccount: '',
      directorLastName: '',
      directorFirstName: '',
      directorPatronymic: '',
      directorFullName: {
        lastName: '',
        firstName: '',
        middleName: '',
      },
      bik: '',
    },
  };

  @observable
  data: Partial<ICompany> = this.props.initData || this.defaultData;

  onValidate = () => this.formRef.validateFields();

  render() {
    const defaultFieldWidth = '361px';

    const isUL = this.props.organizationType === CallerType.UL;

    const kppRules = isUL ? [isLengthBetween(9, 9)] : []
    const ogrnRules = isUL ? [isLengthBetween(13, 13)] : [isLengthBetween(15, 15)]

    return (
      <Box width="100%" pad="xlarge" style={{ backgroundColor: 'white' }}>
        <Form
          ref={(ref: any) => (this.formRef = ref)}
          data={this.data}
          {...({} as any)}
        >
          <Box>
            <Title style={{ paddingBottom: '24px' }} size="large">
              Общая информация об организации
            </Title>

            <Box direction="row" justify="between" align="start">
              <StyledInput
                name={P<ICompany>(p => p.kpp)}
                style={{ width: defaultFieldWidth }}
                label="КПП"
                placeholder="Введите КПП"
                rules={kppRules}
                mask="^[0-9]+$"
                normalize={(value: string) => limitLength(value, 9)}
              />

              <StyledInput
                name={P<ICompany>(p => p.ogrn)}
                style={{ width: defaultFieldWidth }}
                label="ОГРН"
                placeholder="Введите ОГРН"
                rules={ogrnRules}
                mask="^[0-9]+$"
                normalize={(value: string) => limitLength(value, isUL ? 13 : 15)}
              />
            </Box>

            <StyledInput
              style={{ width: '100%' }}
              name={P<ICompany>(p => p.name)}
              size="xlarge"
              label="Полное наименование"
              placeholder="Полное наименование организации"
              rules={[isRequired]}
            />

            <StyledInput
              name={P<ICompany>(p => p.shortName)}
              style={{ width: 400 }}
              size="xlarge"
              label="Сокращённое наименование"
              placeholder="Сокращённое наименование организации"
              rules={[isRequired]}
            />

            <StyledInput
              style={{ width: '100%' }}
              name={P<ICompany>(p => p.address)}
              size="xlarge"
              label="Юридический адрес"
              placeholder="Введите юридический адрес организации"
              rules={[isRequired]}
            />

            <Box direction="row" justify="between" align="start">
              <StyledInput
                name={P<ICompany>(p => p.email)}
                style={{ width: defaultFieldWidth }}
                label="E-mail"
                placeholder="Введите E-mail организации"
                rules={[isRequired, isEmail]}
              />
              <StyledInput
                name={P<ICompany>(p => p.phone)}
                style={{ width: defaultFieldWidth }}
                label="Телефон"
                placeholder="Введите телефон организации"
                rules={[
                  isRequired,
                  maxLength(200, 'Превышена максимальная длина текста'),
                ]}
              />
            </Box>
          </Box>

          <Box pad={{ top: 'medium' }}>
            <Title style={{ paddingBottom: '24px' }} size="large">
              Генеральный директор организации
            </Title>
            <Box direction="row" justify="between">
              <StyledInput
                name={P<ICompany>(p => p.meta.directorFullName.lastName)}
                style={{ width: '234px' }}
                label="Фамилия"
                placeholder="Введите фамилию"
                rules={[isRequired]}
              />

              <StyledInput
                name={P<ICompany>(p => p.meta.directorFullName.firstName)}
                style={{ width: '234px' }}
                label="Имя"
                placeholder="Введите имя"
                rules={[isRequired]}
              />

              <StyledInput
                name={P<ICompany>(p => p.meta.directorFullName.middleName)}
                style={{ width: '234px' }}
                label="Отчество"
                placeholder="Введите отчество"
                rules={[isRequired]}
              />
            </Box>
          </Box>
        </Form>
      </Box>
    );
  }
}
