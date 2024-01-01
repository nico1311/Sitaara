import { createContext, useContext, useState } from "react";

const FavContext = createContext(); // <-- Call createContext as a function

export const useFavorites = () => {
  return useContext(FavContext);
};

export const FavProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addToFavorites = (item) => {
    setFavorites((prevFavorites) => [...prevFavorites, item]);
  };

  const removeFromFavorites = (itemId) => {
    setFavorites((prevFavorites) => prevFavorites.filter((item) => item.id !== itemId));
  };

  return (
    <FavContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavContext.Provider>
  );
};
