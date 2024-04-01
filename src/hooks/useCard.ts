import { useState } from "react";
import { Card } from "@/domain/Card";
import useForm from "./useForm";
import { createCard, getCards } from "@/services/card";
import { cardMask, numberMask } from "@/utils/masks";
import useAlert from "@/utils/alert";

type CardForm = {
  number: string,
  brand: string,
  holder_name: string,
  expiration: string,
  holder_document: number | null,
  cvv: number | null,
};

const useCard = (initialState: CardForm) => {
  const { errorAlert } = useAlert()
  const [cvvLength, setCvvLength] = useState(3)
  const [errorMessage, setErrorMessage] = useState('')
  const [loadingSave, setLoadingSave] = useState(false)
  const [loading, setLoading] = useState(true)
  const { form, errors, handleChange, handleBlur, hasEmpty, setField, resetError } = useForm(initialState);

  const getCardsList = async () => {
    setLoading(true)
    const { data, ok, error } = await getCards<Card[]>();
    setLoading(false)

    if (error) {
      setErrorMessage(error)
      return []
    }

    if (data && ok) {
      return data;
    }

    return [];
  }

  //-------------------------*-------------------------
  const handleCreateCard = async (e: React.FormEvent<HTMLFormElement>, addressId: string) => {
    e.preventDefault()

    if (!hasEmpty()) {
      return false
    }


    const { number, cvv, ...rest } = form;
    const body = {
      ...rest,
      holder_document: numberMask(form.holder_document),
      last_four_digits: form.number.substring(form.number.length - 4),
      address_id: addressId,
    };

    setLoadingSave(true)
    const { data, ok, error } = await createCard<Card>(body);
    setLoadingSave(false)

    if (error) {
      errorAlert(error)
      return false
    }

    if (data && ok) {
      return true
    }
  }

  //-------------------------*-------------------------
  const handleCardChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value, cvv, brand } = cardMask(target.value)
    setField('brand', brand)
    setField('number', value)
    resetError('number')

    setCvvLength(cvv)
  }

  return { form, errors, loading, errorMessage, getCardsList, handleCreateCard, handleCardChange, handleChange, handleBlur, loadingSave, cvvLength }
}

export default useCard