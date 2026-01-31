import React from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, CloudDrizzle, CloudSnow } from 'lucide-react';

const WeatherDashboard = () => {
  const weatherData = {
    'Sharon, MA': {
      gradient: 'from-blue-400 to-blue-600',
      forecast: [
        { date: '2026-01-30', maxTemp: 38, minTemp: 28, precipChance: 65, windSpeed: 12, condition: 'snow' },
        { date: '2026-01-31', maxTemp: 35, minTemp: 25, precipChance: 45, windSpeed: 15, condition: 'cloudy' },
        { date: '2026-02-01', maxTemp: 32, minTemp: 22, precipChance: 30, windSpeed: 10, condition: 'cloudy' },
        { date: '2026-02-02', maxTemp: 40, minTemp: 30, precipChance: 20, windSpeed: 8, condition: 'partly-cloudy' },
        { date: '2026-02-03', maxTemp: 45, minTemp: 33, precipChance: 10, windSpeed: 6, condition: 'sunny' }
      ]
    },
    'Cleveland, OH': {
      gradient: 'from-purple-400 to-purple-600',
      forecast: [
        { date: '2026-01-30', maxTemp: 35, minTemp: 26, precipChance: 70, windSpeed: 18, condition: 'snow' },
        { date: '2026-01-31', maxTemp: 33, minTemp: 23, precipChance: 55, windSpeed: 20, condition: 'snow' },
        { date: '2026-02-01', maxTemp: 36, minTemp: 27, precipChance: 40, windSpeed: 14, condition: 'cloudy' },
        { date: '2026-02-02', maxTemp: 38, minTemp: 28, precipChance: 35, windSpeed: 12, condition: 'cloudy' },
        { date: '2026-02-03', maxTemp: 42, minTemp: 31, precipChance: 25, windSpeed: 10, condition: 'partly-cloudy' }
      ]
    },
    'Los Angeles, CA': {
      gradient: 'from-orange-400 to-red-500',
      forecast: [
        { date: '2026-01-30', maxTemp: 68, minTemp: 52, precipChance: 15, windSpeed: 7, condition: 'sunny' },
        { date: '2026-01-31', maxTemp: 70, minTemp: 54, precipChance: 10, windSpeed: 6, condition: 'sunny' },
        { date: '2026-02-01', maxTemp: 72, minTemp: 55, precipChance: 5, windSpeed: 8, condition: 'sunny' },
        { date: '2026-02-02', maxTemp: 71, minTemp: 54, precipChance: 20, windSpeed: 9, condition: 'partly-cloudy' },
        { date: '2026-02-03', maxTemp: 69, minTemp: 53, precipChance: 30, windSpeed: 10, condition: 'cloudy' }
      ]
    },
    'Petach Tikvah, Israel': {
      gradient: 'from-teal-400 to-cyan-600',
      forecast: [
        { date: '2026-01-30', maxTemp: 65, minTemp: 50, precipChance: 40, windSpeed: 11, condition: 'rainy' },
        { date: '2026-01-31', maxTemp: 63, minTemp: 48, precipChance: 55, windSpeed: 13, condition: 'rainy' },
        { date: '2026-02-01', maxTemp: 64, minTemp: 49, precipChance: 35, windSpeed: 10, condition: 'cloudy' },
        { date: '2026-02-02', maxTemp: 67, minTemp: 51, precipChance: 20, windSpeed: 8, condition: 'partly-cloudy' },
        { date: '2026-02-03', maxTemp: 70, minTemp: 53, precipChance: 10, windSpeed: 7, condition: 'sunny' }
      ]
    }
  };

  const getWeatherIcon = (condition) => {
    switch(condition) {
      case 'sunny':
        return <Sun className="w-6 h-6 text-yellow-200" />;
      case 'partly-cloudy':
        return <Cloud className="w-6 h-6 text-white opacity-80" />;
      case 'cloudy':
        return <Cloud className="w-6 h-6 text-white" />;
      case 'rainy':
        return <CloudRain className="w-6 h-6 text-white" />;
      case 'drizzle':
        return <CloudDrizzle className="w-6 h-6 text-white" />;
      case 'snow':
        return <CloudSnow className="w-6 h-6 text-white" />;
      default:
        return <Cloud className="w-6 h-6 text-white" />;
    }
  };

  const formatDateShort = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'numeric', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-white opacity-20 blur-3xl rounded-full"></div>
            <h1 className="relative text-4xl md:text-5xl font-bold text-white drop-shadow-2xl mb-2 flex items-center justify-center gap-3">
              <Sun className="w-10 h-10 md:w-12 md:h-12 text-yellow-300 animate-pulse" />
              5-Day Weather Forecast
              <CloudRain className="w-10 h-10 md:w-12 md:h-12 text-blue-200" />
            </h1>
          </div>
          <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg transform hover:scale-105 transition">
            📍 Demo Version - Sample Data
          </div>
        </div>
        
        <div className="space-y-4">
          {Object.entries(weatherData).map(([cityName, cityData]) => (
            <div
              key={cityName}
              className={`bg-gradient-to-r ${cityData.gradient} rounded-2xl shadow-2xl p-4 transform transition hover:scale-[1.01]`}
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Wind className="w-6 h-6" />
                {cityName}
              </h2>
              
              <div className="grid grid-cols-5 gap-2">
                {cityData.forecast.map((day) => (
                  <div
                    key={day.date}
                    className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 text-center"
                  >
                    <div className="text-white font-semibold text-xs md:text-sm mb-2">
                      {formatDateShort(day.date)}
                    </div>
                    
                    <div className="flex justify-center mb-2">
                      {getWeatherIcon(day.condition)}
                    </div>
                    
                    <div className="text-white text-base md:text-lg font-bold mb-2">
                      {day.maxTemp}° / {day.minTemp}°
                    </div>
                    
                    <div className="flex items-center justify-center gap-3 text-white text-xs md:text-sm">
                      <div className="flex items-center gap-1">
                        <Droplets className="w-3 h-3" />
                        <span>{day.precipChance}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Wind className="w-3 h-3" />
                        <span>{day.windSpeed}mph</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6 text-white text-sm opacity-75">
          Demo version with sample weather data
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
