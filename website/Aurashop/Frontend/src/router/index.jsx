// router.js
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../layouts/Layout';
import Home from '../pages/Home.jsx';
import Categories from '../pages/Categories.jsx';
import Contact from '../pages/Contact.jsx';
import Shop from '../pages/Shop.jsx';
import NotFound from '../pages/NotFound.jsx';
import Login from '../pages/Login.jsx';
import Dashboard from '../pages/Dashboard';
import AddProducts from '@/components/AdminComponents/AddProducts';
import AdminHome from '@/components/AdminComponents/AdminHome';
import ProductsList from '@/components/AdminComponents/ProductsList';
import ListByCategory from '@/pages/ListByCategory';
import Search from '../pages/Search'
import Order from '@/pages/Order';

export const LOGIN_ROUTE = '/login';
export const ADMIN_DASHBORD_ROUTE = '/admin/dashboard/';
export const SHOP_ROUTE = '/shop';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'shop', element: <Shop /> },
            { path: 'categories', element: <Categories /> },
            { path: 'contact', element: <Contact /> },
            { path: 'listByCategory/:category', element: <ListByCategory /> },
            { path: "/search/:term", element: <Search /> },
            { path: '/order/:item', element: <Order /> }

        ],
    },
    { path: LOGIN_ROUTE, element: <Login /> },
    {
        path: ADMIN_DASHBORD_ROUTE,
        element: <Dashboard />,
        children: [
            { index: true, element: <AdminHome /> },
            { path: 'AddProducts', element: <AddProducts /> },
            { path: 'ProductsList', element: <ProductsList /> },
        ],
    },
    { path: '*', element: <NotFound /> },
]);
