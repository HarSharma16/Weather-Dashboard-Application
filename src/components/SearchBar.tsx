import { useState } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setQuery("");
      setIsExpanded(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className={`flex items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-full transition-all duration-300 ${isExpanded ? 'w-80' : 'w-64'}`}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setIsExpanded(false)}
          placeholder="Search for a city..."
          className="flex-1 px-6 py-3 bg-transparent text-white placeholder-white/70 outline-none"
        />
        <button
          type="submit"
          className="p-3 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
}
