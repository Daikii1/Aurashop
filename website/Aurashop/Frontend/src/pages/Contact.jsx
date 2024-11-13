import { useState } from 'react';
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa';

function Contact() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <>
            <div className="max-w-3xl mx-auto mt-16 text-center">
                <h1 className="text-center text-4xl font-semibold">CONTACT US</h1>
                <div className="w-full p-2">
                    <p className="text-wrap font-semibold text-xl text-center">
                        We’d love to hear from you! Whether you have questions, feedback, or just want to say hello, feel free to reach out. Connect with us through social media or send us a message using the form below. Our team is here to assist you!
                    </p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8 space-y-8 lg:space-y-0 lg:space-x-12">
                {/* Left section for text and social media links */}
                <div className="w-full lg:w-1/3 text-center lg:text-left lg:pr-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Get in Touch</h2>
                    <p className="text-gray-600 mb-6">
                        Connect with us on social media or drop us a message directly through the form.
                    </p>
                    <div className="flex justify-center lg:justify-start space-x-4">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="border border-gray-300 p-3 rounded-full hover:bg-blue-100">
                            <FaFacebook className="text-gray-600 text-2xl hover:text-blue-600" />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="border border-gray-300 p-3 rounded-full hover:bg-pink-100">
                            <FaInstagram className="text-gray-600 text-2xl hover:text-pink-500" />
                        </a>
                        <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="border border-gray-300 p-3 rounded-full hover:bg-gray-200">
                            <FaTiktok className="text-gray-600 text-2xl hover:text-black" />
                        </a>
                        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="border border-gray-300 p-3 rounded-full hover:bg-green-100">
                            <FaWhatsapp className="text-gray-600 text-2xl hover:text-green-500" />
                        </a>
                    </div>
                </div>

                {/* Right section for the contact form */}
                <div className="w-full lg:w-2/3 max-w-lg bg-white rounded-lg shadow-lg p-6">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 font-semibold mb-2">Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
                                required
                            ></textarea>
                        </div>
                        <button
                            type="submit"
                            className="mt-6 w-full bg-slate-600 text-white font-semibold py-4 rounded-lg hover:bg-slate-800 focus:outline-none focus:bg-indigo-700"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Contact;
