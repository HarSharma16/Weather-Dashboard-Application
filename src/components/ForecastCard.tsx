interface ForecastItem {
  date: string;
  temperature: number;
  condition: string;
  icon: string;
}

interface ForecastCardProps {
  forecast: ForecastItem[];
  temperatureUnit: "C" | "F";
}

export function ForecastCard({ forecast, temperatureUnit }: ForecastCardProps) {
  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: string } = {
      "01d": "☀️", "01n": "🌙",
      "02d": "⛅", "02n": "☁️",
      "03d": "☁️", "03n": "☁️",
      "04d": "☁️", "04n": "☁️",
      "09d": "🌧️", "09n": "🌧️",
      "10d": "🌦️", "10n": "🌧️",
      "11d": "⛈️", "11n": "⛈️",
      "13d": "❄️", "13n": "❄️",
      "50d": "🌫️", "50n": "🌫️",
    };
    return iconMap[iconCode] || "🌤️";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-gray-800/30 backdrop-blur-md rounded-2xl p-6 border border-gray-700/50 text-white">
      <h3 className="text-xl font-semibold mb-6 flex items-center">
        <span className="mr-3 text-2xl">📅</span>
        5-Day Forecast
      </h3>
      
      <div className="space-y-4">
        {forecast.map((day, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-4 bg-gray-700/20 backdrop-blur-sm rounded-xl hover:bg-gray-700/30 transition-all duration-200 border border-gray-600/20"
          >
            <div className="flex items-center space-x-4">
              <span className="text-3xl">{getWeatherIcon(day.icon)}</span>
              <div>
                <div className="font-medium text-lg">{formatDate(day.date)}</div>
                <div className="text-sm text-gray-400 capitalize">{day.condition}</div>
              </div>
            </div>
            
            <div className="text-2xl font-semibold">
              {day.temperature}°{temperatureUnit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
