import "./weather.css";
import Speed from "/public/weatherIMG/icons8-wind-100.png";
import Humidity from "/public/weatherIMG/icons8-humidity-100.png";
import Sun from "/public/weatherIMG/icons8-sun-144.png";
import Rain from "/public/weatherIMG/icons8-rain-100.png";
import Snow from "/public/weatherIMG/icons8-snow-100.png";
import cloudSun from "/public/weatherIMG/icons8-cloud-sun-96.png";
import Search from "/public/weatherIMG/icons8-search-50.png";

import { useState } from "react";

function Weatherfrontend({
  icon,
  temp,
  location,
  latitude,
  country,
  longitude,
  humidity,
  speed,
}) {
  return (
    <>
      <img src={icon} alt="weatherpng" />
      <div className="temp">{temp}&#8451;</div>
      <div className="location">{location}</div>
      <div className="country">{country}</div>
      <div className="latANDlon">
        <div>
          <span className="lat">latitude</span>
          <span>{latitude}</span>
        </div>
        <div>
          <span className="lat">longitude</span>
          <span>{longitude}</span>
        </div>
      </div>
      <div className="waterSpeed">
        <div>
          <div>
            <img className="moi" src={Humidity} alt="" />{" "}
          </div>
          <span>{humidity}%</span>
        </div>
        <div>
          <div>
            {" "}
            <img className="speed" src={Speed} alt="" />{" "}
          </div>
          <span>{speed}km/h</span>
        </div>
      </div>
    </>
  );
}

function Weather() {
  const urlkey = "6c23e5a4be572dad1fb52b48c72cb1f4";
  const [inputtext, setInputText] = useState("CHENNAI");
  const [icon, setIcon] = useState(Sun);
  const [temp, setTemp] = useState(100);
  const [location, setLocation] = useState("CHENNAI");
  const [country, setcountry] = useState("in");
  const [latitude, setlatitude] = useState(45.12);
  const [longitude, setLongitude] = useState(55.123);
  const [humidity, setHumidity] = useState(60);
  const [speed, setSpeed] = useState(2);
  const [citynotfound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const weathericonMap = {
    "01d": Sun,
    "01n": Sun,
    "02d": Sun,
    "02n": Sun,
    "03d": cloudSun,
    "03n": cloudSun,
    "04d": cloudSun,
    "04n": cloudSun,
    "09d": Rain,
    "09n": Rain,
    "10d": Rain,
    "10n": Rain,
    "13d": Snow,
    "13n": Snow,
  };

  const search = async () => {
    setLoading(true);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputtext}&appid=${urlkey}&units=Metric`;
    try {
      let res = await fetch(url);
      let data = await res.json();
      // console.log(data);
      if (data.cod == "404") {
        console.log("city not found");
        setCityNotFound(true);
        setLoading(false);
        return;
      }
      setTemp(data.main.temp);
      setLocation(data.name);
      setcountry(data.sys.country);
      setlatitude(data.coord.lat);
      setLongitude(data.coord.lon);
      setHumidity(data.main.humidity);
      setSpeed(data.wind.speed);
      const weatherIconCode = data.weather[0].icon;
      setIcon(weathericonMap[weatherIconCode] || Sun);
      setCityNotFound(false);
    } catch (error) {
      console.lerror("data fetching erreo" + error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  function handlekeydown(e) {
    if (e.key == "Enter") {
      search();
    }
  }
  return (
    <div className="continer">
      <div className="searchbox">
        <input
          type="text "
          onChange={(e) => {
            setInputText(e.target.value);
          }}
          onKeyDown={handlekeydown}
          value={inputtext}
        />
        <img src={Search} alt="searchsymble" onClick={() => search()} />
      </div>

      <div>
        {loading && <div className="loading">loading...</div>}
        {error && <div>{error}</div>}
        {citynotfound && <div className="citynotFound">city not found</div>}
      </div>
      {!loading && !citynotfound && (
        <div>
          <Weatherfrontend
            icon={icon}
            temp={temp}
            location={location}
            latitude={latitude}
            country={country}
            longitude={longitude}
            humidity={humidity}
            speed={speed}
          />
        </div>
      )}
    </div>
  );
}

export default Weather;
