import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer } from "lucide-react";
import { getTranslation } from "@/utils/translations";

export function WeatherWidget({ language }: { language: string }) {
  const weatherData = {
    current: {
      temperature: 28,
      condition: 'partly_cloudy',
      humidity: 72,
      windSpeed: 8,
      pressure: 1013
    },
    forecast: [
      { day: getTranslation('today', language), temp: 28, condition: 'partly_cloudy', rain: 20 },
      { day: getTranslation('tomorrow', language), temp: 30, condition: 'sunny', rain: 5 },
      { day: getTranslation('dayAfter', language), temp: 26, condition: 'rainy', rain: 85 },
    ]
  };

  const getWeatherIcon = (condition: string, size = 'h-6 w-6') => {
    switch (condition) {
      case 'sunny':
        return <Sun className={`${size} text-yellow-500`} />;
      case 'rainy':
        return <CloudRain className={`${size} text-blue-500`} />;
      case 'partly_cloudy':
        return <Cloud className={`${size} text-gray-500`} />;
      default:
        return <Sun className={`${size} text-yellow-500`} />;
    }
  };

  const getConditionText = (condition: string) => {
    switch (condition) {
      case 'sunny':
        return getTranslation('sunny', language);
      case 'rainy':
        return getTranslation('rainy', language);
      case 'partly_cloudy':
        return getTranslation('partlyCloudy', language);
      default:
        return getTranslation('sunny', language);
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          {getWeatherIcon(weatherData.current.condition)}
          {getTranslation('weatherInfo', language)}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Weather */}
        <div className="bg-gradient-sky text-sky-foreground p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-bold">{weatherData.current.temperature}°C</div>
              <div className="text-sm opacity-90">
                {getConditionText(weatherData.current.condition)}
              </div>
            </div>
            {getWeatherIcon(weatherData.current.condition, 'h-12 w-12')}
          </div>
        </div>

        {/* Weather Details */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <Droplets className="h-4 w-4 text-sky" />
            <div>
              <div className="text-sm text-muted-foreground">
                {getTranslation('humidity', language)}
              </div>
              <div className="font-semibold">{weatherData.current.humidity}%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Wind className="h-4 w-4 text-earth" />
            <div>
              <div className="text-sm text-muted-foreground">
                {getTranslation('wind', language)}
              </div>
              <div className="font-semibold">{weatherData.current.windSpeed} km/h</div>
            </div>
          </div>
        </div>

        {/* 3-Day Forecast */}
        <div className="space-y-2">
          <h4 className="font-semibold text-primary">
            {getTranslation('forecast3Day', language)}
          </h4>
          {weatherData.forecast.map((day, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
              <div className="flex items-center gap-3">
                {getWeatherIcon(day.condition, 'h-5 w-5')}
                <span className="font-medium">{day.day}</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{day.temp}°C</div>
                <div className="text-xs text-muted-foreground">
                  {day.rain}% {getTranslation('rain', language)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Farming Alert */}
        {weatherData.forecast[2].rain > 80 && (
          <div className="bg-earth/10 border border-earth/20 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <CloudRain className="h-4 w-4 text-earth mt-0.5" />
              <div>
                <div className="font-semibold text-earth">
                  {getTranslation('farmingAlert', language)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {getTranslation('heavyRainExpected', language)}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}