'use client';

import React from 'react';
import logout from '@/app/actions/logout';
import { getUser } from '@/services/auth';
import { User } from '@/models/User';

type IUserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const UserContext = React.createContext<IUserContext | null>(null);

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (context === null) {
    throw new Error('useContext deve estar dentro do Provider');
  }
  return context;
};

export function UserContextProvider({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User | null;
}) {
  const [userState, setUser] = React.useState<User | null>(user);

  React.useEffect(() => {
    async function validate() {
      const { ok } = await getUser();
      if (!ok) await logout();
    }

    validate();
  }, [userState]);

  return (
    <UserContext.Provider value={{ user: userState, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
