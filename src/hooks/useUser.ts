import { useState } from "react";
import { User } from "@/domain/User";
import useSearch from "./useSearch";
import { Paginate } from "@/domain/Pagination";
import { getUsers } from "@/services/user";
import useAlert from "@/utils/alert";

const useUser = () => {
  const { errorAlert } = useAlert()
  const [loading, setLoading] = useState(false)
  const { search, handleSearch } = useSearch()
  const [paginate, setPaginate] = useState(Paginate)

  const getUsersData = async () => {
    setLoading(true)
    const { data, ok, error, pagination } = await getUsers<User[]>(search, paginate.current_page);
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

  return { loading, getUsersData, search, handleSearch, paginate, setPaginate }
}

export default useUser