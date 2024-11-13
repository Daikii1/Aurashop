import AdminNavbar from "@/components/AdminComponents/AdminPartials/AdminNavbar";
import AdminSidebar from "@/components/AdminComponents/AdminPartials/AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
    return (
        <div className="flex flex-col h-screen">
            <nav>
                <AdminNavbar />
            </nav>
            <div>
                <AdminSidebar /> {/* Render the sidebar as a navbar */}
            </div>
            <main className="flex-1 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
