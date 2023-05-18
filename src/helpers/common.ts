export const getWeatherImageUrl = (code: string | undefined) => {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
};
