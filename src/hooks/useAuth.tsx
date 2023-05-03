import { IUser } from '@/utils/types/UserTypes';

import { useAppSelector } from './useAppSelector';

export const useAuth = (): [boolean, IUser | null] => {
  let authorized: boolean = false;

  const { user } = useAppSelector((state) => state.user);

  if (user && user !== null && user.tokens.accessToken) {
    authorized = true;
  }
  return [authorized, user];
};
