import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav className="w-full flex justify-center py-4 drop-shadow-md bg-current">
        <h1 className="text-white	">Your MArket</h1>
      </nav>
      <main className="max-w-5xl	m-auto p-8">{children}</main>
    </div>
  );
}
