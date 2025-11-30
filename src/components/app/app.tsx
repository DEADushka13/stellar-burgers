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

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ProtectedRoute } from '../protected-route';
import { ROLE } from '../../utils/constants';

const App = () => {
  const navigate = useNavigate();
  const closeModal = () => navigate(-1);
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
        <Route
          path='/feed/:number'
          element={
            <Modal title='Детали заказа' onClose={closeModal}>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали компонента' onClose={closeModal}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route element={<ProtectedRoute accessRoles={[ROLE.USER]} />}>
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='Номер заказа' onClose={closeModal}>
                <OrderInfo />
              </Modal>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
