import { axiosClient } from "../../../api/axios";

const AdminApi = {
    getCsrfToken: async () => {
        return await axiosClient.get('/sanctum/csrf-cookie', {
            baseURL: import.meta.env.VITE_BACKEND_URL
        });
    },

    login: async (email, password) => {
        return await axiosClient.post('/login', { email, password });
    },

    logout: async () => {
        return await axiosClient.post('/logout');
    },

    getAdmin: async () => {
        return await axiosClient.get('/user');
    },
       // New method to fetch categories
       getCategories: async () => {
        return await axiosClient.get('/categories'); // Adjust the endpoint as necessary
    },
    getProducts: async () => {
        return await axiosClient.get('/products'); // Adjust the endpoint if necessary
    },
    deleteProduct: (id) => axiosClient.delete(`/products/${id}`), // Delete request to the backend

    getProductsByCategory: async (categoryId) => {
        return await axiosClient.get(`/products/category/${categoryId}`); // Assuming this is the correct endpoint in your backend
    },

    //create an order
    createOrder: async (orderData) => {
        return await axiosClient.post('/orders', orderData);
    },

       // Fetch all orders
       getOrders: async () => {
        return await axiosClient.get('/orders'); // Adjust the endpoint if necessary
    },

    // New method to create a product
    createProduct: async (productData) => {
        return await axiosClient.post('/products', productData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }
};

export default AdminApi;
