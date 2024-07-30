import React, { Fragment, ReactElement, Suspense } from 'react';
import { Route } from 'react-router-dom';
import CustomOutlet from '@app/router/CustomOutlet';

import { IRoute } from './interfaces';

// Вынести это в отдельный компонент невозможно тк react-router-dom 6 начинает ругаться что внутри Routes должен быть
// только Route или Fragment
export const renderRoute = (
  {
    path: incomingPath,
    component: Component,
    fallback = <div />,
    isWithPrefix = true,
    isWithBasicLayout = true,
    isPrivate = true,
  }: IRoute,
  index: number,
): ReactElement | null => {
  const render = (pathItem: string): ReactElement => {
    const path = isWithPrefix ? `/ui${pathItem}` : pathItem;

    return (
      <Route key={path} element={<CustomOutlet isPrivate={isPrivate} isWithBasicLayout={isWithBasicLayout} />} path="/">
        <Route
          /* так сделано нарочно, иначе конфликт исправлений между prettier и eslint */
          /* eslint-disable-next-line react/no-children-prop */
          element={<Suspense children={<Component />} fallback={fallback} />}
          index={path === '/'}
          path={path}
        />
      </Route>
    );
  };

  if (Array.isArray(incomingPath)) return <Fragment key={index}>{incomingPath.map(render)}</Fragment>;

  const path = isWithPrefix ? `/ui${incomingPath}` : incomingPath;

  return (
    <Route key={path} element={<CustomOutlet isPrivate={isPrivate} isWithBasicLayout={isWithBasicLayout} />} path="/">
      <Route
        key={path}
        /* так сделано нарочно, иначе конфликт исправлений между prettier и eslint */
        /* eslint-disable-next-line react/no-children-prop */
        element={<Suspense children={<Component />} fallback={fallback} />}
        index={path === '/'}
        path={path}
      />
    </Route>
  );
};
