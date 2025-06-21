import { useState, useEffect } from "react";
import { useQuery, useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { StateSelector } from "./StateSelector";
import { WeatherCard } from "./WeatherCard";
import { ForecastCard } from "./ForecastCard";
import { RecentSearches } from "./RecentSearches";

const INDIAN_STATES = {
  "Andhra Pradesh": ["Hyderabad", "Visakhapatnam", "Vijayawada", "Guntur"],
  "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "Delhi": ["New Delhi", "Central Delhi", "South Delhi", "North Delhi"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
  "Kerala": ["Kochi", "Thiruvananthapuram", "Kozhikode", "Thrissur"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela", "Puri"],
  "Punjab": ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol"]
};

export function WeatherDashboard() {
  const [selectedState, setSelectedState] = useState("Maharashtra");
  const [selectedCity, setSelectedCity] = useState("Mumbai");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [temperatureUnit, setTemperatureUnit] = useState<"C" | "F">("C");

  const recentSearches = useQuery(api.weather.getRecentSearches);
  const saveSearch = useMutation(api.weather.saveSearch);
  const getCachedWeather = useQuery(api.weather.getCachedWeather, { 
    state: selectedState, 
    city: selectedCity 
  });
  const fetchWeatherData = useAction(api.weather.fetchWeatherData);

  // Load temperature unit from localStorage
  useEffect(() => {
    const savedUnit = localStorage.getItem("indiaweather-temp-unit");
    if (savedUnit === "F") {
      setTemperatureUnit("F");
    }
  }, []);

  // Fetch weather data when state/city changes
  useEffect(() => {
    const loadWeatherData = async () => {
      if (!selectedState || !selectedCity) return;

      setIsLoading(true);
      try {
        // Check cache first
        if (getCachedWeather) {
          setWeatherData(getCachedWeather);
          setIsLoading(false);
          return;
        }

        // Fetch new data
        const data = await fetchWeatherData({ state: selectedState, city: selectedCity });
        setWeatherData(data);
        
        // Save search
        await saveSearch({ state: selectedState, city: selectedCity });
      } catch (error) {
        toast.error("Failed to fetch weather data");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWeatherData();
  }, [selectedState, selectedCity, getCachedWeather, fetchWeatherData, saveSearch]);

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    setSelectedCity(INDIAN_STATES[state as keyof typeof INDIAN_STATES][0]);
  };

  const handleCityChange = (city: string) => {
    setSelectedCity(city);
  };

  const handleRecentSearchClick = (state: string | undefined, city: string) => {
    if (state) {
      setSelectedState(state);
      setSelectedCity(city);
    }
  };

  const toggleTemperatureUnit = () => {
    const newUnit = temperatureUnit === "C" ? "F" : "C";
    setTemperatureUnit(newUnit);
    localStorage.setItem("indiaweather-temp-unit", newUnit);
  };

  const convertTemperature = (temp: number) => {
    if (temperatureUnit === "F") {
      return Math.round((temp * 9/5) + 32);
    }
    return Math.round(temp);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="flex-1 max-w-2xl">
            <StateSelector
              states={INDIAN_STATES}
              selectedState={selectedState}
              selectedCity={selectedCity}
              onStateChange={handleStateChange}
              onCityChange={handleCityChange}
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTemperatureUnit}
              className="px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-600/50 text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200"
            >
              °{temperatureUnit}
            </button>
          </div>
        </div>

        {/* Recent Searches */}
        {recentSearches && recentSearches.length > 0 && (
          <RecentSearches 
            searches={recentSearches} 
            onSearchClick={handleRecentSearchClick}
          />
        )}

        {/* Main Weather Display */}
        {isLoading ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Weather Card Skeleton */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 animate-pulse">
                <div className="h-8 bg-gray-700/50 rounded mb-6"></div>
                <div className="h-20 bg-gray-700/50 rounded mb-6"></div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-16 bg-gray-700/50 rounded"></div>
                  <div className="h-16 bg-gray-700/50 rounded"></div>
                </div>
              </div>
            </div>
            
            {/* Forecast Skeleton */}
            <div>
              <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 animate-pulse">
                <div className="h-6 bg-gray-700/50 rounded mb-6"></div>
                <div className="space-y-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-gray-700/50 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : weatherData ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Weather Card */}
            <div className="lg:col-span-2">
              <WeatherCard 
                data={{
                  ...weatherData,
                  temperature: convertTemperature(weatherData.temperature)
                }}
                temperatureUnit={temperatureUnit}
              />
            </div>
            
            {/* 5-Day Forecast */}
            <div>
              <ForecastCard 
                forecast={weatherData.forecast.map((day: any) => ({
                  ...day,
                  temperature: convertTemperature(day.temperature)
                }))}
                temperatureUnit={temperatureUnit}
              />
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-8xl mb-6">🌦️</div>
            <h3 className="text-2xl font-semibold text-white mb-3">Select a State & City</h3>
            <p className="text-gray-400 text-lg">Choose from the dropdown above to get weather information</p>
          </div>
        )}
      </div>
    </div>
  );
}
