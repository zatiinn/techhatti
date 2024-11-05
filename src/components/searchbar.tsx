import { Search } from "lucide-react";
import { useState } from "react";

const Searchbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="relative w-[300px]">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      <input
        type="text"
        placeholder="Search"
        aria-label="Search tasks"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-full focus:outline-none ring-2 ring-gray-200"
      />
    </div>
  );
};

export default Searchbar;
