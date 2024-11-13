import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminApi from '../services/Api/Admin/AdminApi';

const Order = () => {
    const { item } = useParams();
    const [name, image] = item ? item.split('-').map(param => decodeURIComponent(param)) : [];

    // State for client details
    const [clientName, setClientName] = useState('');
    const [clientPhone, setClientPhone] = useState('');
    const [clientEmail, setClientEmail] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [error, setError] = useState(null);

    if (!name || !image) {
        return <p>Invalid item data</p>; // Handle invalid data
    }

    // Submit order
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await AdminApi.createOrder({
                product_name: name,
                quantity,
                client_name: clientName,
                client_phone: clientPhone,
                client_email: clientEmail,
            });
            alert('Order placed successfully');
        } catch (error) {
            console.error('Order submission error:', error);
            setError('Failed to place order. Please try again.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col md:flex-row items-center gap-6">
                {/* Product Image */}
                <div className="w-full md:w-1/3 flex justify-center">
                    <img
                        src={`http://localhost:8000/storage/${image}`}
                        alt={name}
                        className="w-48 h-48 object-cover rounded-full border-4 border-gray-200 shadow-md"
                    />
                </div>

                {/* Form Section */}
                <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-semibold text-center mb-4">{name}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Quantity</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                min="1"
                                required
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Client Name</label>
                            <input
                                type="text"
                                value={clientName}
                                onChange={(e) => setClientName(e.target.value)}
                                required
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Client Phone</label>
                            <input
                                type="tel"
                                value={clientPhone}
                                onChange={(e) => setClientPhone(e.target.value)}
                                required
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700">Client Email</label>
                            <input
                                type="email"
                                value={clientEmail}
                                onChange={(e) => setClientEmail(e.target.value)}
                                required
                                className="w-full mt-2 p-3 border border-gray-300 rounded-lg"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="w-full md:w-1/2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Place Order
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Order;
