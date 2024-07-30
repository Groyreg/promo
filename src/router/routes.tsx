import React, { lazy } from 'react';

import { IRoute } from './interfaces';

export const ROUTES: IRoute[] = [
  {
    component: lazy(() => import('@pages/Main')),
    fallback: <div />,
    isWithPrefix: false,
    path: ['/', '/news', '/subscribes', '/signals', '/favorite', '/faq', '/about'],
  },
  {
    component: lazy(() => import('@pages/NotFound')),
    isPrivate: false,
    isWithBasicLayout: false,
    isWithPrefix: false,
    path: '/404',
  },
];
