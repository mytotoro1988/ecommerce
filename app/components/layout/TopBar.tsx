import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

import { navLinks } from "@/lib/constant";
import { Menu } from "lucide-react";

const TopBar = () => {
  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden">
      <Image src="/logo.png" width={150} height={70} alt="logo" />
      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link, index) => {
          return (
            <Link
              href={link.url}
              key={index}
              className="gap-4 flex text-body-medium "
            >
              {link.icon}
              <p>{link.label}</p>
            </Link>
          );
        })}
      </div>
      <div className="flex gap-4 text-body-medium items-center">
        <Menu className="cursor-poiter md:hidden" />
        <UserButton />
      </div>
    </div>
  );
};

export default TopBar;
