import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();
  console.log(userId);
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="">
      <div className="flex gap-5">
        <Link
          href="/sign-in"
          className="border-2 border-solid border-red-500 bg-red-500 rounded-md p-2"
        >
          <button>Sign In</button>
        </Link>

        <Link
          href="/sign-up"
          className="border-2 border-solid border-red-500 rounded-md p-2"
        >
          <button>Sign Up</button>
        </Link>
      </div>
    </main>
  );
}
