import { ENDPOINTS } from '../api/endpoints';
import { useFetch } from './useFetch';
import { FETCH_METHODS } from './useFetch';

const STATUS = {
  SUCCESS: true,
  FAILED: false,
};

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

  if (response.ok) {
    return STATUS.SUCCESS;
  }
  return STATUS.FAILED;
};
