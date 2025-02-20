import { Heart } from "iconsax-react";
import Image from "next/image";

const CocktailCard = ({ cocktail, handleFavouriteClick, isFavourite }) => {
  return (
    <div key={cocktail?.idDrink} className="w-40 md:w-60 relative">
      <div className="absolute right-2 top-2 text-[10px] md:text-xs bg-gray-900 px-2 py-1 text-white font-bold rounded-sm">
        {cocktail?.strCategory}
      </div>
      <button
        data-testid={`favourite-button-${cocktail.idDrink}`}
        type="button"
        onClick={() => handleFavouriteClick(cocktail)}
        className="absolute left-2 top-2 bg-slate-800 p-1 rounded-md hover:bg-red-600"
      >
        <Heart
          data-testid={`favourite-icon-${cocktail.idDrink}`}
          size={15}
          color={isFavourite ? "#dc2626" : "#ffffff"}
          variant="Bold"
        />
      </button>
      <Image
        src={cocktail?.strDrinkThumb}
        alt="pic"
        width={240}
        height={240}
        className="rounded-lg w-40 h-40 md:w-60 md:h-60"
        priority
      />
      <div className="text-center font-semibold text-sm md:text-base">{cocktail?.strDrink}</div>
    </div>
  );
};

export default CocktailCard;
