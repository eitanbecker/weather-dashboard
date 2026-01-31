import React, { useState, useEffect } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, CloudDrizzle, CloudSnow, Loader } from 'lucide-react';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = '04ca721d879cfeb37bc016fe4a81b406'; // Replace with your actual API key

  const cities = [
    { name: 'Sharon, MA', lat: 42.1237, lon: -71.1787, gradient: 'from-blue-400 to-blue-600' },
    { name: 'Cleveland, OH', lat: 41.4993, lon: -81.6944, gradient: 'from-purple-400 to-purple-600' },
    { name: 'Los Angeles, CA', lat: 34.0522, lon: -118.2437, gradient: 'from-orange-400 to-red-500' },
    { name: 'Petach Tikvah, Israel', lat: 32.0853, lon: 34.8878, gradient: 'from-teal-400 to-cyan-600' }
  ];

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      const data = {};

      try {
        for (const city of cities) {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=imperial`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }

          const result = await response.json();
          
          // Process 5-day forecast (API returns 3-hour intervals)
          const dailyForecasts = [];
          const processedDates = new Set();

          result.list.forEach(item => {
            const date = item.dt_txt.split(' ')[0];
            if (!processedDates.has(date) && dailyForecasts.length < 5) {
              processedDates.add(date);
              
              // Find all forecasts for this date
              const dayForecasts = result.list.filter(f => f.dt_txt.startsWith(date));
              
              // Calculate max/min temps and average conditions
              const temps = dayForecasts.map(f => f.main.temp);
              const maxTemp = Math.round(Math.max(...temps));
              const minTemp = Math.round(Math.min(...temps));
              
              // Get midday forecast for precipitation and wind
              const middayForecast = dayForecasts[Math.floor(dayForecasts.length / 2)] || dayForecasts[0];
              const precipChance = Math.round((middayForecast.pop || 0) * 100);
              const windSpeed = Math.round(middayForecast.wind.speed);
              
              // Determine condition
              const weatherCode = middayForecast.weather[0].id;
              let condition = 'cloudy';
              if (weatherCode === 800) condition = 'sunny';
              else if (weatherCode === 801 || weatherCode === 802) condition = 'partly-cloudy';
              else if (weatherCode >= 200 && weatherCode < 600) condition = 'rainy';
              else if (weatherCode >= 600 && weatherCode < 700) condition = 'snow';

              dailyForecasts.push({
                date,
                maxTemp,
                minTemp,
                precipChance,
                windSpeed,
                condition
              });
            }
          });

          data[city.name] = {
            gradient: city.gradient,
            forecast: dailyForecasts
          };
        }

        setWeatherData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-white text-2xl font-bold flex items-center gap-3">
          <Loader className="w-8 h-8 animate-spin" />
          Loading live weather data...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-8 max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Weather</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Check your API key and try again.</p>
        </div>
      </div>
    );
  }

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
          <div className="inline-block bg-gradient-to-r from-green-400 to-blue-400 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg transform hover:scale-105 transition">
            🌍 Live Weather Data
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
          Powered by OpenWeatherMap API
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
