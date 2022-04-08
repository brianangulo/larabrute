import { ENDPOINTS } from '../api/endpoints';
import { useFetch } from './useFetch';
import { FETCH_METHODS } from './useFetch';

export const useRegister = async (username, score = '0') => {
  // error catcher
  const catcher = (err) => {
    console.error(err);
    return null;
  };
  const response = await useFetch(FETCH_METHODS.POST, ENDPOINTS.register, {
    username: username,
    score: score,
  }).catch(catcher);
  let data = null;
  if (response.ok) {
    data = await response.json().catch(catcher);
    return data;
  }
  return data;
};
