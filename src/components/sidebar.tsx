"use client";

import Image from "next/image";
import Link from "next/link";
import { DottedSeparator } from "./DottedSeparator";
import { Navigation } from "./navigation";
import { WorkspaceSwitcher } from "./workspace-switcher";
import { Projects } from "./projects";

function Sidebar() {
  return (
    <aside className="h-full bg-neutral-100 p-4 w-full">
      <Link href="/">
        <Image src="/logo.svg" alt="logo" width={152} height={50}></Image>
      </Link>
      <DottedSeparator className="py-7"></DottedSeparator>
      <WorkspaceSwitcher />
      <DottedSeparator className="py-7"></DottedSeparator>
      <Navigation></Navigation>
      <Projects />
    </aside>
  );
}

export { Sidebar };
