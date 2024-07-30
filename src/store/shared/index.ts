import { DARK_THEME, LIGHT_THEME } from '@shared/palette';
import { createStore, ISetterConfig, statuses } from '@store/config';

import { ISharedStore } from './interfaces';

const toggleTheme =
  ({ get, set }: ISetterConfig<ISharedStore>, actionName: string) =>
  (): void => {
    const { theme } = get();

    const isLight = theme.name === 'light';

    set({ theme: isLight ? DARK_THEME : LIGHT_THEME }, actionName);
  };

const setDataToStore = (config: ISetterConfig<ISharedStore>): ISharedStore => ({
  bla: 'sdsd',
  statuses,
  theme: LIGHT_THEME,
  toggleTheme: toggleTheme(config, 'toggleTheme'),
});

const useSharedStore = createStore<ISharedStore>(setDataToStore, 'sharedStore');

export default useSharedStore;
