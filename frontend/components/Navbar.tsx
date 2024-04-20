"use client";
import Link from "next/link";
import Image from "next/image";

import { CustomButton } from "@components";
import { UserButton, useUser } from "@clerk/nextjs";

const NavBar = () => {
  const { user, isLoaded } = useUser();

  return (
    <header className="w-full  absolute z-10">
      <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
        <Link href="/" className="flex justify-center items-center">
          <Image
            src="/logo.svg"
            alt="logo"
            width={118}
            height={18}
            className="object-contain"
          />
        </Link>
        {/* {isLoaded && user && <div className="flex justify-center items-center gap-5">
          <CustomButton
            title="See Bookings"
            btnType="button"
            containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
          /> */}
          <UserButton afterSignOutUrl="/" />
        {/* </div>} */}
      </nav>
    </header>
  );
};

export default NavBar;
