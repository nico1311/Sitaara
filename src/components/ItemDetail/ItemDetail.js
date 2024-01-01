import { useContext, useState, useEffect } from "react";
import ItemCount from "../ItemCount/ItemCount";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import './ItemDetail.css';
import { useFavorites } from "../context/FavContext";
import { PiHeartBold, PiHeartFill } from "react-icons/pi";

const ItemDetail = ({ id, name, category, image, description, price }) => {
    const [quantityAdded, setQuantityAdded] = useState(0);
    const [isInFavorites, setIsInFavorites] = useState(false);

    const { addItem } = useContext(CartContext);
    const { addToFavorites, removeFromFavorites, favorites } = useFavorites();
    const navigate = useNavigate();

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

    const handleOnAdd = (quantity) => {
        setQuantityAdded(quantity);

        const item = {
            id, name, price, image, description
        };

        addItem(item, quantity);
    };

    return (
        <article className="CardItemDetail">
            <header className="HeaderDetail">
                <Link onClick={() => navigate(-1)} className='retroceder'>{"< Volver"}</Link>
                <button className="favs" onClick={handleOnAddToFavorites}>
                    {isInFavorites ? <PiHeartFill /> : <PiHeartBold />}
                </button>
            </header>
            <div className="Details">
                <picture className="ImgDetail">
                    <img src={image} alt={name} className="ItemImg"></img>
                </picture>
                <section className="sectionDetail">
                    <h2 className="ItemHeaderDetail">
                        {name}
                    </h2>
                    <p className="Info">
                        Descripción: {description}
                    </p>
                    <p className="InfoPrecio">
                        Precio: ${price}
                    </p>
                    <p className="book">PARA RESERVAR TU TURNO DEBERÁS ENVIAR FOTO DEL COMPROBANTE DE PAGO POR WHATSAPP O INSTAGRAM.

LA LECTURA SE REALIZA DENTRO DE LOS 3 (TRES) DÍAS HÁBILES POSTERIORES A LA COMPRA; NO HACE FALTA ESTAR CONECTADO AL MOMENTO DEL TURNO.  LA MODALIDAD ES VÍA AUDIO Y FOTO DE LAS CARTAS POR WHATSAPP. </p>
                </section>
            </div>
            <footer className="ItemFooter">
                {
                    quantityAdded > 0 ? (
                        <Link to='/cart' className="Option">Terminar compra</Link>
                    ) : (
                        <ItemCount className="numerador" initial={1} stock={10} onAdd={handleOnAdd}></ItemCount>
                    )
                }
            </footer>
        </article>
    );
};

export default ItemDetail;
