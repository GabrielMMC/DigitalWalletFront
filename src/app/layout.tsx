import type { Metadata } from 'next';
import { getUser } from '@/services/auth';
import { type_second } from '@/utils/fonts';
import { UserContextProvider } from '@/context/user-context';
import './globals.css';
import { User } from '@/models/User';
import { Response } from '@/models/Request';

export const metadata: Metadata = {
  title: 'Social',
  description: 'Rede social de status.',
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const response: Response<User> = await getUser();

  return (
    <html lang="pt-br">
      <body className={type_second.variable}>
        <UserContextProvider user={response?.data}>
          <div className="App">
            <main className="AppBody">{children}</main>
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}
