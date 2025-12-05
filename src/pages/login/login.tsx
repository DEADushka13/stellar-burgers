import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getUserError } from '../../features/selectors/user';
import { loginUser } from '../../features/slices/userSlice';
import { AppDispatch } from 'src/services/store';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const error = useSelector(getUserError);

  const from = (location.state as any)?.from?.pathname || '/';

  useEffect(
    () =>
      // Очищаем ошибку при размонтировании компонента
      () => {
        dispatch({ type: 'user/clearError' });
      },
    [dispatch]
  );

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then(
      (result: { type: string }) => {
        if (result.type === 'user/loginUser/fulfilled') {
          navigate(from, { replace: true });
        }
      }
    );
  };

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
