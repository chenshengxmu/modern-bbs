import api from './axios';

export const fetchBoards = async () => {
  const { data } = await api.get('/boards');
  return data;
};
