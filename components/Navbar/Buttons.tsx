"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

export default function Buttons() {
  const { userId } = useAuth();

  return (
    <div className="max-sm:w-full">
      {userId ? (
        <Link href="/my-notes">
          <button className="max-sm:mt-6 max-sm:w-full bg-theme p-[8px] px-6 text-sm text-white rounded-md">
            Access The App
          </button>
        </Link>
      ) : (
        <div className="flex gap-2 max-sm:flex-col max-sm:mt-8 max-sm:w-full">
          <Link href="/sign-in">
            <button
              className={`max-sm:w-full bg-theme p-[8px] px-6 text-sm border border-theme text-white rounded-md hover:bg-white hover:text-theme transition duration-200`}
            >
              Sign In
            </button>
          </Link>
          <Link href="/sign-up">
            <button
              className={`max-sm:w-full text-sm border border-theme text-theme hover:bg-theme hover:text-white p-[8px] px-6 rounded-md transition duration-200`}
            >
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
