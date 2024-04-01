import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import { MdAdd, MdAttachMoney } from "react-icons/md";
import { redirect } from 'next/navigation';
import { BiMoneyWithdraw, BiTransfer } from 'react-icons/bi';
import OptionsButton from '../options-button';
import useRecipient from '@/hooks/useRecipient';
import Link from 'next/link';
import { moneyMask } from '@/utils/masks';
import { useContext } from '@/context/user-context';

export default function Balance() {
  const { getRecipientBalance } = useRecipient()
  const { balance, setBalance } = useContext()

  React.useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const responseBalance = await getRecipientBalance()
    setBalance(responseBalance)
  }

  return (
    <OptionsButton>
      <OptionsButton.Header>
        <div className="flex items-center">
          <MdAttachMoney />
          <span className="font-bold text-lg">{moneyMask(balance?.amount)}</span>
        </div>
      </OptionsButton.Header>

      <OptionsButton.Options>
        <div>
          <Link href={'/recharge'}>
            <MenuItem >
              <ListItemIcon>
                <MdAdd />
              </ListItemIcon>
              Recarregar
            </MenuItem>
          </Link>
          <Link href={'/transfer'}>
            <MenuItem >
              <ListItemIcon>
                <BiTransfer />
              </ListItemIcon>
              Transferir
            </MenuItem>
          </Link>
          <Link href={'/withdrawal'}>
            <MenuItem >
              <ListItemIcon>
                <BiMoneyWithdraw />
              </ListItemIcon>
              Sacar
            </MenuItem>
          </Link>
        </div>
      </OptionsButton.Options>
    </OptionsButton>
  );
}