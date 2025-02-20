import { FavouritesProvider } from "@/context/FavouritesContext";
import Home from "@/pages";
import { fetchMultipleRandomCocktails } from "@/services/cocktailApi";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import { Heart } from "iconsax-react";
import '@testing-library/jest-dom';

jest.mock('@/services/cocktailApi', () => ({
  fetchMultipleRandomCocktails: jest.fn(),
}));

const renderWithContext = (component) => {
  return render(<FavouritesProvider>{component}</FavouritesProvider>);
};

describe("Home Component", () => {
  const mockCocktails = [
    { idDrink: "1", strDrink: "Cocktail 1", strCategory: "Category 1", strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/9koz3f1643821062.jpg"},
    { idDrink: "2", strDrink: "Cocktail 2", strCategory: "Category 2", strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/9koz3f1643821063.jpg"},
    { idDrink: "3", strDrink: "Cocktail 3", strCategory: "Category 3", strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/9koz3f1643821065.jpg"},
    { idDrink: "4", strDrink: "Cocktail 4", strCategory: "Category 4", strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/9koz3f1643821066.jpg"},
    { idDrink: "5", strDrink: "Cocktail 5", strCategory: "Category 5", strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/9koz3f1643821067.jpg"},
  ];

  beforeEach(() => {
    fetchMultipleRandomCocktails.mockResolvedValue(mockCocktails);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("test1", async () => {    
    await act(async () => {
      renderWithContext(<Home />);
    });

    expect(screen.getByText("Cocktail List")).toBeInTheDocument();
  });

  test("renders CocktailCard components when data is fetched", async () => {
    await act(async () => {
      renderWithContext(<Home />);
    });
  
    await waitFor(() => {
      expect(screen.getByText("Cocktail 1")).toBeInTheDocument();
      expect(screen.getByText("Cocktail 2")).toBeInTheDocument();
    });
  });
  
  test("refreshes cocktail list when refresh button is clicked", async () => {
    await act(async () => {
      renderWithContext(<Home />);
    });
  
    await waitFor(() => {
      expect(screen.getByText("Cocktail 1")).toBeInTheDocument();
    });
  
    const newMockCocktails = [
      { idDrink: "6", strDrink: "Cocktail 6", strCategory: "Category 6", strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/9koz3f1643821068.jpg" },
      { idDrink: "7", strDrink: "Cocktail 7", strCategory: "Category 7", strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/9koz3f1643821069.jpg" },
    ];
    fetchMultipleRandomCocktails.mockResolvedValueOnce(newMockCocktails);
  
    await act(async () => {
      fireEvent.click(screen.getByText("Refresh"));
    });
  
    await waitFor(() => {
      expect(screen.getByText("Cocktail 6")).toBeInTheDocument();
      expect(screen.getByText("Cocktail 7")).toBeInTheDocument();
    });
  });

  test("displays search results when isSearch is true", async () => {
    const mockSearchResults = [
      { idDrink: "8", strDrink: "Search Cocktail 1", strCategory: "Category 8", strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/9koz3f1643821070.jpg" },
      { idDrink: "9", strDrink: "Search Cocktail 2", strCategory: "Category 9", strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/9koz3f1643821071.jpg" },
    ];
  
    const contextValues = {
      searchResults: mockSearchResults,
      isSearch: true,
      favourites: [],
      addToFavourites: jest.fn(),
      removeFromFavourites: jest.fn(),
      initialFavouritesState: jest.fn(),
      initialSearchState: jest.fn(),
    };
  
    await act(async () => {
      render(
        <FavouritesProvider value={contextValues}>
          <Home />
        </FavouritesProvider>
      );
    });
  
    await waitFor(() => {
      expect(screen.getByText("Search Cocktail 1")).toBeInTheDocument();
      expect(screen.getByText("Search Cocktail 2")).toBeInTheDocument();
    });
  });

  test("adds cocktail to favourites when 'Add to Favourites' button is clicked", async () => {
    const mockCocktail = {
      idDrink: "1",
      strDrink: "Cocktail 1",
      strCategory: "Category 1",
      strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/9koz3f1643821070.jpg"
    };

    const addToFavourites = jest.fn((cocktail) => {
      console.log("addToFavourites called with", cocktail); // Debug log
      contextValues.favourites.push(cocktail); // Simulate adding cocktail to favourites
    });
  
    const contextValues = {
      searchResults: [mockCocktail],
      isSearch: true,
      favourites: [],
      addToFavourites,
      // addToFavourites: jest.fn(),
      removeFromFavourites: jest.fn(),
      initialFavouritesState: jest.fn(),
      initialSearchState: jest.fn(),
    };
  
    await act(async () => {
      render(
        <FavouritesProvider value={contextValues}>
          <Home />
        </FavouritesProvider>
      );
    });
  
    await waitFor(() => {
      expect(screen.getByText("Cocktail 1")).toBeInTheDocument();
    });
  
    const favouriteButton = screen.getByTestId("favourite-button-1");
    expect(favouriteButton).toBeInTheDocument();
    expect(favouriteButton).toBeVisible();

    await act(async () => {
      fireEvent.click(favouriteButton);
      console.log("Clicked button, waiting for state change");
    });
  });
  
});
