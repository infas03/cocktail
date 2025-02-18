import CocktailCard from "@/components/CocktailCard";
import SkeletonHome from "@/components/SkeletonHome";
import Spinner from "@/components/Spinner";
import { useFavourites } from "@/context/FavouritesContext";
import { fetchMultipleRandomCocktails } from "@/services/cocktailApi";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    favourites,
    searchResults,
    isSearch,
    addToFavourites,
    removeFromFavourites,
    initialFavouritesState,
    initialSearchState,
  } = useFavourites();

  const getCocktails = async () => {
    try {
      setLoading(true);
      const cocktailList = await fetchMultipleRandomCocktails(5);
      setCocktails(cocktailList);
    } catch (error) {
      console.error("Error fetching cocktails:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCocktails();
  }, []);

  const handleRefresh = () => {
    getCocktails();
    initialFavouritesState();
    initialSearchState();
  };

  const handleFavourite = useCallback(
    (cocktail) => {
      console.log("click: ", cocktail);
      if (favourites.some((fav) => fav.idDrink === cocktail.idDrink)) {
        removeFromFavourites(cocktail.idDrink);
      } else {
        addToFavourites(cocktail);
      }
    },
    [favourites, addToFavourites, removeFromFavourites]
  );

  console.log("cocktails: ", cocktails);
  console.log("searchResults: ", searchResults);
  console.log("isSearch: ", isSearch);

  return (
    <div className={`flex flex-col`}>
      <div className="flex justify-between items-center my-5">
        <div className="text-xl md:text-3xl font-bold">Cocktail List</div>
        <button
          className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 font-semibold rounded-md disabled:bg-gray-600 w-32 h-10"
          onClick={handleRefresh}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Refresh"}
        </button>
      </div>

      <div className="flex flex-wrap gap-10">
        {loading ? (
          <SkeletonHome />
        ) : (isSearch ? searchResults : cocktails)?.length > 0 ? (
          (isSearch ? searchResults : cocktails).map((cocktail) => (
            <CocktailCard
              key={cocktail.idDrink}
              cocktail={cocktail}
              handleFavouriteClick={handleFavourite}
              isFavourite={favourites.some(
                (fav) => fav.idDrink === cocktail.idDrink
              )}
            />
          ))
        ) : (
          <div>No Data Found</div>
        )}
      </div>
    </div>
  );
}
