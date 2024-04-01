import RegisterForm from '@/components/auth/register-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Criar Conta | Virtual Wallet',
  description: 'Crie sua conta da carteira virtual.',
};

export default async function RegisterPage() {

  return (
    <section className="bg-white w-full p-10 rounded shadow shadow-gray-300" style={{ maxWidth: 400 }}>
      <h1 className="text-4xl font-bold text-center">CRIAR CONTA</h1>
      <RegisterForm />
    </section>
  );
}
