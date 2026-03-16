import api from './axios';

export const fetchLeaderboard = async () => {
  const { data } = await api.get('/users/leaderboard');
  return data;
};

export const fetchUserProfile = async (username: string) => {
  const { data } = await api.get(`/users/profile/${username}`);
  return data;
};
