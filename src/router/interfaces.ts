import { JSXElementConstructor, LazyExoticComponent, ReactElement, ReactNode } from 'react';

export interface IRoute {
  // Lazy Loaded component
  component: LazyExoticComponent<() => ReactElement<any, string | JSXElementConstructor<any>>>;
  // Preloader for lazy loading
  fallback?: NonNullable<ReactNode> | null; // default <div />
  // If router is private, this is going to be true
  isPrivate?: boolean; // default true
  isWithBasicLayout?: boolean; // default true
  isWithPrefix?: boolean; // default true
  // Path, like in basic prop
  path: string | string[];
}

export interface ICustomOutlet {
  isPrivate: boolean;
  isWithBasicLayout: boolean;
}

export interface IProps {
  routes?: IRoute[];
}

export interface IRouteMock extends Omit<IRoute, 'component'> {
  component: () => ReactElement;
}
