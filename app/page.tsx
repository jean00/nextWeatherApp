'use client';

import { useEffect, useState } from 'react';
import Weather from '@/components/Weather';
import { useRouter, useSearchParams } from 'next/navigation';
import { IForecast, IWeatherData, IWeatherObj } from '@/utils/weatherInterfaces';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const getWeatherData = async (input: string) => {
  try {
    // Getting the coordinates of the city
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=${API_KEY}`, { mode: 'cors' });
    const data = await response.json();
    const {
      coord: { lon, lat },
      name,
      sys: { country },
    } = data; // Destructuring the data object
    // Using the coordinates to get the weather data
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=${API_KEY}`, {
      mode: 'cors',
    });
    const weatherData = await weatherResponse.json();
    // Returning an obj with  name, country, and weather data
    return { name, country, ...weatherData };
  } catch (err) {
    console.log(err);
  }
};

const formatWeatherData = (name: string, country: string, data: IWeatherObj['current']): IWeatherData => {
  const {
    temp,
    humidity,
    wind_speed,
    visibility,
    feels_like,
    dt,
    sunrise,
    sunset,
    weather: [{ description, icon }],
  } = data;

  return {
    name,
    country,
    description,
    temp,
    humidity,
    wind_speed,
    visibility,
    feels_like,
    dt,
    sunrise,
    sunset,
    icon,
  };
};

const formatForecasts = (data: IForecast[]): IForecast[] => {
  // Remove the first day from the array because it's equal the current day
  return data.slice(1).map((day) => {
    const {
      dt,
      temp: { max, min },
      weather: [{ id, icon, description }],
    } = day;

    return {
      dt,
      temp: { max, min },
      weather: [{ id, icon, description }],
    };
  });
};

const Home = (): React.JSX.Element => {
  const [input, setInput] = useState<string>('');
  const [currWeather, setCurrWeather] = useState<IWeatherData | null>(null);
  const [forecasts, setForecasts] = useState<any>([]);
  const [error, setError] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const searchCity = searchParams.get('search');
  const router = useRouter();

  useEffect(() => {
    if (!searchCity) return;
    // fetch data from the url parameter is there's any
    const fetchWeather = async () => {
      try {
        const foreCast = await getWeatherData(searchCity);
        // current weather
        const { name, country, current, daily }: IWeatherObj = foreCast;
        setCurrWeather(formatWeatherData(name, country, current));
        setForecasts(formatForecasts(daily));
      } catch (err) {
        console.log(err);
      }
    };
    fetchWeather();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => setInput(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // Reset error, forecasts, and currWeather
    setError(false);
    setForecasts([]);
    setCurrWeather(null);
    // Fetch weather data
    try {
      const foreCast = await getWeatherData(input);
      const { name, country, current, daily }: IWeatherObj = foreCast;
      setCurrWeather(formatWeatherData(name, country, current));
      setForecasts(formatForecasts(daily));
    } catch (err) {
      setError(true);
      setInput('');
    }
    // Reset pathname to /
    router.push('/', undefined, { shallow: true });
  };

  return (
    <section className="w-full flex-center flex-col">
      <form className="relative w-full flex-center" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter the country name" value={input} onChange={handleChange} required className="search_input peer" />
      </form>
      {currWeather ? <Weather curr={currWeather} forecasts={forecasts} /> : error && <h1>City/Country/State not found</h1>}
    </section>
  );
};

export default Home;
