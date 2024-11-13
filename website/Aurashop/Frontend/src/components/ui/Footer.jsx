import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer className="bg-slate-50 text-black py-8 px-4 mt-4">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Information */}
                <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold mb-2">About AuraShop</h4>
                    <p className="text-gray-600 mb-4">
                        Your one-stop solution for all things shopping. From the latest trends to timeless classics, we have it all.
                    </p>
                    <p className="text-gray-600">
                        Contact us at: <br />
                        <a href="mailto:example@aurashop.com" className="text-slate-600 hover:underline">example@aurashop.com</a>
                    </p>
                </div>

                {/* Navigation Links */}
                <div className="text-center">
                    <h4 className="text-xl font-bold mb-2">Quick Links</h4>
                    <div className="space-y-2">
                        <Link to="/" className="block hover:underline font-semibold">Home</Link>
                        <Link to="/shop" className="block hover:underline font-semibold">Shop</Link>
                        <Link to="/categories" className="block hover:underline font-semibold">Categories</Link>
                        <Link to="/contact" className="block hover:underline font-semibold">Contact</Link>
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="text-center md:text-right">
                    <h4 className="text-xl font-bold mb-2">Follow Us</h4>
                    <div className="flex justify-center md:justify-end space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 text-3xl hover:text-blue-600">
                            <FontAwesomeIcon icon={faFacebook} size="lg" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 text-3xl hover:text-pink-500">
                            <FontAwesomeIcon icon={faInstagram} size="lg" />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 text-3xl hover:text-blue-400">
                            <FontAwesomeIcon icon={faTwitter} size="lg" />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 text-3xl hover:text-blue-700">
                            <FontAwesomeIcon icon={faLinkedin} size="lg" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-slate-100 text-center py-4 mt-8">
                <p className="text-gray-600 text-sm">
                    &copy; {new Date().getFullYear()} AuraShop. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
