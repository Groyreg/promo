import { IError } from '@app/api/axios/interfaces';
import { create, StoreApi, UseBoundStore } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { IStatus, TPartialStore, TSetStore, TSetStoreCustom, TSetter, TToCacheCallback } from './interfaces';

export interface ISetterConfig<T> {
  effect: TSetStore<IStatus>;
  get: StoreApi<T>['getState'];
  set: TSetStoreCustom<T>;
  storeName: string;
}

export const refreshStatuses =
  <T>({ effect }: ISetterConfig<T>) =>
  (): void => {
    effect(statuses);
  };

export interface IDefaultStore {
  refreshStatuses: ReturnType<typeof refreshStatuses>;
  statuses: IStatus;
}

export const applyQuery = async <S, I extends Record<string, any>, R>(
  { effect }: ISetterConfig<S>,
  query: () => Promise<I | IError>,
  normalize: (data: I) => R,
): Promise<R | null> => {
  effect({ isLoading: true });
  const data = await query();

  const isDataError = checkIsError(data);

  if (isDataError) {
    effect({ isError: true, isLoading: false, message: data.error });

    return null;
  }

  effect({ isLoading: false, isSuccess: true });

  return normalize(data);
};

export const getFields =
  <T>(fields: string | string[]): ((state: T) => T) =>
  (state: T): T => {
    if (!Array.isArray(fields)) {
      return Object.create({ [fields]: state[fields as keyof T] });
    }

    return fields.reduce(
      (acc, field: string) => ({
        ...acc,
        [field]: state[field as keyof T],
      }),
      {} as T,
    );
  };

export const createStore = <T extends IDefaultStore>(setter: TSetter<T>, storeName: string): UseBoundStore<any> =>
  create(
    devtools(
      immer((set: any, get: () => T) =>
        setter({
          effect: setEffect(set, storeName),
          get,
          set: updateStore(set, storeName),
          storeName,
        }),
      ),
      { name: storeName },
    ),
  );

export const createStoreWithCache = <T extends IDefaultStore>(
  setter: TSetter<T>,
  storeName: string,
  toCache: TToCacheCallback<T>,
): UseBoundStore<any> =>
  create(
    persist(
      devtools(
        immer((set: any, get: () => T) =>
          setter({
            effect: setEffect(set, storeName),
            get,
            set: updateStore(set, storeName),
            storeName,
          }),
        ),
        { name: storeName },
      ),
      {
        name: storeName,
        partialize: (state: T) => toCache(state),
      },
    ),
  );

const updateStore =
  <T>(set: TSetStore<T>, storeName: string) =>
  (partial: TPartialStore<T>, actionName: string): void =>
    set(partial, false, `${storeName.replace('Store', '')}/${actionName}`);

const setEffect =
  <T extends IDefaultStore>(set: TSetStore<T>, storeName: string) =>
  (partial: TPartialStore<IStatus>): void =>
    set(
      (state: T): any => ({ statuses: { ...state.statuses, ...partial } }),
      false,
      `${storeName.replace('Store', '')}/new-effect`,
    );

export const checkIsError = (response: Record<string, any>): response is IError =>
  ('error' in response && typeof response.error === 'string') ||
  ('code' in response && typeof response.code === 'string');

export const statuses: IStatus = {
  code: null,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: undefined,
};
