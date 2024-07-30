import { RefObject, useEffect } from 'react';

/**
 * Хук для обработки кликов вне элемента.
 *
 * @param {RefObject<HTMLElement>} ref - ссылка на элемент.
 * @param {Function} callback - функция, которая будет вызвана при клике вне элемента.
 */

export const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void): void => {
  const handleListeners = (): (() => void) => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  };

  useEffect(handleListeners, [ref, callback]);
};
