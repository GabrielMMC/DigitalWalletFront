'use client'

import { useContext } from "@/context/user-context";
import { MdAttachMoney } from "react-icons/md";
import AccountMenu from "./account-menu";
import Balance from "./payment/balance";

export default function Navbar() {
  const { user } = useContext()

  return (
    <nav className="flex justify-center bg-white py-2 shadow shadow-gray-300">
      <div className="flex w-full justify-between content align-center">
        <div className="self-center text-2xl font-black font-mono">
          <span className="text-sky-500">VIRTUAL </span>
          <span className="text-sky-900">WALLET</span>
        </div>

        <div className="flex">
          <Balance />
          {user && <AccountMenu user={user} />}
        </div>
      </div>
    </nav>
  )
}