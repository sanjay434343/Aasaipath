import axios from 'axios';

const API_KEY = 'adc917036636176de99bed25c5610773';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function getWeatherInfo(city: string) {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,  // Example: "Pollachi,Tamil Nadu"
        appid: API_KEY,
        units: 'metric'
      }
    });

    return {
      temperature: Math.round(response.data.main.temp),
      humidity: response.data.main.humidity,
      rainChance: Math.round(response.data.clouds.all)
    };
  } catch (error) {
    console.error('Error fetching weather info:', error);
    return {
      temperature: 'N/A',
      humidity: 'N/A',
      rainChance: 'N/A'
    };
  }
}
