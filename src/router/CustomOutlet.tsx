import React, { ReactElement, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Layout from '@pages/Layout';

// import { checkAuth } from './checkAuth';
import { ICustomOutlet } from './interfaces';

const CustomOutlet = ({ isWithBasicLayout, isPrivate }: ICustomOutlet): ReactElement | null => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAccess = async (): Promise<void> => {
    const isAuth = true;
    //  TODO сделать авторизацию
    // const isAuth = await checkAuth();

    !isAuth && navigate('/ui/login');

    setIsAuthenticated(isAuth);
  };

  const onChangeRoute = (): void => {
    isPrivate && checkAccess();
  };

  useEffect(onChangeRoute, [pathname]);

  const isAccess = isPrivate ? isAuthenticated : true;

  if (!isAccess) return null;

  if (isWithBasicLayout) {
    return <Layout />;
  }

  return <Outlet />;
};

export default CustomOutlet;
