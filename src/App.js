import {useEffect, useRef, useState} from 'react';
import './App.css';
import rainGif from './assets/rain.gif'
import clearGif from './assets/clear.gif'
import cloudsGif from './assets/cloud.gif';
import mistGif from './assets/mist.gif';
import drizzleGif from './assets/drizzle.gif'
import hazeGif from './assets/haze2.gif'
import defaulGif from './assets/default.gif'
import clearJpg from './assets/clear.jpg';
import rainJpg from './assets/rain1.avif';
import cloudsJpg from './assets/clouds.avif';
import mistJpg from './assets/mist2.avif';
import drizzleJpg from './assets/drizzle.gif';
import hazeJpg from './assets/hazebg.jpg'

function App() {

  const [weather, setWeather]= useState(localStorage.getItem('weather')? JSON.parse(localStorage.getItem('weather')):{})
  const[search, setSearch] = useState('');
  const[iconClass, setIconClass]= useState('');
  const[tip, setTip] = useState('');
  const weatherRef = useRef(null);
  
  const searchPressed = ()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=02f159f56e01ddaee4eb637903ee4690`)
    .then(res=>res.json())
    .then(data=>setWeather(data))
    setSearch('');
  }
  useEffect(()=>{
    localStorage.setItem('weather', JSON.stringify(weather))

    const changeBodyBg = ()=>{
      let imgUrl;
      if(weather.weather[0].main.toLowerCase() === 'clear'){
        imgUrl = clearGif;
      }
      else if(weather.weather[0].main.toLowerCase() === 'rain'){
        imgUrl = rainGif;
      }
      else if(weather.weather[0].main.toLowerCase() === 'clouds'){
        imgUrl = cloudsGif;
      }
      else if(weather.weather[0].main.toLowerCase() === 'mist'){
        imgUrl = mistJpg;
      }
      else if(weather.weather[0].main.toLowerCase() === 'drizzle'){
        imgUrl = drizzleJpg;
      }
      else if(weather.weather[0].main.toLowerCase() === 'haze'){
        imgUrl = hazeJpg;
      }
      else{
        imgUrl = defaulGif;
      }
      document.body.style.backgroundImage = `url(${imgUrl})`;
    }
    changeBodyBg();

    const changeWeatherBg =()=>{
      let imgUrl;
      if(weather.weather[0].main.toLowerCase() === 'clear'){
        imgUrl = clearJpg;
      }
      else if(weather.weather[0].main.toLowerCase() === 'rain'){
        imgUrl = rainJpg;
      }
      else if(weather.weather[0].main.toLowerCase() === 'clouds'){
        imgUrl = cloudsJpg;
      }
      else if(weather.weather[0].main.toLowerCase() === 'mist'){
        imgUrl = mistGif;
      }
      else if(weather.weather[0].main.toLowerCase() === 'drizzle'){
        imgUrl = drizzleGif;
      }
      else if(weather.weather[0].main.toLowerCase() === 'haze'){
        imgUrl = hazeGif;
      }
      else{
        imgUrl = defaulGif;
      }
      weatherRef.current.style.backgroundImage = `url(${imgUrl})`;
    }
    changeWeatherBg();

    const changeIcon = ()=>{
      if(weather.weather[0].main.toLowerCase() === 'clear'){
        setIconClass("fa-solid fa-sun clear-icon");
      }
      else if(weather.weather[0].main.toLowerCase() === 'rain'){
        setIconClass("fa-solid fa-cloud-showers-heavy rain-icon");
      }
      else if(weather.weather[0].main.toLowerCase() === 'clouds'){
        setIconClass("fa-solid fa-cloud cloud-icon");
      }
      else if(weather.weather[0].main.toLowerCase() === 'mist'){
        setIconClass("fa-solid fa-smog mist-icon");
      }
      else if(weather.weather[0].main.toLowerCase() === 'drizzle'){
        setIconClass("fa-solid fa-cloud-rain drizzle-icon");
      }
      else if(weather.weather[0].main.toLowerCase() === 'snow'){
        setIconClass("fa-solid fa-snowflake snow-icon");
      }
    }
    changeIcon();

    const changeTip = ()=>{
      if(weather.weather[0].main.toLowerCase() === 'clear'){
        setTip("Wear sunscreen to protect your skin! ☀️");
      }
      else if(weather.weather[0].main.toLowerCase() === 'rain' &&
      weather.weather[0].main.toLowerCase() === 'drizzle' ){
        setTip("Don't forget your umbrella! ☔");
      }
      else if(weather.weather[0].main.toLowerCase() === 'clouds'){
        setTip("Keep an eye on the sky, it might rain later!");
      }
      else if(weather.weather[0].main.toLowerCase() === 'mist'){
        setIconClass("Drive carefully in the mist!");
      }
      else if(weather.weather[0].main.toLowerCase() === 'snow'){
        setTip("Wear warm clothes and be cautious on slippery roads!");
      }
      else{
        setTip("Stay prepared for any weather!");
      }
    }
    changeTip();
  },[weather])

  
  return (
    <div className="app-weather">
      <div ref={weatherRef} className='app-weather-container text-light'>
        <div className='nav-bar d-flex align-items-center justify-content-between'>
          <p className='site fw-bold text-light'>weather.com</p>
          <div className='input-container d-flex align-items-center gap-2'>
            <div className='inputBox px-3 py-2'>
              <i className="fa-solid fa-location-dot"></i>
              <input value={search} onChange={(e)=>{setSearch(e.target.value)}} type='text' placeholder='Enter location'/>
            </div>
            <button onClick={searchPressed} className='p-2'>Check</button>
          </div>
        </div>
        <div className='row'>
          <div className='first col-lg-6'>
            <div className='temp mt-4 d-flex align-items-center gap-2'>
              <h1 className='degree'>{Math.floor(weather.main.temp - 273)}°</h1>
              <i className={iconClass}></i>
            </div>
            <h3 className='city mt-4'>{weather.name}, {weather.sys.country}</h3>
            <p className='weather mt-4 fw-bold'>{weather.weather[0].main}</p>
            <div className='maxmin-temp mt-4 d-flex align-items-center gap-2 fw-bold'>
              <p className='max'>H:{Math.floor(weather.main.temp_max - 273)}°</p>
              <p className='min'>L:{Math.floor(weather.main.temp_min - 273)}°</p>
            </div>
            <div className='desc mt-4 p-4'>
              <p className='mb-4'>Description: "{weather.weather[0].description}"</p>
              <p className="">💡 Health Tip: {tip}</p>
            </div>
          </div>
          <div className='second col-lg-6'>
            <div className='infos mt-4 d-flex align-items-center gap-5'>
              <div className='info py-2 px-3'>
                <div className='title d-flex align-items-center gap-2'>
                  <i className="fa-solid fa-temperature-three-quarters"></i>
                  <p>Feels like</p>
                </div>
                <h3 className='mt-2'>{Math.floor(weather.main.feels_like - 273)}°</h3>
                <p className='mt-2'>Humidity is making it feels warmer</p>
              </div>
              <div className='info py-2 px-3'>
                <div className='title d-flex align-items-center gap-2'>
                  <i className="fa-solid fa-droplet"></i>
                  <p>Humidity</p>
                </div>
                <h3 className='mt-2'>{weather.main.humidity}%</h3>
                <p className='mt-2'>The dew point is 24° right now</p>
              </div>
            </div>
            <div className='infos mt-5 d-flex align-items-center gap-5'>
              <div className='info py-2 px-3'>
                <div className='title d-flex align-items-center gap-2'>
                  <i className="fa-solid fa-wind"></i>
                  <p>Wind</p>
                </div>
                <h3 className='mt-2'>{Math.floor(weather.wind.speed)} KPH</h3>
              </div>
              <div className='info py-2 px-3'>
                <div className='title d-flex align-items-center gap-2'>
                  <i className="fa-brands fa-wpressr"></i>
                  <p>Pressure</p>
                </div>
                <h3 className='mt-2'>{weather.main.pressure} hPa</h3>
              </div>
            </div>
            <div className='desc p-4'>
              <div className='title d-flex align-items-center gap-2 mb-2'>
                <i className="fa-solid fa-message"></i>
                <h5>Report an issue</h5>
              </div>
              <p>You can describe the current conditions at your location to help improve forcasts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
