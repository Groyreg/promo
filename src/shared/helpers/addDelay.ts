export const addDelay = (delay = 0): Promise<void> => new Promise((resolve: () => void) => setTimeout(resolve, delay));
