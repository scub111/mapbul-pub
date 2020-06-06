import * as React from 'react';
import { useState, useRef } from 'react';
import { Button, Title, Text } from '@we-ui-components/base';
import { observer, useLocalStore } from 'mobx-react-lite';
import { Box, BoxProps } from 'grommet';
import { useStores } from 'stores';
import { Form, MobxForm, Input, isRequired } from '@we-ui-components/form';
import { RegisterModal } from 'pages/RegisterModal';
import background from './background.svg';
import illustration from './illustration.svg';
import logo from 'src/assets/logo.svg';
import { ButtonEx } from 'ui/ButtonEx';
import { Spinner2 } from 'ui/Spinner2';

export const LoginPage = () => {
  return (
    <Box
      style={{
        backgroundColor: 'white',
        backgroundImage: `url(${background})`,
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
      }}
      height="100vh"
      width="100vw"
      align="center"
    >
      <Box margin={{ top: '89px' }} align="center" direction="row">
        <Box align="start" justify="center">
          <Logo margin={{ bottom: '34px' }} />
          <WelcomeMessage margin={{ bottom: '40px' }} />

          <Box direction="row" align="start" width="843px">
            <LoginForm background="white" flex={{ grow: 1 }} />
            <img
              style={{ marginTop: '-112px', marginLeft: '-116px' }}
              src={illustration}
            ></img>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const LoginForm = observer((props: BoxProps) => {
  const formRef = useRef<MobxForm>(null);
  const { user, modals } = useStores();

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string>('');

  const credentials = useLocalStore(() => ({
    login: '',
    password: '',
  }));

  const onRegister = () =>
    modals.openModal(() => <RegisterModal />, null, {
      width: '843px',
    });

  const onSubmit = async () => {
    const { login, password } = await formRef.current.validateFields();

    setPending(true);

    try {
      await user.login(login, password);
    } catch (err) {
      console.error(err);
      setError('Введен неверный логин или пароль');
    }

    setPending(false);
  };

  return (
    <Box
      pad={{ horizontal: '40px', top: '40px', bottom: '35px' }}
      style={{
        boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.07)',
        zIndex: 1,
      }}
      {...props}
    >
      <Form ref={formRef} data={credentials} {...({} as any)}>
        <Box align="center">
          <Input
            name="login"
            label="Логин"
            style={{ width: '361px' }}
            placeholder="Введите логин"
            rules={[isRequired]}
          />
          <Input
            name="password"
            type="password"
            label="Пароль"
            style={{ width: '361px' }}
            placeholder="Введите пароль"
            rules={[isRequired]}
          />
        </Box>
      </Form>

      {error && (
        <Box align="center" style={{ paddingTop: '10px' }}>
          <Text size="small" color="Red500">
            {error}
          </Text>
        </Box>
      )}

      <ButtonEx
        size="full"
        style={{ marginTop: '30px' }}
        spinnerRender={
          <Spinner2
            height="16px"
            width="16px"
            color="white"
            style={{ marginRight: 5 }}
          />
        }
        isLoading={pending}
        onClick={() => {
          onSubmit();
        }}
      >
        Войти
      </ButtonEx>

      <Box
        margin={{ top: '26px' }}
        direction="row"
        align="center"
        justify="center"
      >
        <Text color="#6C7486">Нет аккаунта?</Text>
        <Button
          margin={{ left: '5px' }}
          pad={'0'}
          size="auto"
          transparent={true}
          color="#0066B3"
          onClick={onRegister}
        >
          Зарегистрируйтесь
        </Button>
      </Box>
    </Box>
  );
});

const WelcomeMessage = (props: BoxProps) => (
  <Box {...props}>
    <Title size="large" color="white" bold style={{ width: 300 }}>
      Система льготного кредитования
    </Title>
    <Text
      margin={{ top: '22px' }}
      style={{ opacity: 0.5 }}
      size="small"
      color="white"
    >
      Пожалуйста, введите свои данные
    </Text>
  </Box>
);

const Logo: typeof Box = props => (
  <Box direction="row" align="center" {...props}>
    <img width="50px" height="53px" src={logo} />

    <Box margin={{ left: '12px' }}>
      <Title color="white" style={{ fontSize: 19 }}>
        ФНС России
      </Title>
    </Box>
  </Box>
);
