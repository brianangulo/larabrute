import { ENDPOINTS } from '../api/endpoints';
import { useFetch } from './useFetch';
import { FETCH_METHODS } from './useFetch';
//bruteforcing on the backend
export const usePhpBruteForce = async (password) => {
  try {
    const response = await useFetch(FETCH_METHODS.POST, ENDPOINTS.brute, {
      password: password,
    });

    if (response.ok) {
      const timer = await response.json();
      return timer;
    }

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
