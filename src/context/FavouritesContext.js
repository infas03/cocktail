import { createContext, useContext, useState } from "react";

const FavouritesContext = createContext();

export const useFavourites = () => useContext(FavouritesContext);

export const FavouritesProvider = ({ children, value }) => {
  const [favourites, setFavourites] = useState(value?.favourites || []);
  const [searchResults, setSearchResults] = useState(value?.searchResults || []);
  const [isSearch, setSearch] = useState(value?.isSearch || false);

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
