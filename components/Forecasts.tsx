import React from 'react';
import { fromUnixTime, format } from 'date-fns';
import Image from 'next/image';

interface ITemp {
  max: number;
  min: number;
}

interface IWeather {
  description: string;
  icon: string;
}

interface IForecasts {
  dt: number;
  temp: ITemp;
  weather: IWeather[];
}

const Forecasts = ({ dt, temp, weather }: IForecasts) => {
  const formattedDt: string = format(fromUnixTime(dt), 'PP');
  const { max, min }: ITemp = temp;
  const { description, icon }: IWeather = weather[0];

  const convertTemperatureKtoC = (temp: number): string => (temp - 273.15).toFixed(0);

  return (
    <div className="flex text-xs lg:text-lg font-satoshi lg:ml-20 border-b border-gray-500 lg:border-0 text-center">
      <div className="mr-5 mt-4 w">{formattedDt}</div>
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
