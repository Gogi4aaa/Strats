// weather api documentation at https://open-meteo.com/en/docs

import { useState, useEffect } from 'react';
import axios from 'axios';

import Button from '../ui/Button/Button';
import { convertTimeStampToUnixTime, formatDateTime, convertToCelsius } from '../../helpers.js';

import './Weather.scss';

export default function Weather() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    /* API vars */
    const url = 'https://api.open-meteo.com/v1/forecast';
    const currWeather = 'current_weather=true';
    const hourly = 'hourly=temperature_2m,weathercode';

    // can add a useState check to see if user wants imperial or metric units
    const tempUnit = 'temperature_unit=fahrenheit';
    const windUnit = 'windspeed_unit=mph';
    const precipUnit = 'precipitation_unit=inch';
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
        snowflake: 'fa-solid fa-snowflake'
    };

    /* get lat/lng from browser detect */ 
    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);

    // get api url
    const APIURL = `${url}?latitude=${lat}&longitude=${lng}&timezone=${tz}&${currWeather}&${hourly}&${tempUnit}&${windUnit}&${precipUnit}`;
    /* end get lat/lng from browser detect */

    // data objects
    const [data, setData] = useState(null);
    const [obj, setObj] = useState(null);

    /* call to browser to detect lat/lng */
    let prompt = false;

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.permissions.query({name: 'geolocation'}).then(function(result) {
                switch (result.state) {
                    case 'granted':
                        prompt = false;
                        navigator.geolocation.getCurrentPosition((position) => {
                            setStatus(null);
                            setLat(position.coords.latitude);
                            setLng(position.coords.longitude);
                            console.log('Checked for permission granted prior to calling getCurrentPosition.')
                        }, () => {
                            setStatus('Unable to retrieve your location');
                        });
                        break;
                    case 'prompt':
                        prompt = true;
                        break;
                    default:
                        setStatus('Permission to retrieve location data is denied.');
                        break;
                }
                console.log(`state: ${result.state}`);
            });
            }
    }
    /* end call to browser to detect lat/lng */

    /* Pretty functions */
    const [isDaytime, setIsDaytime] = useState(null);

    function getTimeOfDay() {
        const today = new Date();
        const hour = today.getHours();
        if (hour >= 6 && hour <= 18) {
            setIsDaytime(true);
        } else {
            setIsDaytime(false);
        }
    }

    function tempColor(temp) {
        if (temp >= 72) return 'red';
        if (temp < 72 && temp > 64) return 'orangered';
        if (temp >= 50 && temp <= 64) return 'yellow';
        if (temp < 49) return 'darkblue';
    }

    function getWeatherInterpretation(code) {
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
        if (temp >= 50 && temp < 64) return 'black';
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
            getWeatherInterpretation(response.data.current_weather.weathercode);
        })
        .catch((error) => {
            setData(error);
        });
    };

    useEffect(() => {
        if (lat !== null && lng !== null) {
            setInterval(() => {
                getForecast();
            }, 30000 /* 5 minutes * 60 seconds * 1000 milliseconds */);
            getForecast(); // Call 1 time, at start
        }
    }, [lat, lng]);
    /* end call the API */

    /* set html to display from results */
    const [result, setResult] = useState(null);

    useEffect(() => {
        if (data !== null) {
                console.log(data);
            getTimeOfDay();
            setResult(
                <>
                    <div>
                        <div>
                            <div>DateTime: {formatDateTime(convertTimeStampToUnixTime(data.current_weather.time))}</div>
                            <div>Timezone: {data.timezone} | {data.timezone_abbreviation}</div>
                        </div>
                        <div>
                            <div>Lat: {data.latitude}</div>
                            <div>Lng: {data.longitude}</div>
                        </div>
                        <div>
                            Wind: {data.current_weather.windspeed}{data.current_weather_units.windspeed}
                            &nbsp;
                            {getDirection(data.current_weather.winddirection)}
                        </div>
                        <div style={{ color: tempColor(data.current_weather.temperature) }}>
                            {convertToCelsius(data.current_weather.temperature)}°C
                        </div>
                    </div>
                    <div style={{ color: tempColor(data.current_weather.temperature) }}>
                        <i className={`${myIcons[obj.icon]} ${isDaytime ? 'icon-day' : 'icon-night'}`}></i>
                        &nbsp;
                        {obj.text}
                    </div>
                </>
            );
        }
    }, [data]);
    /* end set html to display from results */

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <>
            {prompt === true &&
                <div>
                    <Button type="button" onClick={getLocation}>Get Local Weather</Button>
                </div>
            }
            {status !== null && <p>Status: {status}</p>}
            {result !== null &&
                <div className="main-box weather-results">
                    {result}
                </div>
            }
        </>
    );
}