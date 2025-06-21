interface WeatherCardProps {
  data: {
    state: string;
    city: string;
    temperature: number;
    condition: string;
    description: string;
    humidity: number;
    windSpeed: number;
    icon: string;
    localTime: string;
  };
  temperatureUnit: "C" | "F";
}

export function WeatherCard({ data, temperatureUnit }: WeatherCardProps) {
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

  const getBackgroundGradient = (condition: string) => {
    const gradients: { [key: string]: string } = {
      "Clear": "from-yellow-600/20 to-orange-600/20",
      "Sunny": "from-yellow-600/20 to-orange-600/20",
      "Clouds": "from-gray-600/20 to-gray-800/20",
      "Cloudy": "from-gray-600/20 to-gray-800/20",
      "Partly Cloudy": "from-blue-600/20 to-gray-600/20",
      "Rain": "from-blue-700/20 to-blue-900/20",
      "Light Rain": "from-blue-600/20 to-blue-800/20",
      "Heavy Rain": "from-blue-800/20 to-blue-900/20",
      "Thunderstorm": "from-purple-700/20 to-gray-900/20",
      "Haze": "from-yellow-700/20 to-gray-700/20",
    };
    return gradients[condition] || "from-blue-600/20 to-purple-600/20";
  };

  return (
    <div className={`bg-gradient-to-br ${getBackgroundGradient(data.condition)} backdrop-blur-md rounded-2xl p-8 border border-gray-700/50 text-white relative overflow-hidden`}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-8 right-8 w-40 h-40 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-8 left-8 w-32 h-32 bg-white rounded-full animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-4xl font-bold mb-1">{data.city}</h2>
            <p className="text-gray-300 text-lg">{data.state}</p>
            <p className="text-sm text-gray-400 mt-2 flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {data.localTime}
            </p>
          </div>
          <div className="text-8xl animate-bounce">
            {getWeatherIcon(data.icon)}
          </div>
        </div>

        {/* Temperature */}
        <div className="mb-8">
          <div className="text-7xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {data.temperature}°{temperatureUnit}
          </div>
          <div className="text-2xl capitalize text-gray-200">{data.description}</div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl">💧</span>
              <span className="text-gray-300">Humidity</span>
            </div>
            <div className="text-3xl font-semibold">{data.humidity}%</div>
          </div>
          
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-600/30">
            <div className="flex items-center space-x-3 mb-3">
              <span className="text-3xl">💨</span>
              <span className="text-gray-300">Wind Speed</span>
            </div>
            <div className="text-3xl font-semibold">{data.windSpeed} km/h</div>
          </div>
        </div>
      </div>
    </div>
  );
}
