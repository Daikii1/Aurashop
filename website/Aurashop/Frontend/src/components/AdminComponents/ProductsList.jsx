import React, { useEffect, useState } from 'react';
import AdminApi from '../../services/Api/Admin/AdminApi';

function ProductsList() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await AdminApi.getProducts();
                setProducts(response.data);
            } catch (error) {
                setError("Failed to fetch products. Please try again.");
            }
        };
        fetchProducts();
    }, []);

    // Delete product function
    const handleDelete = async (productId) => {
        try {
            await AdminApi.deleteProduct(productId); // Make sure deleteProduct is defined in AdminApi
            setProducts(products.filter(product => product.id !== productId)); // Update state to remove the product
        } catch (error) {
            console.error("Failed to delete product:", error);
            setError("Failed to delete product. Please try again.");
        }
    };

    return (
        <div className="p-6 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">Products List</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="overflow-x-auto shadow-sm rounded-lg">
                <table className="min-w-full bg-white border border-gray-300 rounded-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-3">ID</th>
                            <th className="border px-4 py-3">Name</th>
                            <th className="border px-4 py-3">Description</th>
                            <th className="border px-4 py-3">Price</th>
                            <th className="border px-4 py-3">Category ID</th>
                            <th className="border px-4 py-3">Image</th>
                            <th className="border px-4 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length > 0 ? (
                            products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition-all duration-300">
                                    <td className="border px-4 py-2">{product.id}</td>
                                    <td className="border px-4 py-2">{product.name}</td>
                                    <td className="border px-4 py-2">{product.description}</td>
                                    <td className="border px-4 py-2">${parseFloat(product.price).toFixed(2)}</td>
                                    <td className="border px-4 py-2">{product.category_id}</td>
                                    <td className="border px-4 py-2">
                                        {product.image && (
                                            <img
                                                src={`http://localhost:8000/storage/${product.image}`}
                                                alt={product.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                        )}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="text-white bg-red-600 font-bold p-2 rounded-lg hover:underline transition-colors duration-200"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center border px-4 py-2">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductsList;
