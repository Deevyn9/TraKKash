import SideBar from "./[mainDashboard]/sidebar/sidebar";

export default function TrakkashDashboard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SideBar />
      {children}
    </>
  );
}
