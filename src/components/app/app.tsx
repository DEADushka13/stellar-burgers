import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, OrderInfo } from '@components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { ROLE } from '../../utils/constants';

const App = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route element={<ProtectedRoute accessRoles={[ROLE.USER]} />}>
          <Route path='/login' element={<Login />} />
        </Route>
        <Route element={<ProtectedRoute accessRoles={[ROLE.USER]} />}>
          <Route path='/register' element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute accessRoles={[ROLE.USER]} />}>
          <Route path='/forgot-password' element={<ForgotPassword />} />
        </Route>
        <Route element={<ProtectedRoute accessRoles={[ROLE.USER]} />}>
          <Route path='/reset-password' element={<ResetPassword />} />
        </Route>
        <Route element={<ProtectedRoute accessRoles={[ROLE.USER]} />}>
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route element={<ProtectedRoute accessRoles={[ROLE.USER]} />}>
          <Route path='/profile/orders' element={<ProfileOrders />} />
        </Route>
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route element={<ProtectedRoute accessRoles={[ROLE.USER]} />}>
          <Route path='/profile/orders/:number' element={<OrderInfo />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
