'use client'

import React from "react";
import { useContext } from "@/context/user-context";
import { Balance } from "@/domain/Balance";
import { getCookie } from "@/utils/next-api";
import pusherJs from "pusher-js";
import Echo from "laravel-echo";

interface Window {
  Pusher: any
}

declare var window: Window;

const Socket: React.FC = () => {
  const [echo, setEcho] = React.useState<Echo | null>(null)
  const { user, setBalance } = useContext()

  const getEcho = async () => {
    const token = await getCookie('token')

    if (!token || !user) return

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

    echo.private(`user.${user.id}`).listen('.SendBalance', (balance: Balance) => {
      console.log('connected', balance)
      setBalance(balance)
    })

    setEcho(echo)
  }

  React.useEffect(() => {
    getEcho()

    return () => {
      if (!echo || !user) return
      echo.leave(`user.${user.id}`)
    }
  }, [user])

  return (<></>);
};

export default Socket;