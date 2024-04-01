import useForm from "./useForm";
import { useState } from "react";
import { createWithdrawal } from "@/services/withdrawal";
import { numberMask, toNumber } from "@/utils/masks";
import useAlert from "@/utils/alert";

type WithdrawalForm = {
  amount: number,
};

const useWithdrawal = (initialState: WithdrawalForm) => {
  const { errorAlert } = useAlert()
  const { form, errors, handleChange, handleBlur, hasEmpty, setError } = useForm(initialState);
  const [loadingSave, setLoadingSave] = useState(false)

  //-------------------------*-------------------------
  const handleWithdrawal = async (e: React.FormEvent<HTMLFormElement>, accountId: string) => {
    e.preventDefault()

    if (!hasEmpty()) {
      return false
    }

    const body = {
      amount: toNumber(form.amount),
      bank_account_id: accountId,
    };

    if (body.amount < 100) {
      setError('amount', "Saque ao menos R$ 1,00")
      return false
    }

    setLoadingSave(true)
    const { data, ok, error } = await createWithdrawal<number>(body);
    console.log('data', data, error)
    setLoadingSave(false)

    if (error) {
      errorAlert(error)
      return false
    }

    if (data && ok) {
      return data
    }
  }

  return { form, errors, handleWithdrawal, handleChange, handleBlur, loadingSave }
}

export default useWithdrawal