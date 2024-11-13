import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
    const location = useLocation();

    return (
        <div className="text-black w-full flex justify-between p-2 shadow-sm"> {/* Removed gray bg and added shadow */}
            <Link
                to="/admin/dashboard"
                className={`flex-1 p-4 text-center font-bold tracking-wide hover:bg-gray-50 ${location.pathname === '/admin/dashboard' ? 'bg-gray-50' : ''} transition-all duration-300`}
            >
                Home
            </Link>
            <Link
                to="/admin/dashboard/AddProducts"
                className={`flex-1 p-4 text-center font-bold tracking-wide hover:bg-gray-50 ${location.pathname === '/admin/dashboard/AddProducts' ? 'bg-gray-50' : ''} transition-all duration-300`}
            >
                Add Products
            </Link>
            <Link
                to="/admin/dashboard/ProductsList"
                className={`flex-1 p-4 text-center font-bold tracking-wide hover:bg-gray-5  0 ${location.pathname === '/admin/dashboard/ProductsList' ? 'bg-gray-50' : ''} transition-all duration-300`}
            >
                Products List
            </Link>
        </div>
    );
};

export default AdminSidebar;
