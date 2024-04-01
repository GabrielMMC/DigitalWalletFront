import TransfersList from '@/components/historic/transfers-list';
import RechargeStepper from '@/components/recharge/stepper';
import WithrawalStepper from '@/components/withdrawal/stepper';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Saque | Virtual Wallet',
  description: 'Saque suas funanças.',
};

export default async function WithdrawalPage() {

  return (
    <section className="bg-white p-10 mt-5 rounded w-full" >
      <h1 className="text-lg font-semibold text-sky-900">Retire seu saldo</h1>
      <WithrawalStepper />
    </section>
  );
}
