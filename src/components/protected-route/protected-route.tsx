import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { RootState } from 'src/services/store';
import { Role } from '@utils-types';

export const ProtectedRoute = ({ accessRoles }: { accessRoles: Role[] }) => {
  const { isInit, isLoading, user } = useSelector(
    (state: RootState) => state.user
  );

  if (isLoading || !isInit) {
    return <div>Загрузка...</div>;
  }

  if (!user || !accessRoles.includes(user.role)) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};
