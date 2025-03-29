import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
import { RainbowButton } from "@/components/ui/rainbow-button";

export function Navbar() {
  return (
    <div className="flex items-center justify-between py-2 px-2">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" className="size-10" />
        <p className="text-3xl font-extrabold tracking-tight">Invo<span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 text-transparent bg-clip-text">Zen</span></p>
      </Link>
      <Link href="/login">
        <RainbowButton className="h-10 w-19">Get Started</RainbowButton>
      </Link>
    </div>
  );
}

