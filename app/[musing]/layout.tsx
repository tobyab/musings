import Link from "next/link";
import Image from "next/image";

import back from "@/public/back.svg";

export default function Layout({ children }: any) {
  return (
    <div className="mt-8">
      <div>
        <div className="mb-16 flex justify-between space-x-2">
          <Link href="/" className="self-center">
            Toby&apos;s musings
          </Link>
          <Link href="https://twitter.com/developedbytoby">
            <img
              src="https://github.com/tobyab.png"
              className="h-8 w-8 rounded-full border"
            />
          </Link>
        </div>

        {children}
      </div>
    </div>
  );
}
