import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import AdminApi from '../services/Api/Admin/AdminApi';
import { useCart } from '../context/CartContext';

function Search() {
    const { term } = useParams(); // Get search term from URL parameter
    const [products, setProducts] = useState([]);
    const [showAddedMessage, setShowAddedMessage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(8); // Initial visible products
    const { addItemToCart } = useCart(); // Access cart context

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await AdminApi.getProducts();
                const filteredProducts = response.data.filter(product =>
                    product.name.toLowerCase().includes(term.toLowerCase())
                );
                setProducts(filteredProducts);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, [term]);

    const handleAddToCart = (name, price, image) => {
        setShowAddedMessage(true);
        setTimeout(() => setShowAddedMessage(false), 2000);

        const newItem = { name, price, image };
        addItemToCart(newItem);
    };

    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 8);
    };

    return (
        <>
            {/* Loading Spinner */}
            {loading ? (
                <div className="flex justify-center items-center mt-12">
                    <div className="animate-spin border-4 border-t-4 border-gray-200 rounded-full w-16 h-16 border-t-slate-900"></div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold mt-12 mb-6 text-center uppercase tracking-widest">Search Results for "{term}"</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
                        {products.slice(0, visibleCount).map((product) => (
                            <motion.div
                                key={product.id}
                                className="bg-white shadow-sm p-4 rounded-lg"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="bg-gray-200 h-72 w-full rounded-lg overflow-hidden">
                                    <img
                                        src={`http://localhost:8000/storage/${product.image}`}
                                        alt={product.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="mt-4">
                                    <h2 className="font-semibold">{product.name}</h2>
                                    <p className="text-gray-700 mt-2">${product.price}</p>
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleAddToCart(product.name, product.price, product.image)}
                                    className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded bg-slate-100 hover:bg-slate-200"
                                >
                                    <ShoppingCartIcon className="w-5 h-5" />
                                    Add to Cart
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>

                    {/* Show More Button */}
                    {visibleCount < products.length && (
                        <div className="flex justify-center mt-6">
                            <button onClick={handleShowMore} className="h-12 bg-slate-200 w-36 rounded font-bold hover:bg-slate-300 text-center">
                                Show More!
                            </button>
                        </div>
                    )}

                    {/* Added to Cart Message */}
                    {showAddedMessage && (
                        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-all duration-300">
                            Product added to cart!
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Search;
