import { createContext, useContext, useState } from 'react';

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (cocktail) => {
    setFavourites((prevFavourites) => [...prevFavourites, cocktail]);
  };

  const removeFromFavourites = (cocktailId) => {
    setFavourites((prevFavourites) => prevFavourites.filter(cocktail => cocktail.idDrink !== cocktailId));
  };

  const initialFavouritesState = () => {
    setFavourites([])
  }

  return (
    <FavouritesContext.Provider value={{ favourites, addToFavourites, removeFromFavourites, initialFavouritesState}}>
      {children}
    </FavouritesContext.Provider>
  );
};
