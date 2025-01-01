"use client";

import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./DottedSeparator";
import { Navigation } from "./navigation";

function Sidebar() {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={152} height={50}></Image>
      </Link>
      <DottedSeparator></DottedSeparator>
      <Navigation></Navigation>
    </aside>
  );
}

export { Sidebar };
