import { useState } from "react";
import { getTransfers } from "@/services/transfer";
import useSearch from "./useSearch";
import { Paginate } from "@/domain/Pagination";
import { Transfer } from "@/domain/Transfer";
import useAlert from "@/utils/alert";

const useHistoric = () => {
  const { errorAlert } = useAlert()
  const [loading, setLoading] = useState(false)
  const { search, handleSearch } = useSearch()
  const [paginate, setPaginate] = useState(Paginate)

  const getTransfersData = async () => {
    setLoading(true)
    const { data, ok, error, pagination } = await getTransfers<Transfer[]>(search, paginate.current_page);
    setLoading(false)

    if (pagination) {
      setPaginate(pagination);
    }

    if (error) {
      errorAlert(error)
      return []
    }

    if (data && ok) {
      return data;
    }

    return [];
  }

  return { loading, getTransfersData, search, handleSearch, paginate, setPaginate }
}

export default useHistoric