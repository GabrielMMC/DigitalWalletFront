'use client'

import Button from "@/components/button";
import ErrorAlert from "@/components/error-alert";
import Input from "@/components/input";
import Spinner from "@/components/spinner";
import useLogin from "@/hooks/useLogin";
import Link from "next/link";
import React from "react";

export default function LoginForm() {
  const { form, errors, handleChange, handleSubmit, handleBlur, loading, errorMessage } = useLogin({
    email: '',
    password: ''
  })

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-5">
        <Input
          label="Email"
          name="email"
          value={form.email}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.email} />
      </div>
      <div className="mt-5">
        <Input
          type="password"
          label="Senha"
          name="password"
          value={form.password}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.password} />
      </div>
      <div className="mt-10 flex justify-between items-center">
        <div className="me-4">
          <ErrorAlert>{errorMessage}</ErrorAlert>
          <p className="text-sm font-medium text-gray-500">
            <Link href={'register'}><span className="font-semibold text-blue-500 hover:text-blue-600">Clique aqui </span></Link>
            para se registrar</p>
        </div>
        <Button type="submit" disabled={loading}>{loading ? <Spinner /> : 'Entrar'}</Button>
      </div>
    </form>
  );
}
