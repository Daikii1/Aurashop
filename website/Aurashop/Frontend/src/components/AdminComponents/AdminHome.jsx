import React, { useEffect, useState } from 'react';
import AdminApi from '../../services/Api/Admin/AdminApi';

function AdminHome() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await AdminApi.getOrders();
                setOrders(response.data || []); // Ensure orders is an array
            } catch (err) {
                setError('Failed to fetch orders');
            }
        };
        fetchOrders();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Orders List</h2>
            {error && <p className="text-red-500">{error}</p>}

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="p-4 text-left">Client Name</th>
                            <th className="p-4 text-left">Quantity</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">Phone</th>
                            <th className="p-4 text-left">Payment</th>
                            <th className="p-4 text-left">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map(order => (
                                <tr key={order.id} className="border-b">
                                    <td className="p-4">{order.client_name}</td>
                                    <td className="p-4">{order.quantity}</td>
                                    <td className="p-4">{order.client_email}</td>
                                    <td className="p-4">{order.client_phone}</td>
                                    <td className="p-4 "><h1 className='text-orange-500 border-2 border-orange-500 w- p-2 rounded-full w-fit'>{order.payment}</h1></td> {/* Display payment status */}
                                    <td className="p-4">{new Date(order.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="p-4 text-center text-gray-500">
                                    No orders available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminHome;
