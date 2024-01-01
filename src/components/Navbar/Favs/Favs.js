// Favs.js
import { useContext, useState } from 'react';
import { useFavorites } from '../../context/FavContext';
import { PiHeartBold } from "react-icons/pi";
import './Favs.css'
import { CartContext } from '../../context/CartContext';
import ItemCount from '../../ItemCount/ItemCount';
import { Link } from 'react-router-dom';
import Footer from '../../Footer/Footer';

const Favs = () => {
  const { favorites } = useFavorites();
  const { addItem } = useContext(CartContext);
  const [quantityAdded, setQuantityAdded] = useState(0);

  const handleOnAdd = (item, quantity) => {
    setQuantityAdded(quantity);

    addItem(item, quantity);
  };

  return (
    <div className='favoritos'>
      <h1>Favoritos</h1>
      <div className='FavList'>
        {favorites && favorites.map((item) => (
          <div className='favitem' key={item.id}>
              <img src={item.image} alt={item.name}></img>
            <p>{item.name}</p>
            <button className='Agregar' onClick={() => handleOnAdd(item, 1)}>Agregar al carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favs;
