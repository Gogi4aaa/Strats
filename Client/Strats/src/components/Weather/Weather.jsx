// weather api documentation at https://open-meteo.com/en/docs

import { useState, useEffect } from 'react';
import axios from 'axios';

import CalendarDay from '../CalendarDay/CalendarDay.jsx';
// import Slideshow from '../Carousel/Carousel.jsx';
import Input from '../ui/Input/Input.jsx';
import { convertTimeStampToUnixTime, formatDateTime, getMonthDay, getTime, convertToCelsius } from '../../helpers.js';

import './Weather.scss';
import Button from '../ui/Button/Button.jsx';

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

    const myIcons = {
        hotCoffee: 'fa-solid fa-mug-hot',
        sun: 'fa-solid fa-sun',
        moon: 'fa-solid fa-moon',
        cloudSun: 'fa-solid fa-cloud-sun',
        cloudMoon: 'fa-solid fa-cloud-moon',
        cloudSunRain: 'fa-solid fa-cloud-sun-rain',
        cloudMoonRain: 'fa-solid fa-cloud-moon-rain',
        cloudBolt: 'fa-solid fa-cloud-bolt',
        smog: 'fa-solid fa-smog',
        snowflake: 'fa-solid fa-snowflake',
        search: 'fa-solid fa-magnifying-glass'
    };

    /* get lat/lng from browser detect */ 
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [tz, setTz] = useState(null);

    // get api url
    const APIURL = `${url}?latitude=${lat}&longitude=${lng}&timezone=${tz}&${forecastDays}&${currWeather}&${hourly}&${tempUnit}&${windUnit}&${precipUnit}`;
    /* end get lat/lng from browser detect */

    // data objects
    const [resdata, setData] = useState(null);
    const [obj, setObj] = useState(null);

    /* Pretty functions */
    function getIsDaytime(today) {
        const hour = today.getHours();
        if (hour >= 6 && hour <= 18) {
            return true;
        } else {
            return false;
        }
    }

    function tempColor(temp) {
        if (temp >= 72) return 'red';
        if (temp < 72 && temp > 64) return 'orangered';
        if (temp >= 50 && temp <= 64) return 'yellow';
        if (temp < 49) return 'darkblue';
    }

    function getWeatherInterpretation(code, isDaytime) {
        console.log(code + '  ' + isDaytime);
        switch(code) {
            case 0: setObj({text: 'Clear Sky', icon: isDaytime ? 'sun' : 'moon'}); break;
            case 1: setObj({text: 'Mainly Clear', icon: isDaytime ? 'sun' : 'moon'}); break;
            case 2: setObj({text: 'Partly Cloudy', icon: isDaytime ? 'cloudSun' : 'cloudMoon'}); break;
            case 3: setObj({text: 'Overcast', icon: isDaytime ? 'cloudSun' : 'cloudMoon'}); break;
            case 45: setObj({text: 'Fog', icon: 'smog'}); break;
            case 51: setObj({text: 'Light Drizzle', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain'}); break;
            case 53: setObj({text: 'Moderate Drizzle', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain'}); break;
            case 55: setObj({text: 'Dense Drizzle', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain'}); break;
            case 56: setObj({text: 'Light Freezing Drizzle', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain'}); break;
            case 57: setObj({text: 'Dense Freezing Drizzle', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain'}); break;
            case 61: setObj({text: 'Slight Rain', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain'}); break;
            case 63: setObj({text: 'Moderate Rain', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain'}); break;
            case 65: setObj({text: 'Heavy Rain', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain'}); break;
            case 66: setObj({text: 'Light Freezing Rain', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain'}); break;
            case 67: setObj({text: 'Heavy Freezing Rain', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain'}); break;
            case 71: setObj({text: 'Slight Snow Fall', icon: 'snowflake'}); break;
            case 73: setObj({text: 'Moderate Snow Fall', icon: 'snowflake'}); break;
            case 75: setObj({text: 'Heavy Snow Fall', icon: 'snowflake'}); break;
            case 77: setObj({text: 'Snow Grains', icon: 'snowflake'}); break;
            case 80: setObj({text: 'Slight Rain Showers', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain'}); break;
            case 81: setObj({text: 'Moderate Rain Showers', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain'}); break;
            case 82: setObj({text: 'Violent Rain Showers', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain'}); break;
            case 85: setObj({text: 'Slight Snow Showers', icon: 'snowflake'}); break;
            case 86: setObj({text: 'Heavy Snow Showers', icon: 'snowflake'}); break;
            case 95: setObj({text: 'Slight or Moderate Thunderstorm', icon: 'cloudBolt'}); break;
            default: setObj({text: 'Loading', icon: 'hotCoffee'});
        }
    }

    function getDirection(code) {
        if (code === 0 || code === 360) {
            return 'E';
        } else if (code < 90) {
            return 'NE';
        } else if (code === 90) {
            return 'N';
        } else if (code < 180) {
            return 'NW'; 
        } else if (code === 180) {
            return 'W';
        } else if (code < 270) {
            return 'SW';
        } else if (code === 270) {
            return 'S';
        } else if (code < 360) {
            return 'SE';
        } else {
            return 'N/A';
        };
    };

    function tempColor(temp) {
        if (temp >= 72) return 'red';
        if (temp >= 64 && temp < 72) return 'orangered';
        if (temp >= 50 && temp < 64) return 'yellow';
        if (temp >= 40 && temp < 50) return 'steelblue';
        if (temp < 40) return 'blue';
    }
    /* end Pretty functions */

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
            getWeatherInterpretation(response.data.current_weather.weathercode, getIsDaytime(convertTimeStampToUnixTime(response.data.current_weather.time)));
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
                    if (j % 6 === 0) {
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
            setResult(
                <div className='current-weather'>
                    <div>
                        <div>
                            <div>{formatDateTime(convertTimeStampToUnixTime(resdata.current_weather.time))}</div>
                        </div>
                        {/* <div>
                            <div>Lat: {resdata.latitude}</div>
                            <div>Lng: {resdata.longitude}</div>
                        </div>
                        <div>
                            <div>Timezone: {tz}</div>
                        </div> */}
                        <div style={{ color: tempColor(resdata.current_weather.temperature) }}>
                            Temp: {resdata.current_weather.temperature}{resdata.current_weather_units.temperature}
                            ({convertToCelsius(resdata.current_weather.temperature)}&deg;C)
                        </div>
                        <div>
                            Wind: {resdata.current_weather.windspeed}{resdata.current_weather_units.windspeed}
                            &nbsp;
                            {getDirection(resdata.current_weather.winddirection)}
                        </div>
                    </div>
                    <div style={{ color: tempColor(resdata.current_weather.temperature) }}>
                        <i className={`${myIcons[obj.icon]} ${getIsDaytime(convertTimeStampToUnixTime(resdata.current_weather.time)) ? 'icon-day' : 'icon-night'}`}></i>
                        &nbsp;
                        {obj.text}
                    </div>
                    <div className="slideshow">
                        {
                            daysData.map(day => {
                                return (
                                    <CalendarDay key={day.day} date={day.day} data={day.dayData} />
                                )
                            })
                        }
                    </div>
                    {/* <Slideshow items={daysData} /> */}
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
                <Input id='address' className="form-control" type='text' placeholder='Enter a location' onKeyDown={keyDownHandler} />
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