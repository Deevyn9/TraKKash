import Nav from "../ui/dashboard/navbar/Nav";
import Sidebar from "../ui/dashboard/sidebar/sidebar";

const Layout = ({ children }) => {
  return (
    <div className="relative overflow-hidden border-2 border-solid border-pink-400">
      <div>
        <Nav />
      </div>
      <div className="flex dashboard">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
