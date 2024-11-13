import { Link } from 'react-router-dom'; // Make sure to import Link
import men from "../assets/categories/men.png";
import women from "../assets/categories/women.png";
import kids from "../assets/categories/kids.png";
import cover from '../assets/categories/pexels-nida-kurt-5079840-9785872.jpg';
import accessories from "../assets/categories/accessories.png";

function Categories() {
    return (
        <>
            <div
                className="relative bg-cover bg-center p-8 mt-2 mb-8"
                style={{ backgroundImage: `url(${cover})` }}
            >
                <p className="font-semibold text-white text-center">
                    Explore our diverse range of categories, each designed to meet your unique needs and preferences. Whether you're looking for stylish and trendy clothing for men, elegant and chic options for women, comfortable and playful outfits for kids, or the perfect accessories to complete your look, we've got something for everyone. Our curated collections offer high-quality pieces that blend fashion, comfort, and affordability, ensuring you always look and feel your best. Discover the latest trends and shop with confidence in every category!
                </p>
            </div>
            <div className="max-w-6xl mx-auto p-4 mt-10">
                <h1 className="font-bold text-center mb-8">This is our Category Collection</h1>
                <div className="flex flex-wrap justify-evenly">
                    {/* Category - Men */}
                    <div className="w-80 h-96 bg-gray-50 p-8 border border-green-50 rounded-lg hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center">
                        <img className="h-24" src={men} alt="Men" />
                        <h4 className="text-center font-bold mt-4">Men</h4>
                        <p className="text-center text-sm text-gray-600 mt-2">Explore our stylish and comfortable clothing collection for men.</p>
                        <Link to="/listByCategory/1">
                            <button className="mt-4 px-6 py-2 bg-gray-300 text-white rounded hover:bg-gray-500 font-bold transition-colors duration-300">Explore</button>
                        </Link>
                    </div>

                    {/* Category - Women */}
                    <div className="w-80 h-96 bg-gray-50 p-8 border border-green-50 rounded-lg hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center">
                        <img className="h-24" src={women} alt="Women" />
                        <h4 className="text-center font-bold mt-4">Women</h4>
                        <p className="text-center text-sm text-gray-600 mt-2">Discover elegant and trendy outfits designed just for women.</p>
                        <Link to="/listByCategory/2">
                            <button className="mt-4 px-6 py-2 bg-gray-300 font-bold text-white rounded hover:bg-gray-500 transition-colors duration-300">Explore</button>
                        </Link>
                    </div>

                    {/* Category - Kids */}
                    <div className="w-80 h-96 bg-gray-50 p-8 border border-green-50 rounded-lg hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center">
                        <img className="h-24" src={kids} alt="Kids" />
                        <h4 className="text-center font-bold mt-4">Kids</h4>
                        <p className="text-center text-sm text-gray-600 mt-2">Shop fun and comfortable clothing for kids of all ages.</p>
                        <Link to="/listByCategory/3">
                            <button className="mt-4 px-6 py-2 bg-gray-300 font-bold text-white rounded hover:bg-gray-500 transition-colors duration-300">Explore</button>
                        </Link>
                    </div>

                    {/* Category - Accessories */}
                    <div className="w-80 h-96 mt-4 bg-gray-50 p-8 border border-green-50 rounded-lg hover:border-black hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center">
                        <img className="h-24" src={accessories} alt="Accessories" />
                        <h4 className="text-center font-bold mt-4">Accessories</h4>
                        <p className="text-center text-sm text-gray-600 mt-2">Find the perfect accessories to complete your look.</p>
                        <Link to="/listByCategory/4">
                            <button className="mt-4 px-6 py-2 bg-gray-300 font-bold text-white rounded hover:bg-gray-500 transition-colors duration-300">Explore</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Categories;
