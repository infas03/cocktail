import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      if (query.trim()) {
        onSearch(query);
      }
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="relative md:w-96">
      <input
        type="text"
        className="px-4 py-2 w-full rounded-md border border-gray-300"
        placeholder="Search cocktails..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {query && (
        <div
          onClick={handleClear}
          className="absolute right-3 top-1/2 transform font-bold -translate-y-1/2 w-6 h-6 text-gray-500 cursor-pointer"
        >
          X
        </div>
      )}
    </div>
  );
};

export default SearchBar;
