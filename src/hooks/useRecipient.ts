import { useState } from "react";
import { Balance } from "@/domain/Balance";
import { getBalance } from "@/services/recipient";
import useAlert from "@/utils/alert";

const useRecipient = () => {
  const { errorAlert } = useAlert()
  const [loading, setLoading] = useState(false)

  const getRecipientBalance = async () => {
    setLoading(true)
    const { data, ok, error } = await getBalance<Balance>();
    setLoading(false)

    if (error) {
      errorAlert(error)
      return { amount: 0, isWithdrawal: false }
    }

    if (data && ok) {
      return data;
    }

    return { amount: 0, isWithdrawal: false };
  }

  return { loading, getRecipientBalance }
}

export default useRecipient