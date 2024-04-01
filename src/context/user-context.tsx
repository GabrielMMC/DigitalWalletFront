'use client';

import React from 'react';
import { getUser, logout } from '@/services/auth';
import { User } from '@/domain/User';
import Echo from 'laravel-echo';
import pusherJs from 'pusher-js';
import { getCookie } from '@/utils/next-api';
import { Balance } from '@/domain/Balance';

interface Window {
  Pusher: any
}

declare var window: Window;

type IUserContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  balance: Balance | null;
  setBalance: React.Dispatch<React.SetStateAction<Balance | null>>;
};

const UserContext = React.createContext<IUserContext | null>(null);

export const useContext = () => {
  const context = React.useContext(UserContext);
  if (context === null) {
    throw new Error('useContext deve estar dentro do Provider');
  }
  return context;
};

export function UserContextProvider({ children, user }: { children: React.ReactNode; user: User | null }) {
  const [userState, setUser] = React.useState<User | null>(user);
  const [balance, setBalance] = React.useState<Balance | null>(null);

  React.useEffect(() => {
    async function validate() {
      const { data, ok } = await getUser<User>();
      if (!ok || !data) return await logout();

      const token = await getCookie('token')
      window.Pusher = pusherJs;

      const echo = new Echo({
        broadcaster: 'pusher',
        key: '648953a3719bc642f0ce',
        authEndpoint: 'http://localhost:8000/broadcasting/auth',
        auth: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
        cluster: 'mt1',
        wsHost: 'localhost',
        wsPort: 6001,
        transports: ['websocket'],
        enabledTransports: ['ws'],
        forceTLS: false,
        disableStats: true,
        encrypted: false,
      })

      echo.private(`user.${data.id}`).listen('.SendBalance', (balance: Balance) => {
        console.log('connected', balance)
        setBalance(balance)
      })
    }

    validate();
  }, [userState]);

  return (
    <UserContext.Provider value={{ user: userState, setUser, balance, setBalance }}>
      {children}
    </UserContext.Provider>
  );
}
