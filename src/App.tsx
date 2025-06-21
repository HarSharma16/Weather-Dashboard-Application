import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Toaster } from "sonner";
import { WeatherDashboard } from "./components/WeatherDashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <nav className="backdrop-blur-md bg-black/20 border-b border-gray-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">🌦️</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">IndiaWeather</h1>
                <p className="text-xs text-gray-400">Real-time weather across India</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-2 text-gray-400 text-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>Live Data</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="min-h-[calc(100vh-4rem)]">
        <WeatherDashboard />
      </main>

      <footer className="backdrop-blur-md bg-black/20 border-t border-gray-700/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 IndiaWeather. Powered by Convex & React.
          </p>
          <p className="text-gray-500 text-xs mt-1">
            Weather data is for demonstration purposes only
          </p>
        </div>
      </footer>

      <Toaster theme="dark" />
    </div>
  );
}
