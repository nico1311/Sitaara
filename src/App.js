// src/App.js
import './App.css';
import NavBar from './components/Navbar/NavBar';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './components/context/CartContext';
import Cart from './components/Cart/Cart';
import Checkout from './components/Checkout/Checkout';
import Favs from './components/Navbar/Favs/Favs';
import { FavProvider } from './components/context/FavContext';
import Footer from './components/Footer/Footer';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <FavProvider>
          <CartProvider>
            <NavBar />
            <Routes>
              <Route path="/" element={<ItemListContainer />} />
              <Route path="category/:categoryId" element={<ItemListContainer />} />
              <Route path="/item/:itemId" element={<ItemDetailContainer />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/favorites" element={<Favs />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path="*" element={<h1>404 NOT FOUND </h1>} />
            </Routes>
          </CartProvider>
        </FavProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
