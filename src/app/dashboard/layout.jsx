import Nav from "../ui/dashboard/navbar/Nav"
import Sidebar from "../ui/dashboard/sidebar/sidebar"

const Layout = ({children}) => {
    return (
        <div>
            <div>
                <Nav />
            </div>
            <div className="flex">
                <Sidebar />
                {children}
            </div>
        </div>
    )
}

export default Layout