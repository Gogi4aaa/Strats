import { useEffect } from 'react';

import { convertToCelsius } from '../../helpers';

import './CalendarDay.scss';

export default function CalendarDay({ date, data }) {
    function getWeatherInterpretation(code) {
        switch(code) {
            case 0: return 'Clear Sky'; break;
            case 1: return 'Mainly Clear'; break;
            case 2: return 'Partly Cloudy'; break;
            case 3: return 'Overcast'; break;
            case 45: return 'Fog'; break;
            case 51: return 'Light Drizzle'; break;
            case 53: return 'Moderate Drizzle'; break;
            case 55: return 'Dense Drizzle'; break;
            case 56: return 'Light Freezing Drizzle'; break;
            case 57: return 'Dense Freezing Drizzle'; break;
            case 61: return 'Slight Rain'; break;
            case 63: return 'Moderate Rain'; break;
            case 65: return 'Heavy Rain'; break;
            case 66: return 'Light Freezing Rain'; break;
            case 67: return 'Heavy Freezing Rain'; break;
            case 71: return 'Slight Snow Fall'; break;
            case 73: return 'Moderate Snow Fall'; break;
            case 75: return 'Heavy Snow Fall'; break;
            case 77: return 'Snow Grains'; break;
            case 80: return 'Slight Rain Showers'; break;
            case 81: return 'Moderate Rain Showers'; break;
            case 82: return 'Violent Rain Showers'; break;
            case 85: return 'Slight Snow Showers'; break;
            case 86: return 'Heavy Snow Showers'; break;
            case 95: return 'Slight or Moderate Thunderstorm'; break;
            default: return 'Loading';
        }
    }

    let monthDay = `${new Date().getMonth() + 1 + '/' + new Date().getDate()}`
    let style;

    console.log(monthDay + ' \ ' + date)

    if (monthDay === date) style = {border: 'solid 1px red'}

    return (
        <div key={date + Math.random()} className="calendar" style={style ? style : undefined}>
            <div className='calendar-day'>{date}</div>
            {data.map(d => {
                return (
                    <div key={date + ' ' + d.time} className='calendar-hour'>
                        <span className='calendar-hour-data'>{d.time}</span>
                        <span className='calendar-hour-data center'>{d.temp}&deg;F({convertToCelsius(d.temp)})&deg;C</span>
                        <span className='calendar-hour-data center'>{getWeatherInterpretation(d.code)}</span>
                    </div>
                )
            })}
        </div>
    )
}