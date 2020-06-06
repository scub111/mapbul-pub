import * as React from 'react';
import { useCallback } from 'react';
import { Col, Button } from '@we-ui-components/base';
import { Text } from 'grommet';
import { observer } from 'mobx-react-lite';
import { useStores } from 'stores';
import { useHistory } from 'react-router';

interface IProps {}

export const UserInfoPage: React.FC<IProps> = observer(props => {
  const { user } = useStores();

  const history = useHistory();

  const onSubmit = useCallback(() => {
    user.logout().then(() => {
      history.push('/login');
    });
  }, [history, user]);

  return (
    <Col>
      <h3>Информация о пользователе</h3>
      {user && user.userInfo && (
        <>
          <Text>Фамилия: {user.userInfo.lastName}</Text>
          <Text margin={{ bottom: 'medium' }}>
            Имя: {user.userInfo.firstName}
          </Text>
        </>
      )}
      <Button btnType="default" onClick={onSubmit}>
        Выйти
      </Button>
    </Col>
  );
});
