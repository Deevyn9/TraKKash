import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import TrakkashDashboard from "./layout";
import MainDash from "./[mainDashboard]/maindash/page";
// import SideBar from "./[mainDashboard]/sidebar/sidebar";

// import MainDash from "@/components/maindash/page";
// import Income from "@/components/income/page";
// import Expense from "@/components/expense/page";

export default async function DashboardPage() {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  return (
    <div className="flex w-screen border-2 border-dashed border-yellow-500 h-full">
      <MainDash />
    </div>
  );
}
