import Link from "next/link";
import Image from "next/image";

import back from "@/public/back.svg";

export default function Layout({ children }: any) {
  return (
    <div className="mt-16 grid justify-center place-items-center">
      <div>
        <Link href="/">
          <p className="mb-8 flex space-x-2">
            <Image src={back} alt="Back arrow" />
            <span>Musings</span>
          </p>
        </Link>
        {children}
      </div>
    </div>
  );
}
