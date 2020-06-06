import * as React from 'react';
import { Box } from 'grommet';
import { Error as UIError } from 'ui';
import { useStores } from 'stores';
import { useState } from 'react';
import { DisableWrap, Text } from '@we-ui-components/base';
import { Footer } from 'components/Footer';
import { CreateOrganization } from './CreateOrganization';
import { useRef } from 'react';
import { IAdminUser, ICompany, CallerType } from 'interfaces';
import { CreateUser } from './CreateUser';
import * as bcrypt from 'bcryptjs';
import { ButtonEx } from 'ui/ButtonEx';
import { userService } from 'services';

enum TSteps {
  ORGANIZATION = 'organization',
  USER = 'user',
}

export const RegisterModal = () => {
  const [step, setStep] = useState(TSteps.USER);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  const [organizationData, setOrganizationData] = useState<Partial<ICompany>>(
    null,
  );
  const [userData, setUserData] = useState<UserFormData>(null);

  const organizationForm = useRef<FormRef<ICompany>>();
  const userForm = useRef<FormRef<UserFormData>>();

  const { modals } = useStores();

  const onSubmit = async (company: any) => {
    setPending(true);

    const { repeatPassword, inn, ...user } = userData;
    const isIP = inn.length === 12;

    const cryptUser = {
      ...user,
      account: {
        username: inn,
        password: bcrypt.hashSync(userData.account.password, 10),
      },
      person: {
        firstName: company.meta.directorFullName.firstName,
        lastName: company.meta.directorFullName.lastName,
      },
    } as any;

    delete cryptUser.repeatPassword;
    if (isIP) delete company.kpp;

    company.inn = inn;
    company.meta.signature = 'signature';

    const cryptData = {
      company,
      users: [cryptUser],
    };

    try {
      if (isIP) await userService.registerCompanyIP(cryptData);
      else await userService.registerCompany(cryptData);
      modals.closeModal();
    } catch (err) {
      setError(err.message);
    }

    setPending(false);
  };

  const onUserSubmit = async () => {
    const userData = await userForm.current.onValidate();
    setUserData(userData);

    setStep(TSteps.ORGANIZATION);
  };

  const onCompanySubmit = async () => {
    const company = await organizationForm.current.onValidate();

    setOrganizationData(company);

    await onSubmit(company);
  };

  // Button component applies its own "loading" state when onClick is a promise
  // we avoid that by provide just a fucntion wrapper around our promises
  const submitHandler = () => {
    setError('');

    const handler = step === TSteps.USER ? onUserSubmit : onCompanySubmit;
    handler();
  };

  return (
    <>
      <Box>
        {step === TSteps.USER ? (
          <CreateUser ref={userForm as any} initData={userData} />
        ) : (
          <CreateOrganization
            ref={organizationForm as any}
            initData={organizationData}
            organizationType={
              userData.inn.length === 10 ? CallerType.UL : CallerType.IP
            }
          />
        )}

        {error ? <UIError error={error} /> : null}
      </Box>

      <DisableWrap disabled={false}>
        <Footer
          justify="between"
          pad={{ horizontal: '40px', vertical: '32px' }}
        >
          <Box direction="row" align="center">
            <Text>Уже есть аккаунт?</Text>
            <ButtonEx
              transparent
              pad="0"
              margin={{ left: '5px' }}
              onClick={() => modals.closeModal()}
              color="Blue"
            >
              Войдите
            </ButtonEx>
          </Box>

          <ButtonEx
            size="auto"
            isLoading={pending}
            pad={{ vertical: '15px', horizontal: '58px' }}
            onClick={submitHandler}
          >
            {step === TSteps.USER ? 'Далее' : 'Создать организацию'}
          </ButtonEx>
        </Footer>
      </DisableWrap>
    </>
  );
};

type FormRef<T = any> = {
  onValidate: () => Promise<T>;
};

type UserFormData = IAdminUser & {
  repeatPassword: string;
  inn: string;
};
