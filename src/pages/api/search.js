import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { s } = req.query;
    if (!s) {
      return res.status(400).json({ error: "Search query is required." });
    }

    try {
      const response = await axios.get(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${s}`
      );

      const data = response.data;

      if (data.drinks) {
        res.status(200).json(data.drinks);
      } else {
        res
          .status(201)
          .json({ message: "No cocktails found for the search query." });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "Failed to fetch data from DB." });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
