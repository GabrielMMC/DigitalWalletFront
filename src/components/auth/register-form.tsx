'use client'

import Button from "@/components/button";
import ErrorAlert from "@/components/error-alert";
import Input from "@/components/input";
import Spinner from "@/components/spinner";
import useRegister from "@/hooks/useRegister";
import Link from "next/link";
import React from "react";

export default function RegisterForm() {
  const { form, errors, handleChange, handleSubmit, handleBlur, loading, errorMessage } = useRegister({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-5">
        <Input
          label="Nome"
          name="name"
          value={form.name}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.name} />
      </div>
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
      <div className="mt-5">
        <Input
          type="password"
          label="Confirmar senha"
          name="confirm_password"
          value={form.confirm_password}
          onBlur={handleBlur}
          onChange={handleChange}
          error={errors?.confirm_password} />
      </div>
      <div className="mt-10 flex justify-between items-center">
        <div className="me-4">
          <ErrorAlert>{errorMessage}</ErrorAlert>
          <p className="text-sm font-medium text-gray-500">
            <Link href={'login'}><span className="font-semibold text-blue-500 hover:text-blue-600">Clique aqui </span></Link>
            para fazer login</p>
        </div>
        <Button type="submit" disabled={loading}>{loading ? <Spinner /> : 'Entrar'}</Button>
      </div>
    </form>
  );
}
