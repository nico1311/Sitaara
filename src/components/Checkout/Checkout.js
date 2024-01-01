import { useContext, useState, useEffect } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../services/FirebaseConfig";
import { CartContext } from "../context/CartContext";
import CheckoutForm from "./CheckoutForm";
import CartItem from "../Cart/CartItem";
import './Checkout.css'
import Footer from "../Footer/Footer";
import axios from "axios";

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const Checkout = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  const { cart, clearCart, total } = useContext(CartContext);

  // Initialize MercadoPago when the component mounts
  useEffect(() => {
    // Replace 'YOUR_PUBLIC_KEY' with your actual public key
    initMercadoPago('TEST-7fd427a5-756f-45ba-801e-5d8999dafd55', { locale: "es-AR" });
  }, []);

  const createOrder = async ({ name, phone, email }) => {
    setLoading(true);

    try {
      const orderTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const order = {
        buyer: {
          name,
          phone,
          email,
        },
        items: cart,
        date: Timestamp.fromDate(new Date()),
        total: orderTotal,
      };

      const ordersRef = collection(db, "orders");
      const orderDocRef = await addDoc(ordersRef, order);

      setOrderId(orderDocRef.id);
      setOrderDetails(order);
      clearCart();
    } catch (error) {
      console.error("Error creating order:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1 className="Generacion">Se está generando la orden</h1>;
  }

  if (orderId) {
    const createPreference = async () => {
      try {
        console.log("Creating preference...");
        const response = await axios.post("http://localhost:3000/create_preference", {
          title: orderId, // Remove the unnecessary object wrappers
          price: total,   // Remove the unnecessary object wrappers
        });
    
        console.log("Response Data:", response.data);
    
        const { id } = response.data;
        console.log("Preference ID:", id);
    
        return id;
      } catch (error) {
        console.error("Error creating preference:", error);
        throw error; // Rethrow the error to propagate it to the caller
      }
    };
    const handleBuy = async () => {
      try {
        const id = await createPreference();
        if (id) {
          setPreferenceId(id);
        }
      } catch (error) {
        // Handle the error, if any
        console.error("Error in handleBuy:", error);
      }
    }
    return (
      <div className="OrderDetails">
        <h1>El id de su orden es:<br/>{orderId}</h1>
        <h2>Detalles del Pedido:</h2>
        {orderDetails && (
          <div className="OrderItems">
            {orderDetails.items.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <h3 className="total">Total: ${orderDetails.total}</h3>
      <a href="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"> <Wallet onClick={handleBuy} /> </a>
      
        </div>
        )}
      </div>
    );
  }
  

  return (
    <div>
      <CheckoutForm onConfirm={createOrder} />
    </div>
  );
};

export default Checkout;
