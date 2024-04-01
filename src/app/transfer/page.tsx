import LoginForm from '@/components/auth/login-form';
import UsersList from '@/components/transfer/users-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Transferencia | Virtual Wallet',
  description: 'Realize transferência entre usuários.',
};

export default async function TransferPage() {

  return (
    <section className="bg-white p-10 mt-5 rounded w-full" >
      <h1 className="text-lg font-semibold text-sky-900">TRANSFIRA PARA UM USUÁRIO</h1>
      <UsersList />
    </section>
  );
}
