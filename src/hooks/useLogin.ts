import useForm from "./useForm";
import { useState } from "react";
import { login } from "@/services/auth";
import { setCookies } from "@/utils/next-api";
import { User } from "@/domain/User";
import { redirect } from "next/navigation";
import { useContext } from "@/context/user-context";
import Echo from "laravel-echo";
import pusherJs from "pusher-js";

type LoginForm = {
  email: string;
  password: string;
};

const useLogin = (initialState: LoginForm) => {
  const { form, errors, setError, handleChange, handleBlur, hasEmpty } = useForm(initialState);
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const { setUser } = useContext()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!hasEmpty()) {
      return
    }

    if (form.password.length < 6) {
      setError('password', 'A senha precisa de 6 caracteres')
      return
    }

    setErrorMessage('')
    setLoading(true)
    const { data, ok, error } = await login<User>(form);
    setLoading(false)

    if (error) {
      setErrorMessage(error)
      return
    }

    if (data && ok) {
      setCookies('token', data?.token)
      setUser(data)
    }
  }

  return { form, errors, handleChange, handleSubmit, handleBlur, loading, errorMessage }
}

export default useLogin