import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay = 500): string => {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  const handlerCb = (): void => {
    setDebouncedValue(value);
  };

  const debounceInput = (): (() => void) => {
    const handler = setTimeout(handlerCb, delay);

    return () => {
      clearTimeout(handler);
    };
  };

  useEffect(debounceInput, [value]);

  return debouncedValue;
};
