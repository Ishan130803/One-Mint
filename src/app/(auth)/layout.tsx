import Image from "next/image";
import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="bg-neutral-100 min-h-screen ">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-center items-center">
          <Image src={"logo.svg"} width={200} height={1} alt="logo"></Image>
          {/* <Button variant={"secondary"}>Sign Up</Button> */}
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
}

export default AuthLayout;
