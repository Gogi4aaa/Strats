import { useState, useEffect } from 'react';
import axios from 'axios';

import './Weather.scss';

export default function Weather() {
    const url = 'https://api.open-meteo.com/v1/forecast';
    const currWeather = 'current_weather=true';
    const hourly = 'hourly=temperature_2m,weathercode';
    const tempUnit = 'temperature_unit=fahrenheit';
    const windUnit = 'windspeed_unit=mph';
    const precipUnit = 'precipitation_unit=inch';

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

    const [lat, setLat] = useState(null);
    const [lng, setLng] = useState(null);
    const [status, setStatus] = useState(null);

    const APIURL = `${url}?latitude=${lat}&longitude=${lng}&${currWeather}&${hourly}&${tempUnit}&${windUnit}&${precipUnit}`;

    const [data, setData] = useState(null);
    // const [obj, setObj] = useState({text: 'Loading...', icon: 'hotCoffee', className: 'icon-slightGrey'});
    const [obj, setObj] = useState(null);

    const getLocation = () => {
        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
        } else {
            setStatus('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setStatus(null);
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
            }, () => {
                setStatus('Unable to retrieve your location');
            });
        }
    }

    function getTimeOfDay() {
        const today = new Date();
        const hour = today.getHours();
        if (hour >= 6 && hour <= 18) {
            setIsDaytime(true);
            return;
        }
        setIsDaytime(false);
    }

    const [isDaytime, setIsDaytime] = useState(true);

    function getForecast() {
        axios({
            method: "GET",
            url: APIURL
        })
        .then((response) => {
            setData(response.data);
            getWeatherInterpretation(response.data.current_weather.weathercode);
        })
        .catch((error) => {
            setData(error);
        });
    };

    function tempColor(temp) {
        if (temp >= 72) return 'red';
        if (temp < 72 && temp > 64) return 'orangered';
        if (temp >= 50 && temp <= 64) return 'yellow';
        if (temp < 49) return 'darkblue';
    }

    function getWeatherInterpretation(code) {
        switch(code) {
            case 0: setObj({text: 'Clear Sky', icon: isDaytime ? 'sun' : 'moon', className: 'icon-hot'}); break;
            case 1: setObj({text: 'Mainly Clear', icon: isDaytime ? 'sun' : 'moon', className: 'icon-hot'}); break;
            case 2: setObj({text: 'Partly Cloudy', icon: isDaytime ? 'cloudSun' : 'cloudMoon', className: 'icon-gray-light'}); break;
            case 3: setObj({text: 'Overcast', icon: isDaytime ? 'cloudSun' : 'cloudMoon', className: 'icon-gray'}); break;
            case 45: setObj({text: 'Fog', icon: 'smog', className: 'icon-gray'}); break;
            case 51: setObj({text: 'Light Drizzle', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain', className: 'icon-gray'}); break;
            case 53: setObj({text: 'Moderate Drizzle', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain', className: 'icon-gray'}); break;
            case 55: setObj({text: 'Dense Drizzle', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain', className: 'icon-gray'}); break;
            case 56: setObj({text: 'Light Freezing Drizzle', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain', className: 'icon-gray'}); break;
            case 57: setObj({text: 'Dense Freezing Drizzle', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain', className: 'icon-gray'}); break;
            case 61: setObj({text: 'Slight Rain', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain', className: 'icon-gray'}); break;
            case 63: setObj({text: 'Moderate Rain', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain', className: 'icon-gray'}); break;
            case 65: setObj({text: 'Heavy Rain', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain', className: 'icon-gray'}); break;
            case 66: setObj({text: 'Light Freezing Rain', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain', className: 'icon-gray'}); break;
            case 67: setObj({text: 'Heavy Freezing Rain', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain', className: 'icon-gray'}); break;
            case 71: setObj({text: 'Slight Snow Fall', icon: 'snowflake', className: 'icon-cool'}); break;
            case 73: setObj({text: 'Moderate Snow Fall', icon: 'snowflake', className: 'icon-cool'}); break;
            case 75: setObj({text: 'Heavy Snow Fall', icon: 'snowflake', className: 'icon-cool'}); break;
            case 77: setObj({text: 'Snow Grains', icon: 'snowflake', className: 'icon-cool'}); break;
            case 80: setObj({text: 'Slight Rain Showers', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain', className: 'icon-gray'}); break;
            case 81: setObj({text: 'Moderate Rain Showers', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain', className: 'icon-gray'}); break;
            case 82: setObj({text: 'Violent Rain Showers', icon: isDaytime ? 'cloudSunRain' : 'cloudMoonRain', className: 'icon-gray'}); break;
            case 85: setObj({text: 'Slight Snow Showers', icon: 'snowflake', className: 'icon-cool'}); break;
            case 86: setObj({text: 'Heavy Snow Showers', icon: 'snowflake', className: 'icon-cool'}); break;
            case 95: setObj({text: 'Slight or Moderate Thunderstorm', icon: 'cloudBolt', className: 'icon-gray'}); break;
            default: setObj({text: 'Loading', icon: 'hotCoffee', className: 'icon-hot'});
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
        if (temp < 72 && temp > 64) return 'orangered';
        if (temp >= 50 && temp <= 64) return 'yellow';
        if (temp < 49) return 'darkblue';
    }

    const [haveCoords, setHaveCoords] = useState(false);

    useEffect(() => {
        if (lat !== null && lng !== null) {
            setHaveCoords(true);
        } else {
            setHaveCoords(false);
        }
    }, [lat, lng]);

    useEffect(() => {
        if (haveCoords) {
            getTimeOfDay()
            getForecast();
        }
    }, [haveCoords]);

    const [result, setResult] = useState(null);

    useEffect(() => {
        if (data !== null) {
            console.log(data);
            // setResult(<div>{data}</div>)
            setResult(
                <>
                    <div className={obj.className}>
                        <i className={`${obj.className} ${myIcons[obj.icon]}`}></i>
                        &nbsp;
                        {obj.text}
                    </div>
                    <div style={{ color: tempColor(data.current_weather.temperature) }}>
                        {data.current_weather.temperature}{data.hourly_units.temperature_2m}
                    </div>
                </>
            );
        }
    }, [data]);

    return (
        <>
            {haveCoords === false &&
                <div>
                    <button onClick={getLocation}>Get Local Weather</button>
                </div>
            }
            {status !== null && <div>Status: {status}</div>}
            {result !== null &&
                <div className="weather-results">
                    {result}
                </div>
            }
        </>
    );
}