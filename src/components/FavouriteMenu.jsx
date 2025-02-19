import { Trash } from "iconsax-react";
import Image from "next/image";

const FavouriteMenu = ({ favourites, toggleMenu, handleDelete }) => {

  const handleDeleteClick = (cocktail) => {
    handleDelete(cocktail)
  }
  return (
    <div className="absolute w-96 top-16 z-10 flex items-center justify-center">
      <div className="bg-white p-5 rounded-md w-full border-[1px] shadow-sm">
        <h3 className="text-2xl font-bold">Your Favourites</h3>
        <div className="flex flex-col mt-3">
          {favourites.length === 0 ? (
            <div>No favourites added yet.</div>
          ) : (
            favourites.map((cocktail, index) => (
              <div  key={index} className="flex items-center justify-between hover:bg-gray-100 rounded-lg p-3">
                <div className="flex items-center">
                  <Image
                    src={cocktail.strDrinkThumb}
                    alt={cocktail.strDrink}
                    width={48}
                    height={48}
                    className="rounded-full mr-3"
                  />
                  <div className="font-medium">{cocktail.strDrink}</div>
                </div>
                <button onClick={() => handleDeleteClick(cocktail)} className="bg-red-500 hover:bg-red-600 p-2 rounded-md">
                  <Trash size="20" color="#fff" variant="Bold" />
                </button>
              </div>
            ))
          )}
        </div>
        <button
          onClick={toggleMenu}
          className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FavouriteMenu;
