import Image from "next/image";

const CocktailCard = ({ cocktail }) => {
  return (
    <div className="w-60 h-60 relative">
      <div className="absolute right-2 top-2 text-xs bg-gray-900 px-2 py-1 text-white font-bold rounded-sm">
        {cocktail?.strCategory}
      </div>
      <Image
        src={cocktail?.strDrinkThumb}
        alt="pic"
        width={240}
        height={240}
        className="rounded-lg"
      />
      <div className="text-center font-semibold">{cocktail?.strDrink}</div>
    </div>
  );
};

export default CocktailCard;
