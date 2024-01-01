import { useContext } from "react";
import "./CartWidget.css";
import { NavLink } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import { CartContext } from "../../context/CartContext";
import { PiHeartBold } from "react-icons/pi";

const CartWidget = () => {
  const { totalQuantity, cart } = useContext(CartContext);

  return (
    <NavLink className="CartWidget" activeClassName="active" to={'/cart'}>
      <div className="Cart" activeClassName="active">
        <BsCart2 />
          <div className="ItemCount">{cart.length}</div>
      </div>
    </NavLink>
  );
};

export default CartWidget;
