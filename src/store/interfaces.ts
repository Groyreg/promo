import { ISetterConfig } from '@store/config';

export type TPartialStore<T> =
  | T
  | Partial<T>
  | {
      _(state: T): T | Partial<T>;
    }['_'];

export type TSetStore<T> = {
  _(partial: TPartialStore<T>, replace?: boolean | undefined, actionName?: string): void;
}['_'];

export type TSetStoreCustom<T> = {
  _(partial: TPartialStore<T>, actionName?: string): void;
}['_'];

export interface IStatus {
  isError: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  message?: string;
}

export type TSetter<T> = (config: ISetterConfig<T>) => T;
export type TToCacheCallback<T> = (state: T) => Partial<T>;
