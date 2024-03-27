import { useState } from "react";
import useForm from "./useForm";
import { login } from "@/services/auth";
import { setCookies } from "@/utils/next-api";
import { Response } from "@/models/Request";
import { User } from "@/models/User";

type LoginForm = {
  username: string;
  password: string;
};

const useLogin = (initialState: LoginForm) => {
  const { form, errors, setError, handleChange, handleBlur, hasEmpty } = useForm(initialState);
  const [loading, setLoading] = useState(false)
  const [errorMessage, SetErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (form.password.length < 6) {
      setError('password', 'A senha precisa de 6 caracteres')
      return
    }
    if (!hasEmpty()) {
      return
    }

    setLoading(true)
    const { data, ok, error }: Response<User> = await login(form);
    setLoading(false)

    if (!ok) {
      SetErrorMessage("Credenciais incorretas")
      return
    }
    if (data) {
      setCookies('token', data?.token)
      location.reload()
    }
  }

  return { form, errors, handleChange, handleSubmit, handleBlur, loading, errorMessage }
}

export default useLogin