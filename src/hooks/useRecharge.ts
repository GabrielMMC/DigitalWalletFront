import { useState } from "react";
import { Card } from "@/domain/Card";
import useForm from "./useForm";
import { createCard, getCards } from "@/services/card";
import { createRecharge } from "@/services/recharge";
import { toNumber } from "@/utils/masks";
import useAlert from "@/utils/alert";

type RechargeForm = {
  amount: number,
  installments: number,
};

const useRecharge = (initialState: RechargeForm) => {
  const { errorAlert } = useAlert()
  const { form, errors, handleChange, handleBlur, hasEmpty, setError } = useForm(initialState);
  const [loadingSave, setLoadingSave] = useState(false)

  //-------------------------*-------------------------
  const handleRecharge = async (e: React.FormEvent<HTMLFormElement>, cardId: string) => {
    e.preventDefault()

    if (!hasEmpty()) {
      return false
    }

    const body = {
      amount: toNumber(form.amount),
      installments: toNumber(form.installments),
      card_id: cardId,
    };

    if (body.amount < 100) {
      setError('amount', "Recarregue ao menos R$ 1,00")
      return false
    }

    setLoadingSave(true)
    const { data, ok, error } = await createRecharge<number>(body);
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

  return { form, errors, handleRecharge, handleChange, handleBlur, loadingSave }
}

export default useRecharge