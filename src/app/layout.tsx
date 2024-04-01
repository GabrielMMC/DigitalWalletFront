import type { Metadata } from 'next';
import { getUser } from '@/services/auth';
import { type_second } from '@/utils/fonts';
import { UserContextProvider } from '@/context/user-context';
import './globals.css';
import { User } from '@/domain/User';
import { Response } from '@/domain/Request';
import Navbar from '@/components/navbar';
import Socket from '@/components/socket';
import Footer from '@/components/footer';
import { ToastContainer } from 'react-toastify';

export const metadata: Metadata = {
  title: 'Virtual Wallet',
  description: 'Virtual Wallet.',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { data } = await getUser<User>();

  return (
    <html lang="pt-br">
      <body className={type_second.variable}>
        <UserContextProvider user={data}>
          <div className="flex min-h-screen flex-col bg-indigo-50 justify-between">
            <div className='flex flex-col flex-1'>
              {data && <Navbar />}
              <main className='flex content self-center w-full flex-1 mb-5'>
                {children}
              </main>
              {data && <Footer />}
            </div>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* <Socket /> */}
        </UserContextProvider>
      </body>
    </html>
  );
}
