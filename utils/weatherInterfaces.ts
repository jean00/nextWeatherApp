export interface IWeatherObj {
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
    weather: {
      description: string;
      icon: string;
    }[];
  };
  daily: IForecast[];
}

export interface IWeatherData {
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

export interface IForecast {
  dt: number;
  temp: {
    max: number;
    min: number;
  };
  weather: {
    id: number;
    icon: string;
    description: string;
  }[];
}

export interface ICurrForecastData {
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
  };
  forecasts: {
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
  }[];
}

export interface ISavedCity {
  _id: string;
  name: string;
  country: string;
  creator: string;
}
