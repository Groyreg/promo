import React, { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { IProps } from './interfaces';
import { renderRoute } from './renderRoutes';
import { ROUTES } from './routes';

const AppRouter = ({ routes = ROUTES }: IProps): ReactElement => (
  <Routes>
    <Route element={<Navigate to="/news" />} path="/" />
    {routes.map(renderRoute)}
    <Route element={<Navigate to="/404" />} path="*" />
  </Routes>
);

export default AppRouter;
