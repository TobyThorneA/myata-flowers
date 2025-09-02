import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../store/app/hook';

interface PrivateRouteProps {
  children: React.ReactElement;
}

const PrivateRouteCustom: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useAppSelector(state => state.auth.token);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRouteCustom;
