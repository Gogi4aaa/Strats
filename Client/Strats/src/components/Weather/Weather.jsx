// weather api documentation at https://open-meteo.com/en/docs

import { useState, useEffect } from 'react';
import axios from 'axios';

import CalendarDay from '../CalendarDay/CalendarDay.jsx';
// import Slideshow from '../Carousel/Carousel.jsx';
import Input from '../ui/Input/Input.jsx';
import { convertTimeStampToUnixTime, formatDateTime, getMonthDay, getTime, 
    convertToCelsius, getWeatherInterpretation, getIsDaytime, getWindDirection, getTempColor } from '../../helpers.js';
import './Weather.scss';
import Button from '../ui/Button/Button.jsx';
import Slideshow from '../Carousel/Carousel.jsx';

export default function Weather() {
    /* API vars */
    const url = 'https://api.open-meteo.com/v1/forecast';
    const currWeather = 'current_weather=true';
    const hourly = 'hourly=temperature_2m,weathercode';

    // can add a useState check to see if user wants imperial or metric units
    const tempUnit = 'temperature_unit=fahrenheit';
    const windUnit = 'windspeed_unit=mph';
    const precipUnit = 'precipitation_unit=inch';
    const forecastDays = 'forecast_days=7';
    /* end API Vars */

    const imagePath = 'weather-icons/animated'

    const myIcons = {
        search: 'fa-solid fa-magnifying-glass'
    }
    /* get lat/lng from browser detect */ 
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [tz, setTz] = useState(null);

    // get api url
    const APIURL = `${url}?latitude=${lat}&longitude=${lng}&timezone=${tz}&${forecastDays}&${currWeather}&${hourly}&${tempUnit}&${windUnit}&${precipUnit}`;
    /* end get lat/lng from browser detect */

    // data objects
    const [resdata, setData] = useState(null);

    /* call the API */
    function getForecast() {
        axios({
            method: "GET",
            url: APIURL
        })
        .then((response) => {
            setData(prevData => {
                return response.data
            });
            // getWeatherInterpretation(response.data.current_weather.weathercode, getIsDaytime(convertTimeStampToUnixTime(response.data.current_weather.time)));
        })
        .catch((error) => {
            console.log(error);
        });
    };

    function getLatLng(URL) {
        axios({
            method: "GET",
            url: URL
        })
        .then((response) => {
            // console.log(response);
            setLat(response.data[0].lat);
            setLng(response.data[0].lon);
            
            fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${response.data[0].lat}&lon=${response.data[0].lon}&format=json&apiKey=251fdb5c46734306b119d1c7e8a6e21b`)
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    setTz(data.results[0].timezone.name);
                } else {
                    console.log("No location found");
                }
            });
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const days = [];
    const forecastData = [];
    const daysData = [];
    const [clearTimer, setClearTimer] = useState(false);

    useEffect(() => {
        if (lat !== null && lng !== null && tz !== null) {
            let timer = setInterval(() => {
                setClearTimer(false);
                getForecast();
            }, 30000 /* 5 minutes * 60 seconds * 1000 milliseconds */);
            getForecast(); // Call 1 time, at start

            if (clearTimer) {
                clearInterval(timer);
            }
        }
    }, [lat, lng, tz]);
    /* end call the API */

    useEffect(() => {
        if (resdata !== null) {
            let numrows = resdata.hourly.time.length;
    
            let prevDay, currDay = '';

            for (let i = 0; i < numrows; i++) {
                let index = i;
                let time = getTime(convertTimeStampToUnixTime(resdata.hourly.time[i]));
                let temp = resdata.hourly.temperature_2m[i];
                let code = resdata.hourly.weathercode[i];

                currDay = getMonthDay(convertTimeStampToUnixTime(resdata.hourly.time[i]));
                console.log(currDay)
                if (prevDay !== currDay) {
                    days.push(currDay);
                    prevDay = currDay;
                }

                forecastData.push(
                    {currDay, index, time, temp, code}
                );
            }

            for (let i = 0; i < days.length; i++) {
                let day = days[i];
                let dayData = [];
                for (let j = 0; j < forecastData.length; j++) {
                    if (j % 3 === 0) {
                        let data = forecastData[j];
                        if (day === data.currDay) {
                            let index = data.index;
                            let time = data.time;
                            let temp = data.temp;
                            let code = data.code;
                            dayData.push({index, time, temp, code});
                        }
                    }
                }
                daysData.push({day, dayData});
            }
    }
    }, [resdata]);

    /* set html to display from results */
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (resdata !== null) {
            // console.log(resdata);
            let interpretation = getWeatherInterpretation(resdata.current_weather.weathercode, getIsDaytime(convertTimeStampToUnixTime(resdata.current_weather.time)));
            console.log(interpretation);
            setResult(
                <div className='current-weather'>
                    <div>
                        <div>
                            <div>{formatDateTime(convertTimeStampToUnixTime(resdata.current_weather.time))}</div>
                        </div>
                        <div style={{ color: getTempColor(resdata.current_weather.temperature) }}>
                            {resdata.current_weather.temperature}{resdata.current_weather_units.temperature}
                            &nbsp;
                            ({convertToCelsius(resdata.current_weather.temperature)}&deg;C)
                        </div>
                        <div className='current-weather-image-and-text'>
                            <img className='current-weather-image' src={`${imagePath}/${interpretation.icon}.svg`} />
                            <div className='current-weather-text' style={{ color: getTempColor(resdata.current_weather.temperature) }}>
                                &nbsp;
                            </div>
                        </div>
                    </div>
                    <div>
                        Wind: {resdata.current_weather.windspeed}{resdata.current_weather_units.windspeed}
                        &nbsp;
                        {getWindDirection(resdata.current_weather.winddirection)}
                    </div>
                    <Slideshow className="slideshow" items={daysData} />
                </div>
            );
        }
    }, [resdata]);
    /* end set html to display from results */

    function getLocation2() {
        var address = document.getElementById("address").value;
        getLatLng(`https://geocode.maps.co/search?q=${address}&api_key=664170165e212689634179wro17f9c9`);
    }

    function keyDownHandler(event) {
        let key = event.key;
        
        if (key === 'Enter') {
            setClearTimer(true);
            getLocation2();
        }
    }

    return (
        <>
            <div className='input-div mb-4'>
                <Input id='address' className="form-control boxed-left" type='text' placeholder='Enter a location' onKeyDown={keyDownHandler} />
                <button className="search-button"><i className={myIcons.search}></i></button>
            </div>
            {result !== null &&
                <div>
                    {result}
                </div>
            }
        </>
    );
}