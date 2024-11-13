import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faSearch, faShoppingCart, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from '../../context/CartContext';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [inputVisible, setInputVisible] = useState(false);
    const [cartDropdownOpen, setCartDropdownOpen] = useState(false);
    const { cartItems, removeFromCart } = useCart();
    const cartItemCount = cartItems.length;
    const navigate = useNavigate(); // Only one instance of useNavigate



    const toggleMenu = () => setIsOpen(!isOpen);
    const toggleInput = () => setInputVisible((prev) => !prev);
    const toggleCartDropdown = () => setCartDropdownOpen((prev) => !prev);

    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search/${searchTerm}`);
    };

    const handleOrderItem = (item) => {
        const itemName = encodeURIComponent(item.name);
        const itemImage = encodeURIComponent(item.image);
        const itemId = encodeURIComponent(item.id);
        navigate(`/order/${itemName}-${itemImage}-${itemId}`);


    };

    return (
        <>
            {/* Search Bar Section */}
            <div
                className={`fixed top-0 left-0 right-0 z-50 p-4 transition-all bg-white duration-500 ${inputVisible ? "transform translate-y-0" : "transform -translate-y-full"
                    }`}
            >
                <div className="flex justify-between items-center">
                    <div className="text-lg text-center font-medium text-slate-700 tracking-widest uppercase">Search for Products</div>
                    <FontAwesomeIcon
                        icon={faTimes}
                        className="cursor-pointer text-slate-600 text-3xl hover:text-red-600"
                        onClick={toggleInput}
                    />
                </div>
                {inputVisible && (
                    <form onSubmit={handleSearchSubmit} className="mt-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Search..."
                            className="w-full p-4 border border-gray-300 h-14 rounded-md outline-none"
                        />
                        <button
                            type="submit"
                            className="w-full h-14 bg-slate-600 hover:bg-slate-700 text-white p-2 mt-2 rounded-md"
                        >
                            Search
                        </button>
                    </form>
                )}
            </div>

            {/* Navbar */}
            <div className="bg-slate-100 h-10 flex items-center justify-center">
                <p className="font-semibold">Welcome! Find Everything You Need Right Here</p>
            </div>

            <nav className="bg-slate-50 text-black p-4 px-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-extrabold">AuraShop</div>
                    <div className="hidden md:flex space-x-10">
                        <Link to="/" className="relative font-bold hover:text-gray-700 link-underline">Home</Link>
                        <Link to="/shop" className="relative font-bold hover:text-gray-700 link-underline">Shop</Link>
                        <Link to="/categories" className="relative font-bold hover:text-gray-700 link-underline">Categories</Link>
                        <Link to="/contact" className="relative font-bold hover:text-gray-700 link-underline">Contact</Link>
                    </div>
                    <div className="flex items-center space-x-4 relative">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className="cursor-pointer text-black text-2xl mr-4 hover:bg-slate-400 p-3 rounded-full hover:text-white"
                            onClick={toggleInput}
                        />
                        <div className="relative">
                            <FontAwesomeIcon
                                icon={faShoppingCart}
                                className="cursor-pointer text-black text-2xl transition-transform transition-colors duration-500 hover:-translate-y-1 hover:text-gray-600"
                                onClick={toggleCartDropdown}
                            />

                            {cartItemCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItemCount}
                                </span>
                            )}

                            {/* Cart Dropdown */}
                            {cartDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-96 bg-white border border-gray-300 rounded-md shadow-lg z-50">
                                    <div className="p-4">
                                        <h4 className="font-bold mb-2">Cart Items</h4>
                                        {cartItems.length === 0 ? (
                                            <p className="text-gray-500">Your cart is empty.</p>
                                        ) : (
                                            cartItems.map((item, index) => (
                                                <div key={index} className="flex items-center mb-2">
                                                    <img
                                                        src={`http://localhost:8000/storage/${item.image}`}
                                                        alt={item.name}
                                                        className="w-12 h-12 object-cover rounded-md mr-2"
                                                    />
                                                    <div className="flex-1">
                                                        <p className="font-medium">{item.name}</p>
                                                    </div>
                                                    <button
                                                        onClick={() => handleOrderItem(item)}
                                                        className="text-white bg-slate-300 rounded p-1 hover:text-slate-700 mr-2"
                                                    >
                                                        Order
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromCart(item.id)}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        <FontAwesomeIcon className="text-2xl ml-2" icon={faTrash} />
                                                    </button>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button className="md:hidden" onClick={toggleMenu}>
                            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} className="text-black" />
                        </button>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden mt-2 ">
                        <Link to="/" className="block py-2 px-8 hover:bg-gray-200 font-bold">Home</Link>
                        <Link to="/shop" className="block py-2 px-8 hover:bg-gray-200 font-bold">Shop</Link>
                        <Link to="/categories" className="block py-2 px-8 hover:bg-gray-200 font-bold">Categories</Link>
                        <Link to="/contact" className="block py-2 px-8 hover:bg-gray-200 font-bold">Contact</Link>
                    </div>
                )}
            </nav>

            {/* Styles for Underline Animation */}
            <style>
                {`
                    .link-underline {
                        position: relative;
                        display: inline-block;
                    }
                    .link-underline::after {
                        content: "";
                        position: absolute;
                        left: 0;
                        bottom: -2px;
                        width: 100%;
                        height: 2px;
                        background-color: #1f2937;
                        transform: scaleX(0);
                        transform-origin: right;
                        transition: transform 0.3s ease;
                    }
                    .link-underline:hover::after {
                        transform: scaleX(1);
                        transform-origin: left;
                    }
                `}
            </style>
        </>
    );
}

export default Navbar;
