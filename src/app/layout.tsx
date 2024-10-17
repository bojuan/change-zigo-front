import Link from "next/link";
import { HomeIcon } from "@radix-ui/react-icons";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <nav className="w-full flex justify-center py-4 drop-shadow-md bg-current">
        <Link href="/" className="flex items-center gap-4">
          <HomeIcon className=" text-white h-6 w-6"/>
          <h1 className="text-white	">Your MArket</h1>
        </Link>
      </nav>
      <main className="max-w-5xl	m-auto p-8">{children}</main>
    </div>
  );
}
