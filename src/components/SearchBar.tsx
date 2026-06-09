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
        className="w-full px-4 py-3 pl-12 text-ink bg-white rounded-full shadow-lg shadow-accent/15 focus:outline-none focus:ring-2 focus:ring-accent transition-all"
      />
      <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted w-5 h-5" />
    </div>
  </div>
);
