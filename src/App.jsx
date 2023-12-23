import { useState, useRef, useEffect } from 'react'
import './index.css'

const GetAPI = () => {
  const [time, setTime] = useState(null);
  const [countryName, setCountryName] = useState('London'); 
  const inputRef = useRef(null);
  const inputWeather = useRef(null);
  const currentTime = useRef(null);



  let utcDate = new Date();
  let utcHour = Number(utcDate.toISOString().slice(11, 13));
  let utcMin = Number(utcDate.toISOString().slice(14, 16));

  useEffect(() => {
    fetchData(countryName);
  }, [countryName, time]);

function fetchData(country) {
  fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${country}&limit=5&appid=b8f9234dfa02d7ddc2d6076c016079c4`, { mode: 'cors' })
    .then((response) => response.json())
    .then((geoData) => {
      setCountryName(geoData[0].name); 
      let lat = geoData[0].lat;
      let lon = geoData[0].lon;

  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b8f9234dfa02d7ddc2d6076c016079c4`, {mode: 'cors'})
    .then((response) => response.json())
    .then((weatherData) => {
      
      inputWeather.current.innerText =`${(weatherData.main.temp - 273.5).toFixed(2)} °c`;
      let currentHour = (Math.floor(weatherData.timezone / 60 / 60)) + utcHour;
      let currentMin = (Math.floor(weatherData.timezone / 60 ) % 60 ) + utcMin;
      currentTime.current.innerText = `${currentHour} : ${currentMin}`;
      console.log(currentHour);
      
    
    })
    .catch((weatherError) => {
      console.error(weatherError);
    });

    })

    .catch((error) => console.error(error));
}




function handleKeyDown(event) {
  if (event.key === 'Enter') {
    const countryName = inputRef.current.value;
    setCountryName(countryName);
  }
}

function handleSubmit() {
  const countryName = inputRef.current.value;
  setCountryName(countryName);
}





return (
  <>
    <h1>Weather API</h1>
    <h1>{countryName}</h1>
    <h2 ref={inputWeather}></h2>
    <h2 ref = {currentTime}> </h2> 
    <div className="card">
      <input type="text" ref={inputRef} onKeyDown={handleKeyDown} placeholder='Enter a city' />
      <input type="button" value="Submit" onClick={handleSubmit} />
    </div>

  </>
 
);
};




export default GetAPI


