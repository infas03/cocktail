import { createContext, useContext, useState } from "react";

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearch, setSearch] = useState(false)

  const addToFavourites = (cocktail) => {
    setFavourites((prevFavourites) => [...prevFavourites, cocktail]);
  };

  const removeFromFavourites = (cocktailId) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((cocktail) => cocktail.idDrink !== cocktailId)
    );
  };

  const initialFavouritesState = () => {
    setFavourites([]);
    setSearch(false);
  };

  const updateSearchResults = (results) => {
    setSearch(true)
    setSearchResults(results);
  };

  const initialSearchState = () => {
    setSearchResults([]);
  };

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        searchResults,
        isSearch,
        addToFavourites,
        removeFromFavourites,
        initialFavouritesState,
        initialSearchState,
        updateSearchResults,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
