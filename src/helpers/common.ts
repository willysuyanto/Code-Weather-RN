export const getWeatherImageUrl = (code: string | undefined) => {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
};

export const renderTemperature = (temp: number | undefined) => {
  if (temp) {
    return `${Math.ceil(temp)}°C`;
  }
  return '';
};
