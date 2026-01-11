import { SearchIcon } from "./SearchIcon";

type Props = {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
};

export const SearchBar = ({ searchQuery, onSearchQueryChange }: Props) => (
  <div className="mb-8 max-w-md mx-auto">
    <div className="relative">
      <input
        type="search"
        placeholder="Zoek recepten..."
        value={searchQuery}
        onChange={(e) => onSearchQueryChange(e.target.value)}
        className="w-full px-4 py-3 pl-12 text-secondary-900 bg-white rounded-full shadow-lg shadow-primary-600 focus:outline-none transition-colors"
      />
      <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
    </div>
  </div>
);