const successStatus = 200;
const badRequest = 400;

export const AVAILABLE_STATUS_NUMBERS: number[] = [successStatus, badRequest];
export const BASE_API_URL = import.meta.env.VITE_BASE_PATH || '/api'; // http://localhost:8080 or base api url
export const TIMEOUT = 40000;

export const LOG_ON_DEV = (message: string): void => {
  if (process.env.NODE_ENV === 'development') {
    console.info(message);
  }
};
