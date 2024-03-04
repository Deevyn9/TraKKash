import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();
  console.log(userId);
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <main className="relative flex flex-col justify-center items-center w-screen h-screen overflow-hidden">
      <div className="sun absolute w-screen bg-gradient-to-b from-purple-500 to-purple-300 blur-3xl opacity-75 h-4/6 -z-10 border-r inset-y-16 inset-x-0"></div>

      <div className="mb-8">
        <h1 className="font-black text-5xl text-center sm:text-9xl">
          traKKash<span className="text-purple-500">.</span>
        </h1>
        <p className="text-lg sm:text-2xl text-center">
          Know where your money goes{" "}
        </p>
      </div>

      <div className="flex gap-5">
        <Link href="/sign-in" className="dash-btn left">
          <button className="w-full h-full">Sign In</button>
        </Link>

        <Link href="/sign-up" className="dash-btn right">
          <button className="w-full h-full">Sign Up</button>
        </Link>
      </div>
    </main>
  );
}
