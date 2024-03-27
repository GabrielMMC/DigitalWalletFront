export default async function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-indigo-50">
      {children}
    </main>
  );
}
