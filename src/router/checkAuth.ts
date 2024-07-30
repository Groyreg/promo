export const checkAuth = async (): Promise<boolean> => {
  try {
    // Запрос на бэкенд для проверки аутентификации
    const response = await fetch('/api/v1/');
    if (!response.ok && response.status === 401) {
      throw new Error('Unauthorized');
    }

    return true;
  } catch (error) {
    return false;
  }
};
