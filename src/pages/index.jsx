import CocktailCard from "@/components/CocktailCard";
import SkeletonHome from "@/components/SkeletonHome";
import Spinner from "@/components/Spinner";
import { fetchMultipleRandomCocktails } from "@/services/cocktailApi";
import { useEffect, useState } from "react";

export default function Home() {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(true);

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
  };

  console.log("cocktails: ", cocktails);

  return (
    <div className={`flex flex-col`}>
      <div className="flex justify-between items-center my-5">
        <div className="text-3xl font-bold">List Cocktails</div>
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
        ) : (
          cocktails?.map((cocktail, index) => {
            return <CocktailCard key={index} cocktail={cocktail} />;
          })
        )}
      </div>
    </div>
  );
}
