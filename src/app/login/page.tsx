'use client'

import Button from "@/components/button";
import ErrorAlert from "@/components/error-alert";
import Input from "@/components/input";
import Spinner from "@/components/spinner";
import useLogin from "@/hooks/useLogin";
import Link from "next/link";
import React from "react";

export default function Login() {
  const { form, errors, handleChange, handleSubmit, handleBlur, loading, errorMessage } = useLogin({
    username: '',
    password: ''
  })

  return (
    <form className="bg-white p-10 rounded shadow shadow-gray-300" onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <h1 className="text-4xl font-bold">LOGIN</h1>
      </div>
      <div className="mt-5">
        <Input
          label="Username"
          name="username"
          value={form.username}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.username} />
      </div>
      <div className="mt-5">
        <Input
          label="Password"
          name="password"
          value={form.password}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.password} />
      </div>
      <div className="mt-10 flex justify-between items-center">
        <div className="me-4">
          <ErrorAlert>{errorMessage}</ErrorAlert>
          <p className="text-sm font-medium text-gray-500">Ou
            <Link href={'register'}><span className="font-semibold text-blue-500 hover:text-blue-600"> clique aqui </span></Link>
            para se registrar</p>
        </div>
        <Button type="submit" disabled={loading}>{loading ? <Spinner /> : 'Entrar'}</Button>
      </div>
    </form>
  );
}
