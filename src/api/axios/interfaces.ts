import { JSXElementConstructor, ReactElement } from 'react';

export interface IError {
  code?: string;
  error?: string;
}

export interface IInterceptors {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}
