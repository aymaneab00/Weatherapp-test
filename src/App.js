import { useState } from 'react';
import './App.css';
import Weather from './Components/Weather';

function App() {
  const [value, setvalue] = useState("")
  const [loading, setloading] = useState(true);
  const [dispay, setdisplay] = useState("");
  const [weather, setweather] = useState({});

  async function fetchweather(e) {
    e.preventDefault();
    try {
      setloading(true)
      // 1) Getting location (geocoding)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${value}`
      );
      const geoData = await geoRes.json();
      console.log(geoData);

      if (!geoData.results) throw new Error("Location not found");

      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      // console.log(`${name} ${convertToFlag(country_code)}`);

      // 2) Getting actual weather
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      
      setweather(weatherData.daily);
      console.log(weatherData.daily)
    } catch (err) {
      console.error(err);
    }
    finally{
      setloading(false)
    }
  }
  return (
    <div>
      <h1> Weather app</h1>
      <div>
        <input type='text' placeholder='Search for location' value={value} onChange={(e) => setvalue(e.target.value)} />
      </div>
      <button onClick={fetchweather} >Get weather </button>
      {loading && <p>
        Loading
      </p>}
      {
        weather.weathercode && <Weather weather={weather} location={value} />
      }
    </div>
  );
}

export default App;
