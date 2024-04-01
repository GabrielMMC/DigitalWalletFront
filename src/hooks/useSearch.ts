import { useRef, useState } from "react";

const useSearch = () => {
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);
  const [search, setSearch] = useState('')

  const handleSearch = ({ target }: { target: HTMLInputElement }) => {
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }

    searchTimeout.current = setTimeout(() => setSearch(target.value), 500);
  };

  return { search, handleSearch }
}

export default useSearch