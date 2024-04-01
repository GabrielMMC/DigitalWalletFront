import { useState } from "react";
import useForm from "./useForm";
import { createUser, login } from "@/services/auth";
import { setCookies } from "@/utils/next-api";
import { Response } from "@/domain/Request";
import { User } from "@/domain/User";
import { isValidEmail } from "@/utils/expressions";
import { useContext } from "@/context/user-context";

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

const useRegister = (initialState: RegisterForm) => {
  const { form, errors, setError, handleChange, handleBlur, hasEmpty, resetErrors } = useForm(initialState);
  const { setUser } = useContext()
  const [loading, setLoading] = useState(false)
  const [errorMessage, SetErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!hasEmpty()) {
      return
    }

    if (!isValidEmail(form.email)) {
      setError('email', 'Email inválido')
      return
    }

    if (form.password.length < 6) {
      setError('password', 'A senha precisa de 6 caracteres')
      return
    }

    if (form.confirm_password.length < 6) {
      setError('confirm_password', 'A senha precisa de 6 caracteres')
      return
    }

    if (form.confirm_password !== form.password) {
      setError('password', 'As senhas precisam ser iguais')
      setError('confirm_password', 'As senhas precisam ser iguais')
      return
    }

    resetErrors()
    setLoading(true)
    const { data, ok, error } = await createUser<User>(form);
    setLoading(false)

    if (error) {
      SetErrorMessage(error)
      return
    }
    if (data) {
      setCookies('token', data?.token)
      setUser(data)
    }
  }

  return { form, errors, handleChange, handleSubmit, handleBlur, loading, errorMessage }
}

export default useRegister