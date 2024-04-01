import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-white w-full p-10 rounded shadow shadow-gray-300 mt-5 text-center">
      <h1 className="text-3xl font-bold">Página não encontrada</h1>
      <Link
        className="button"
        style={{ marginBottom: '1rem', display: 'inline-block' }}
        href={'/historic'}
      >
        <span className='text-1xl font-bold text-sky-500'>Voltar para a home.</span>
      </Link>
    </section>
  );
}
