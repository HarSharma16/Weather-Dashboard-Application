import { useState } from "react";

interface StateSelectorProps {
  states: { [key: string]: string[] };
  selectedState: string;
  selectedCity: string;
  onStateChange: (state: string) => void;
  onCityChange: (city: string) => void;
}

export function StateSelector({ 
  states, 
  selectedState, 
  selectedCity, 
  onStateChange, 
  onCityChange 
}: StateSelectorProps) {
  const [isStateOpen, setIsStateOpen] = useState(false);
  const [isCityOpen, setIsCityOpen] = useState(false);

  const handleStateSelect = (state: string) => {
    onStateChange(state);
    setIsStateOpen(false);
  };

  const handleCitySelect = (city: string) => {
    onCityChange(city);
    setIsCityOpen(false);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      {/* State Selector */}
      <div className="relative flex-1">
        <button
          onClick={() => setIsStateOpen(!isStateOpen)}
          className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-md border border-gray-600/50 rounded-xl text-left text-white hover:bg-gray-700/50 transition-all duration-200 flex items-center justify-between"
        >
          <div>
            <span className="text-sm text-gray-400">State</span>
            <div className="font-medium">{selectedState}</div>
          </div>
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isStateOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isStateOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-md border border-gray-600/50 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
            {Object.keys(states).map((state) => (
              <button
                key={state}
                onClick={() => handleStateSelect(state)}
                className="w-full px-6 py-3 text-left text-white hover:bg-gray-700/50 transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                {state}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* City Selector */}
      <div className="relative flex-1">
        <button
          onClick={() => setIsCityOpen(!isCityOpen)}
          className="w-full px-6 py-4 bg-gray-800/50 backdrop-blur-md border border-gray-600/50 rounded-xl text-left text-white hover:bg-gray-700/50 transition-all duration-200 flex items-center justify-between"
        >
          <div>
            <span className="text-sm text-gray-400">City</span>
            <div className="font-medium">{selectedCity}</div>
          </div>
          <svg 
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isCityOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {isCityOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 backdrop-blur-md border border-gray-600/50 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
            {states[selectedState]?.map((city) => (
              <button
                key={city}
                onClick={() => handleCitySelect(city)}
                className="w-full px-6 py-3 text-left text-white hover:bg-gray-700/50 transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                {city}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
