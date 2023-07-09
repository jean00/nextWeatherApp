import React from 'react';
import { fromUnixTime, format } from 'date-fns';
import Image from 'next/image';

const Forecasts = ({ dt, humidity, sunrise, sunset, temp, weather, windSpeed }: any) => {
  const formattedDt = format(fromUnixTime(dt), 'PP');
  const formattedSunrise = format(fromUnixTime(sunrise), 'p');
  const formattedSunset = format(fromUnixTime(sunset), 'p');
  const { max, min } = temp;
  const { description, icon } = weather[0];
  // const convertedTemp = (temp - 273.15).toFixed(0);
  // const convertedFeelsLike = (feels_like - 273.15).toFixed(0);

  const convertTemperatureKtoC = (temp: number) => {
    return (temp - 273.15).toFixed(0);
  };

  return (
    <div className="flex text-xs lg:text-lg font-satoshi lg:ml-20 mt-5 border-b border-gray-500 lg:border-0 text-center">
      <div className="mr-5 mt-4">{formattedDt}</div>
      <div className="mr-5">
        <Image src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather_image" width={50} height={50} className="rounded-full object-contain" />
      </div>
      <div className="mr-5 mt-4 font-semibold">
        {convertTemperatureKtoC(max)}°C / {convertTemperatureKtoC(min)}°C
      </div>
      <div className="mr-5 mt-4">{description}</div>
    </div>
  );
};

export default Forecasts;
