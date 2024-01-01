import { Link } from "react-router-dom"
import { useFavorites } from "../context/FavContext";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";
import "./Item.css"
import { useEffect, useState } from "react";


const Item= ({id,name,price,category,image,description})=>{

    const [isInFavorites, setIsInFavorites] =useState(false);
    const { addToFavorites, removeFromFavorites, favorites } = useFavorites();

     // Check if the item is already in favorites on mount
     useEffect(() => {
        setIsInFavorites(favorites.some(item => item.id === id));
    }, [favorites, id]);

    const handleOnAddToFavorites = () => {
        if (isInFavorites) {
            removeFromFavorites(id);
        } else {
            addToFavorites({ id, name, price, image, description });
        }
        setIsInFavorites(!isInFavorites);
    };

    return(
        <article className="CardItem">
            <header className="Header">
            <button className="fav" onClick={handleOnAddToFavorites}> {isInFavorites ? <PiHeartFill /> : <PiHeartBold />}
                </button>
                <h2 className="ItemHeader">
                    {name}
                </h2>
            </header>
            <picture>
                <img src={image} alt={name} className="ItemImg"/>
            </picture>
            <section>
                <p className="InfoPr"> Precio: ${price}</p>
            </section>
            <footer>
            <Link to={`/item/${id}`} className="Option">Ver detalle</Link>
            </footer>
        </article>
    )
}

export default Item