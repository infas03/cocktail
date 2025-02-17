import axios from 'axios';

export const fetchRandomCocktail = async () => {
  try {
    const response = await axios.get('/api/randomCocktail');
    return response.data;
  } catch (error) {
    console.error("Error fetching random cocktail:", error);
    throw error;
  }
};

export const fetchMultipleRandomCocktails = async (numOfCocktails = 5) => {
  const cocktailList = [];
  const cocktailIds = new Set();

  while (cocktailList.length < numOfCocktails) {
    try {
      const cocktail = await fetchRandomCocktail();
      if (!cocktailIds.has(cocktail.idDrink)) {
        cocktailList.push(cocktail);
        cocktailIds.add(cocktail.idDrink);
      }
    } catch (error) {
      console.error("Error fetching cocktail:", error);
    }
  }

  return cocktailList;
};
