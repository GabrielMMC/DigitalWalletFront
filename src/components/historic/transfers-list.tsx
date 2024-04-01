'use client'

import React from "react";
import Table from "../table";
import Spinner from "../spinner";
import { Pagination } from "@mui/material";
import { Transfer } from "@/domain/Transfer";
import { moneyMaskBRL } from "@/utils/masks";
import useHistoric from "@/hooks/useHistoric";
import { useContext } from "@/context/user-context";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { MdAttachMoney, MdSearch } from "react-icons/md";
import InputGroup from "../input-group";

const headerOptions = ['ID', 'usuário', 'valor', 'ação']

export default function TransfersList() {
  const { user } = useContext()
  const { getTransfersData, loading, handleSearch, search, paginate, setPaginate } = useHistoric()
  const [transfers, setTransfers] = React.useState<Transfer[]>([])

  React.useEffect(() => {
    const getData = async () => setTransfers(await getTransfersData())

    getData()
  }, [search, paginate.current_page])

  const isSender = (senderId: string) => user?.id === senderId

  return (
    <div className="h-full flex flex-col">
      <div className="w-1/3 mb-5">
        <InputGroup
          label='Pesquisar'
          placeholder="Buscar..."
          onChange={handleSearch}
          Group={
            <div className="whitespace-nowrap border border-s-0 border-solid border-neutral-200 px-3 text-center text-base font-normal leading-[1.6] text-surface dark:border-white/10 dark:text-white" style={{ minWidth: 50 }}>
              {loading ? <Spinner /> : <MdSearch size={25} />}
            </div>
          } />
      </div>

      <Table header={headerOptions}>
        {transfers.length ?
          transfers.map(item => (
            <tr key={item.id} className={`border-b border-neutral-200 dark:border-white/10 ${isSender(item.user_sender_id) ? 'bg-red-50' : 'bg-green-50'}`}>
              <td className="whitespace-nowrap px-6 py-4 font-medium">#{item.id.slice(0, 3)}</td>
              <td className="whitespace-nowrap px-6 py-4">{isSender(item.user_sender_id) ? item.receiver.name : item.sender.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{(moneyMaskBRL(item.amount))}</td>
              {user && <td className="whitespace-nowrap px-6 py-4">{isSender(item.user_sender_id) ?
                <div className="flex items-center justify-center">
                  <FaArrowDown color="#AD2825" />
                  <MdAttachMoney color="#AD2825" size={20} />
                </div>
                :
                <div className="flex items-center justify-center">
                  <FaArrowUp color="#2D8E2D" />
                  <MdAttachMoney color="#2D8E2D" size={20} />
                </div>
              }</td>}
            </tr>
          )) :
          <tr className="border-b border-neutral-200 dark:border-white/10">
            <td colSpan={4} className="whitespace-nowrap px-6 py-4 font-bold text-center text-gray-400">Sem transações no momento</td>
          </tr>}
      </Table>

      {transfers.length > 0 &&
        <div className='flex flex-col flex-1 justify-end self-end'>
          <Pagination
            color='primary'
            shape="rounded"
            count={Math.ceil(paginate.total_pages / paginate.per_page)}
            page={paginate.current_page} onChange={(e, page) => setPaginate((oldState) => ({ ...oldState, current_page: page }))} />
        </div>}
    </div>
  );
}
