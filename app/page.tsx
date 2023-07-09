'use client';

import { useEffect, useState } from 'react';
import Weather from '@/components/Weather';

const getWeatherData = async (input: string) => {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=20f7632ffc2c022654e4093c6947b4f4`, { mode: 'cors' });
    const data = await response.json();
    console.log('data: ', await data);
    const {
      coord: { lon, lat },
      name,
      sys: { country },
    } = data; // Desctructuring the data object
    const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&APPID=20f7632ffc2c022654e4093c6947b4f4`, {
      mode: 'cors',
    });
    const weatherData = await weatherResponse.json();
    return { name, country, ...weatherData }; // returning an obj with  name, country, and weather data
  } catch (err) {
    console.log(err);
  }
};

interface IWeatherObj {
  name: string;
  country: string;
  current: {
    temp: number;
    humidity: number;
    wind_speed: number;
    visibility: number;
    feels_like: number;
    dt: number;
    sunrise: number;
    sunset: number;
    weather: [
      {
        description: string;
        icon: string;
      }
    ];
  };
}

interface IWeatherData {
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
}
const Home = (): React.JSX.Element => {
  const [input, setInput] = useState<string>('');
  const [currWeather, setCurrWeather] = useState<IWeatherData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => setInput(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
    try {
      const foreCast = await getWeatherData(input);
      console.log('foreCast: ', foreCast);
      // current weather
      const {
        name,
        country,
        current: {
          temp, // temperature convert - 273.15
          humidity,
          wind_speed,
          visibility, // visibility convert / 1000
          feels_like,
          dt,
          sunrise,
          sunset,
          weather: [{ description, icon /* id */ }],
        },
      }: IWeatherObj = foreCast;
      setCurrWeather((prevState) => ({
        ...prevState,
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
      }));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log('currWeather: ', currWeather);
  }, [currWeather]);

  return (
    <section className="w-full flex-center flex-col">
      <form className="relative w-full flex-center" onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter the country name" value={input} onChange={handleChange} required className="search_input peer" />
      </form>
      {currWeather && <Weather city={currWeather} />}
    </section>
  );
};

export default Home;
