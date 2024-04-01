import LoginForm from '@/components/auth/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | Virtual Wallet',
  description: 'Logue na sua conta da carteira virtual.',
};

export default async function LoginPage() {

  return (
    <section className="bg-white w-full p-10 rounded shadow shadow-gray-300" style={{ maxWidth: 400 }}>
      <h1 className="text-4xl font-bold text-center">LOGIN</h1>
      <LoginForm />
    </section>
  );
}
