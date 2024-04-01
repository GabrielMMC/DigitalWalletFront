'use client'

import React from "react";
import Table from "../table";
import { User } from "@/domain/User";
import { Pagination } from "@mui/material";
import { MdSearch } from "react-icons/md";
import InputGroup from "../input-group";
import Spinner from "../spinner";
import ModalTransfer from "../modal-transfer";
import useUser from "@/hooks/useUser";

const headerOptions = ['nome', 'email', 'ações']

export default function UsersList() {
  const { getUsersData, loading, handleSearch, search, paginate, setPaginate } = useUser()
  const [users, setUsers] = React.useState<User[]>([])

  React.useEffect(() => {
    const getData = async () => setUsers(await getUsersData())

    getData()
  }, [search, paginate.current_page])

  return (
    <div className="h-full flex flex-col">
      <div className="w-1/3 mb-5">
        <InputGroup
          label='Pesquisar'
          placeholder="Buscar..."
          onChange={handleSearch}
          Group={
            <div className="whitespace-nowrap border border-s-0 border-solid border-neutral-200 px-3 py-[0.25rem] text-center text-base font-normal leading-[1.6] text-surface dark:border-white/10 dark:text-white" style={{ minWidth: 50 }}>
              {loading ? <Spinner /> : <MdSearch size={25} />}
            </div>
          } />
      </div>
      <Table header={headerOptions}>
        {users.length ?
          users.map(item => (
            <tr key={item.id} className="border-b border-neutral-200 dark:border-white/10">
              <td className="whitespace-nowrap px-6 py-4 font-medium">{item.name}</td>
              <td className="whitespace-nowrap px-6 py-4">{item.email}</td>
              <td className="whitespace-nowrap px-6 py-4"><ModalTransfer userId={item.id} /></td>
            </tr>
          )) :
          <tr className="border-b border-neutral-200 dark:border-white/10">
            <td colSpan={3} className="whitespace-nowrap px-6 py-4 font-bold text-center text-gray-400">Sem usuários no momento</td>
          </tr>}
      </Table>

      {users.length > 0 &&
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
