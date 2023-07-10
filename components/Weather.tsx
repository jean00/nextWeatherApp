import Image from 'next/image';
import { fromUnixTime, format } from 'date-fns';
import Forecasts from './Forecasts';

interface IWeatherData {
  curr: {
    name: string;
    country: string;
    description: string;
    temp: number;
    humidity: number;
    wind_speed: number;
    visibility: number;
    feels_like: number;
    dt: number;
    sunrise: number;
    sunset: number;
    icon: string;
  } | null;
  forecasts:
    | {
        dt: number;
        humidity: number;
        sunrise: number;
        sunset: number;
        temp: {
          max: number;
          min: number;
        };
        weather: [
          {
            id: number;
            icon: string;
            description: string;
          }
        ];
        wind_speed: number;
      }[]
    | null;
}

const Weather: React.FC<IWeatherData> = ({ curr, forecasts }: IWeatherData) => {
  if (!curr || !forecasts) return; // Handle the case when city is null or undefined
  const { name, country, description, temp, humidity, wind_speed, visibility, feels_like, dt, sunrise, sunset, icon } = curr;
  const formattedDt = format(fromUnixTime(dt), 'PPPP');
  const formattedSunrise = format(fromUnixTime(sunrise), 'p');
  const formattedSunset = format(fromUnixTime(sunset), 'p');
  const convertedTemp = (temp - 273.15).toFixed(0);
  const convertedFeelsLike = (feels_like - 273.15).toFixed(0);

  return (
    <div className="flex flex-col lg:flex-row bg-gray mt-20 w-full flex-1 rounded-lg border border-gray-300 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter bg-slate-200">
      <div className="font-satoshi">
        <p className="lg:ml-5 mb-5">{formattedDt}</p>
        <h3 className="lg:text-4xl font-semibold text-gray-900 ml-5">
          {name}, {country}
        </h3>
        <div className="flex justify-between items-start mb-10">
          <div className="flex-1 flex justify-start items-center cursor-pointer">
            <Image
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              alt="weather_image"
              width={100}
              height={100}
              className="rounded-full object-contain"
            />
            <div className="flex mt-10">
              <div className="flex flex-col">
                <h3 className="lg:text-4xl font-semibold text-gray-900">{convertedTemp}°C</h3>
                <p className="font-inter lg:text-1xl text-gray-500">{description}</p>
              </div>
            </div>
          </div>
        </div>
        <p className="lg:ml-5 font-satoshi font-semibold text-2xl">Feels like: {convertedFeelsLike}°C</p>
        <div className="lg:ml-5 mt-7 flex items-start border-l border-gray-500">
          <div className="flex-col ml-3 font-inter lg:text-lg text-gray-500">
            <p className="mb-2">
              <span className="font-satoshi font-semibold text-gray-900">Humidity:</span> {humidity}%
            </p>
            <p className="mb-2">
              <span className="font-satoshi font-semibold text-gray-900">Wind Speed:</span> {wind_speed} km/h
            </p>
            <p>
              <span className="font-satoshi font-semibold text-gray-900">Visibility:</span> {visibility / 1000} km
            </p>
          </div>
          <div className="flex-col ml-8 font-inter lg:text-lg text-gray-500">
            <p className="mb-2">
              <span className="font-satoshi font-semibold text-gray-900">Sunrise:</span> {formattedSunrise}
            </p>
            <p>
              <span className="font-satoshi font-semibold text-gray-900">Sunset:</span> {formattedSunset}
            </p>
          </div>
        </div>
        {/* Forecast 7 days */}
      </div>
      <div className="lg:ml-20 mt-5">
        <p className="lg:ml-20 font-satoshi font-semibold text-2xl ">7 day forecast</p>
        {forecasts.map((day, index) => (
          // id
          <Forecasts key={day.weather[0].id + `-${index}`} dt={day.dt} temp={day.temp} weather={day.weather} />
        ))}
      </div>
    </div>
  );
};

export default Weather;
