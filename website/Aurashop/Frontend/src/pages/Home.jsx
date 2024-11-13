import { useState, useEffect } from 'react';
import cover from '../assets/categories/Home.jpg';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';  // Importing the cart context

import AdminApi from '../services/Api/Admin/AdminApi';
import { SHOP_ROUTE } from '@/router';

function Home() {
    const [products, setProducts] = useState([]);
    const [showAddedMessage, setShowAddedMessage] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addItemToCart } = useCart(); // Access addItemToCart function from context
    const apiUrl = import.meta.env.VITE_API_URL; // Use the VITE_ prefix


    // Fetch products data
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await AdminApi.getProducts();
                console.log("Fetched Products: ", response.data);  // Add console log here to inspect the response
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setLoading(false);
            }
        };

        fetchProducts(); // No need for setTimeout
    }, []);

    // Add to Cart Handler
    const handleAddToCart = (name, price, image, id) => {
        setShowAddedMessage(true);
        setTimeout(() => setShowAddedMessage(false), 2000);

        // Create product object
        const newItem = { name, price, image, id };

        // Add item to cart using context
        addItemToCart(newItem);
    };

    const navigateShop = () => {
        navigate(SHOP_ROUTE);
    };

    return (
        <>
            <section
                className="bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${cover})` }}
            >
                <div className="p-8 h-full">
                    <motion.h1
                        initial={{ x: -600 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1, delay: 1, ease: "linear" }}
                        className="text-white text-4xl font-bold mt-20">
                        Refresh Your Wardrobe with <br />
                        Our New Arrivals!
                    </motion.h1>

                    <motion.button
                        initial={{ x: -600 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1, delay: 1.5, ease: "linear" }}
                        className="mt-10 font-semibold text-white border border-white p-5 hover:bg-slate-50 hover:text-black">
                        <a href="/shop">SHOP NOW!</a>
                    </motion.button>
                </div>
                < motion.h1
                    initial={{ y: 200 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1, delay: 1.5, ease: "linear" }}
                    className="text-6xl p-8 font-semibold text-white">Where Quality Meets Affordability – Shop Now!
                </motion.h1>
            </section>

            {loading ? (
                <div className="flex justify-center items-center mt-12">
                    <div className="animate-spin border-4 border-t-4 border-gray-200 rounded-full w-16 h-16 border-t-slate-900"></div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-semibold mt-12 mb-6 text-center uppercase tracking-widest">Our Products</h1>
                    <h1 className="text-1xl font-semibold mt-2  text-center uppercase tracking-widest">Feel free to adjust it based on the specific products you're offering!</h1>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
                        {products.slice(0, 8).map((product) => (
                            <div key={product.id} className="bg-white shadow-sm p-4">
                                <div className="bg-gray-200 h-72 w-full rounded-lg overflow-hidden">
                                    <img
                                        src={`/localhost:8000/storage/${product.image}`}  // Use the correct API URL and image path
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
                                    onClick={() => handleAddToCart(product.name, product.price, product.image, product.id)}
                                    className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded hover:bg-gray-50"
                                >
                                    <ShoppingCartIcon className="w-5 h-5" />
                                    Add to Cart
                                </motion.button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <button onClick={navigateShop} className="h-12 bg-slate-200 w-36 rounded font-bold hover:bg-slate-300 text-center">
                            Explore More!
                        </button>
                    </div>

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

export default Home;
