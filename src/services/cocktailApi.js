import axios from 'axios';

export const fetchRandomCocktail = async () => {
  try {
    const response = await axios.get('/api/random-cocktail');
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

export const searchCocktails = async (query, updateSearchResults) => {
  try {
    const response = await axios.get(`/api/search?s=${query}`);

    if (response.status === 200) {
      updateSearchResults(response.data);
      return response.data;
    } else {
      console.log("No cocktails found for the search query.");
      updateSearchResults([]);
      return [];
    }
  } catch (error) {
    console.error("Error fetching search cocktails:", error);
    throw error;
  }
};
