import React, { useState, useEffect } from 'react';
import { HiOutlineDocumentText, HiOutlinePencilAlt, HiOutlineCurrencyDollar, HiOutlineFolderOpen, HiOutlinePhotograph } from 'react-icons/hi';
import AdminApi from '../../services/Api/Admin/AdminApi';

function AddProducts() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [image, setImage] = useState(null);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await AdminApi.getCategories();
                setCategories(response.data);
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    const handleImageChange = (e) => setImage(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category_id', categoryId);
        formData.append('image', image);

        try {
            await AdminApi.createProduct(formData);
            alert("Product added successfully!");
            setName('');
            setDescription('');
            setPrice('');
            setCategoryId('');
            setImage(null);
        } catch (error) {
            setError("Failed to add product. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Add New Product</h2>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="relative">
                        <HiOutlineDocumentText className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Product Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="relative">
                        <HiOutlinePencilAlt className="absolute left-3 top-3 text-gray-400" />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="relative">
                        <HiOutlineCurrencyDollar className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="number"
                            placeholder="Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    <div className="relative">
                        <HiOutlineFolderOpen className="absolute left-3 top-3 text-gray-400" />
                        <select
                            value={categoryId}
                            onChange={(e) => setCategoryId(e.target.value)}
                            required
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:outline-none"
                        >
                            <option value="">Select Category</option>
                            {Array.isArray(categories) && categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="relative">
                        <HiOutlinePhotograph className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="w-full pl-10 p-3 border border-gray-300 rounded-lg shadow-sm text-gray-700 focus:border-blue-500 focus:outline-none"
                        />
                    </div>

                    {error && <p className="text-red-500 text-center">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition"
                    >
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddProducts;
