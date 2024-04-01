import TransfersList from '@/components/historic/transfers-list';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Historico | Virtual Wallet',
  description: 'Visualize suas transferências entre usuários.',
};

export default async function HistoricPage() {

  return (
    <section className="bg-white p-10 mt-5 rounded w-full" >
      <h1 className="text-lg font-semibold text-sky-900">Historico de Transferências</h1>
      <TransfersList />
    </section>
  );
}
