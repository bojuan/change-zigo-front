import Link from "next/link";
import { HomeIcon } from "@radix-ui/react-icons";
import "../../app/globals.css";
import { useAppStorage } from "@/store/app-store";
import { Toaster } from "../ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { companyName } = useAppStorage();
  return (
    <div>
      <nav className="w-full flex justify-center py-4 drop-shadow-md bg-current">
        <Link href="/" className="flex items-center gap-4">
          <HomeIcon className=" text-white h-6 w-6" />
          <h1 className="text-white	">{companyName}</h1>
        </Link>
      </nav>
      <main className="max-w-5xl	m-auto p-8">{children}</main>
      <Toaster />
    </div>
  );
}
