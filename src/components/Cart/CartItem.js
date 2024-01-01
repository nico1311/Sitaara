import React, { useContext } from "react";
import "./Cart.css";
import { CartContext } from "../context/CartContext";

const CartItem = ({ id, name, quantity, price, image }) => {
  const { removeItem } = useContext(CartContext);

  return (
    <div className="CartItem">
      <li>
        <div>
          <img src={image} alt={name}></img>
          <h4 className="CartName">{name}</h4>
          <p className="CartCant">Cantidad: {quantity}</p>
          <p className="CartPrice">Precio: ${price}</p>
          <button onClick={() => removeItem(id)} className="remove">
            x
          </button>
        </div>
      </li>
    </div>
  );
};

export default CartItem;
