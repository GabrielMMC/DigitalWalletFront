import { useState } from "react";
import { transfer } from "@/services/transfer";
import useForm from "./useForm";
import { useContext } from "@/context/user-context";
import { toNumber } from "@/utils/masks";
import useAlert from "@/utils/alert";

type TransferForm = {
  amount: number;
};

const useTransfer = (initialState: TransferForm) => {
  const { errorAlert } = useAlert()
  const { balance, setBalance } = useContext()
  const [loading, setLoading] = useState(false)
  const { form, errors, handleChange, handleBlur } = useForm(initialState);

  const handleTransfer = async (e: React.FormEvent<HTMLFormElement>, userId: string) => {
    e.preventDefault()
    const amount = toNumber(form.amount)

    setLoading(true)
    const { data, ok, error } = await transfer({ amount }, userId);
    setLoading(false)

    if (error) {
      errorAlert(error)
      return []
    }

    if (data && ok) {
      setBalance({ isWithdrawal: true, amount: balance!.amount - amount })
      return data;
    }

    return [];
  }

  return { loading, errors, handleTransfer, form, handleChange, handleBlur }
}

export default useTransfer