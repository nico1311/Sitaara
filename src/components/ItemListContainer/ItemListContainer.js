import React, { useEffect, useState } from "react";
import "./ItemListContainer.css";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import { db } from "../../services/FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import Footer from "../Footer/Footer";
import NavBar from "../Navbar/NavBar";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortByMostExpensive, setSortByMostExpensive] = useState(false);
  const [sortByLeastExpensive, setSortByLeastExpensive] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    const fetchProducts = async () => {
      try {
        const collectionRef = categoryId
          ? query(collection(db, "products"), where("category", "==", categoryId))
          : collection(db, "products");

        const response = await getDocs(collectionRef);

        const productsAdapted = response.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productsAdapted);
        setFilteredProducts(productsAdapted);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const handleSearch = (term) => {
    const filtered = products.filter(
      (product) => product.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleSortByMostExpensive = () => {
    setSortByMostExpensive(!sortByMostExpensive);
    setSortByLeastExpensive(false);

    const sortedProducts = [...filteredProducts].sort((a, b) =>
      sortByMostExpensive ? b.price - a.price : a.price - b.price
    );

    setFilteredProducts(sortedProducts);
  };

  const handleSortByLeastExpensive = () => {
    setSortByLeastExpensive(!sortByLeastExpensive);
    setSortByMostExpensive(false);

    const sortedProducts = [...filteredProducts].sort((a, b) =>
      sortByLeastExpensive ? a.price - b.price : b.price - a.price
    );

    setFilteredProducts(sortedProducts);
  };

  const getBackgroundImage = (category) => {
    switch (category) {
      case "conectar":
        return "url(https://d2r9epyceweg5n.cloudfront.net/stores/002/691/752/categories/30b0de4d-f63f-4d6a-b910-71e792d841fd-8e5fac6cbb2eaafdc516961013713251-1920-1920.jpeg)";
      case "lecturas":
        return "url(https://d2r9epyceweg5n.cloudfront.net/stores/002/691/752/themes/style/1-img-1653226374-1672097914-48e9d3d816a4b245e2389176d8215c951672097915-1920-1920.webp?310793147)";
      case "cursos":
        return "url(https://d2r9epyceweg5n.cloudfront.net/stores/002/691/752/themes/style/img-1724239888-1672087390-ad865b5e37e4e3529d68c8fa207655ef1672087390.jpg?310793147)";
      default:
        return "url(https://d2r9epyceweg5n.cloudfront.net/stores/002/691/752/categories/dsc07487-3432aaab6330afabb717013654624790-1920-1920.jpg)";
    }
  };

  const backgroundImage = getBackgroundImage(categoryId);

  return (
    <div className="title" style={{ backgroundImage, backgroundSize: 'cover', maxWidth: '100%', maxHeight: '700px' }}>
      {categoryId ? (
        <h2 className="titleh2">{categoryId}</h2>
      ) : (
        <h2 className="titleh2">Todos los productos</h2>
      )}
      <div className="item-list-container">
        <NavBar onSearch={handleSearch} />
        <div>
        <button className="OptionFilter"  onClick={handleSortByMostExpensive}>Menor precio - Mayor precio</button>
        <button className="Option Filer" onClick={handleSortByLeastExpensive}>Mayor precio - Menor precio</button>
        </div>
        {loading ? <p>Loading...</p> : <ItemList products={filteredProducts} />}
      </div>
    </div>
  );
};

export default ItemListContainer;
