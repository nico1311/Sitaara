import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import './Cart.css'
import Footer from "../Footer/Footer";
const Cart = () => {
  const { cart, clearCart, totalQuantity, total } = useContext(CartContext);

  if (totalQuantity === 0) {
    return (
      <div>
        <h1> no hay items</h1>
        <Link to="/" className="Option">
          Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="CartView">
       <button onClick={() => clearCart()} className="CartButton">
        Limpiar carrito
      </button>
      <ul className="CartItem">
      {cart.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      </ul>
      <div className="CartFoot">
      <h3 className="total"> Total: ${total}</h3>
      <Link to="/checkout" className="Option">
        Comprar
      </Link>
      </div>
    </div>
  );
};

export default Cart;
