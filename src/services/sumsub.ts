import api from '../lib/api';

interface AccessTokenResponse {
  token: string;
  userId: string;
}

export const generateAccessToken = async (userId: string): Promise<AccessTokenResponse> => {
  const response = await api.post<AccessTokenResponse>(
    '/sumsub/access-token',
    null,
    {
      params: {
        userId,
        levelName: 'basic-kyc-level',
        ttlInSecs: 3600 // 1 hour
      }
    }
  );
  return response.data;
};