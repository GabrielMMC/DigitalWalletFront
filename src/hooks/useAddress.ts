import { useState } from "react";
import { getTransfers } from "@/services/transfer";
import useSearch from "./useSearch";
import { Paginate } from "@/domain/Pagination";
import { Transfer } from "@/domain/Transfer";
import { createAddress, getAddresses, getPostalCode } from "@/services/address";
import { Address } from "@/domain/Address";
import useForm from "./useForm";
import useAlert from "@/utils/alert";

type AddressForm = {
  nbhd: string,
  city: string,
  state: string,
  street: string,
  number: string,
  zip_code: string,
  complement: string
};

const useAddress = (initialState: AddressForm) => {
  const { form, errors, setError, handleChange, handleBlur, hasEmpty, setField, setErrors, setForm, resetForm, resetError } = useForm(initialState);
  const { errorAlert } = useAlert()
  const [loading, setLoading] = useState(true)
  const [loadingSave, setLoadingSave] = useState(false)

  const getAddressesList = async () => {
    setLoading(true)
    const { data, ok, error } = await getAddresses<Address[]>();
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
  const handleCreateAddress = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!hasEmpty(['complement'])) {
      return
    }

    setLoadingSave(true)
    const { data, ok, error } = await createAddress<Address>(form);
    console.log('data', data, error)
    setLoadingSave(false)

    if (error) {
      errorAlert(error)
      return
    }

    if (data && ok) {
      return data
    }
  }

  //-------------------------*-------------------------
  const handlePostalCode = async ({ target }: { target: HTMLInputElement }) => {
    const value = target.value.replace(/\D/g, '')

    setField('zip_code', value.slice(0, 8))
    resetError('zip_code');

    if (value.length < 8) return
    const { data, ok, error } = await getPostalCode<any>(value)

    if (!ok) {
      resetForm()
      setError('zip_code', 'CEP inválido')
      return
    }

    setForm({ ...form, state: data.uf, city: data.localidade, nbhd: data.bairro, street: data.logradouro, zip_code: data.cep })
    setErrors({ ...errors, state: null, city: null, nbhd: null, street: null, zip_code: null })
  }

  return { form, errors, loading, getAddressesList, handleCreateAddress, handleChange, handleBlur, handlePostalCode, loadingSave }
}

export default useAddress