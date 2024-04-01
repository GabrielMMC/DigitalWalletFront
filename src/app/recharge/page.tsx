import TransfersList from '@/components/historic/transfers-list';
import RechargeStepper from '@/components/recharge/stepper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recarregue | Virtual Wallet',
  description: 'Adicione saldo para transações.',
};

export default async function RechargePage() {

  return (
    <section className="bg-white p-10 mt-5 rounded w-full" >
      <h1 className="text-lg font-semibold text-sky-900">Adicione saldo</h1>
      <RechargeStepper />
    </section>
  );
}
