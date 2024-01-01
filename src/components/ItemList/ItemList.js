import React from "react";
import Item from "../Item/Item";
import "./ItemList.css";
import Footer from "../Footer/Footer";

const ItemList = ({ products }) => {
  if (!products || products.length === 0) {
    return <p>No products found.</p>;
  }

  return (
    <div className="ListGroup">
      {products.map((prod) => (
        <Item key={prod.id} {...prod} />
      ))}
      <Footer />
    </div>
  );
};

export default ItemList;
