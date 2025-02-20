import { useFavourites } from "@/context/FavouritesContext";
import { Heart, Star1 } from "iconsax-react";
import { useState } from "react";
import FavouriteMenu from "./FavouriteMenu";
import SearchBar from "./SearchBar";
import { searchCocktails } from "@/services/cocktailApi";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { favourites, removeFromFavourites, updateSearchResults } = useFavourites();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDeleteFav = (cocktail) => {
    removeFromFavourites(cocktail.idDrink);
  };

  const handleSearch = async (query) => {
    try {
      const searchResults = await searchCocktails(query, updateSearchResults) || [];
      console.log('Search Results:', searchResults);
    } catch (error) {
      console.error("Error fetching cocktails:", error);
    }
  };
  return (
    <header className="px-2 h-16 bg-yellow-500 w-full mx-auto max-w-[1200px] min-w-[320px] flex items-center justify-between">
      <div className="text-white text-2xl md:text-4xl font-bold">Cocktails</div>
      <SearchBar onSearch={handleSearch}/>
      <div className="relative flex justify-end">
        <button onClick={toggleMenu} className="p-1 bg-red-500 rounded-lg flex flex-col">
          <Heart
            onClick={toggleMenu}
            size="36"
            variant="Bold"
            className="cursor-pointer fill-gray-700 hover:fill-gray-800"
          />
          <span className="text-[10px] text-center -mt-1 font-bold">Fav</span>
        </button>

        {menuOpen && (
          <FavouriteMenu
            favourites={favourites}
            toggleMenu={toggleMenu}
            handleDelete={handleDeleteFav}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
