import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import cover from '../assets/categories/shop.jpg';
import { useCart } from '../context/CartContext';  // Importing the cart context
import AdminApi from '../services/Api/Admin/AdminApi';
function Shop() {
    const [products, setProducts] = useState([]);
    const [showAddedMessage, setShowAddedMessage] = useState(false);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(8); // Number of products initially visible
    const { addItemToCart } = useCart(); // Access addItemToCart function from context


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await AdminApi.getProducts();
                console.log(response.data);  // Log the response to see the structure
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch products:", error);
                setLoading(false);
            }
        };
        setTimeout(fetchProducts, 1000); // Simulated loading delay
    }, []);



    const handleShowMore = () => {
        setVisibleCount((prevCount) => prevCount + 8); // Show 8 more products on each click
    };

    // Add to Cart Handler
    const handleAddToCart = (name, price, image) => {
        setShowAddedMessage(true);
        setTimeout(() => setShowAddedMessage(false), 2000);

        // Create product object
        const newItem = { name, price, image };

        // Add item to cart using context
        addItemToCart(newItem);
    };
    return (
        <>
            {/* Loading Spinner */}
            <div className='bg-green-50 h-32 text-white font-bold w-full p-4' style={{ backgroundImage: `url(${cover})` }}>
                <p>
                    Discover our curated collection of high-quality products designed to elevate your lifestyle. From stylish apparel to innovative accessories, each item is carefully selected to offer both functionality and fashion. Whether you're looking for everyday essentials or something special, our products combine durability, comfort, and modern design. Explore our diverse range and find the perfect addition to your wardrobe or home today!
                </p>
            </div>
            {loading ? (
                <div className="flex justify-center items-center mt-12">
                    <div className="animate-spin border-4 border-t-4 border-gray-200 rounded-full w-16 h-16 border-t-slate-900"></div>
                </div>
            ) : (
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-2xl font-bold mt-12 mb-6 text-center uppercase tracking-widest">Our Products</h1>
                    <h1 className="text-1xl font-semibold mt-2  text-center uppercase tracking-widest">Feel free to adjust it based on the specific products you're offering!</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-6">
                        {products.slice(0, visibleCount).map((product) => (
                            <div key={product.id} className="bg-white shadow-sm p-4">
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
                                    className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded hover:bg-gray-50"
                                >
                                    <ShoppingCartIcon className="w-5 h-5" />
                                    Add to Cart
                                </motion.button>
                            </div>
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

export default Shop;
