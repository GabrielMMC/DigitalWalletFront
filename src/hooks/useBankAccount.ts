import useForm from "./useForm";
import { useState } from "react";
import { BankAccount } from "@/domain/BankAccount";
import { createBankAccount, getBankAccounts } from "@/services/bank-account";
import useAlert from "@/utils/alert";

type BankAccountForm = {
  bank: number | null,
  account_number: number | null,
  account_digit: number | null,
  branch_number: number | null,
  branch_digit: number | null,
};

const useBankAccount = (initialState: BankAccountForm) => {
  const { errorAlert } = useAlert()
  const [loading, setLoading] = useState(true)
  const [loadingSave, setLoadingSave] = useState(false)
  const { form, errors, handleChange, handleBlur, hasEmpty } = useForm(initialState);

  const getAccountList = async () => {
    setLoading(true)
    const { data, ok, error } = await getBankAccounts<BankAccount[]>();
    setLoading(false)

    if (error) {
      errorAlert(error)
      return []
    }

    if (data && ok) {
      return data;
    }

    return [];
  }

  //-------------------------*-------------------------
  const handleCreateAccount = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!hasEmpty()) {
      return false
    }

    setLoadingSave(true)
    const { data, ok, error } = await createBankAccount<BankAccount>(form);
    setLoadingSave(false)

    if (error) {
      errorAlert(error)
      return false
    }

    if (data && ok) {
      return true
    }
  }


  return { form, errors, loading, getAccountList, handleCreateAccount, handleChange, handleBlur, loadingSave }
}

export default useBankAccount