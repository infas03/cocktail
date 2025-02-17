import axios from 'axios';

const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export default async function handler(req, res) {
  try {
    const response = await axios.get(API_URL);
    const cocktail = response.data.drinks[0];
    res.status(200).json(cocktail);
  } catch (error) {
    console.error("Error fetching random cocktail:", error);
    res.status(500).json({ error: 'Failed to fetch cocktail' });
  }
}
