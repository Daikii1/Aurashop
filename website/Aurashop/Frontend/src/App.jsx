import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/index.jsx';
import './index.css'; // Ensure you import the global CSS here
import AuthContext from './context/AuthContext';
import { CartProvider } from './context/CartContext';


function App() {
  return (
    <>
      <AuthContext>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthContext>
    </>


  );
}

export default App;
