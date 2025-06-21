interface RecentSearch {
  state?: string;
  city: string;
  searchedAt: number;
}

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSearchClick: (state: string | undefined, city: string) => void;
}

export function RecentSearches({ searches, onSearchClick }: RecentSearchesProps) {
  return (
    <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <span className="mr-3 text-xl">🕒</span>
        Recent Searches
      </h3>
      
      <div className="flex flex-wrap gap-3">
        {searches.map((search, index) => (
          <button
            key={index}
            onClick={() => onSearchClick(search.state, search.city)}
            className="px-4 py-2 bg-gray-700/30 backdrop-blur-sm rounded-full text-white hover:bg-gray-600/40 transition-all duration-200 text-sm border border-gray-600/30 hover:border-gray-500/50"
          >
            {search.city}{search.state ? `, ${search.state}` : ''}
          </button>
        ))}
      </div>
    </div>
  );
}
