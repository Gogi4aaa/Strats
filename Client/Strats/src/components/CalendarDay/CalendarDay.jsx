import { useEffect } from 'react';

import { convertToCelsius, getWeatherInterpretation, getIsDaytime, getWindDirection, getTempColor } from '../../helpers';

import './CalendarDay.scss';

export default function CalendarDay({ date, data }) {
    const imagePath = 'weather-icons/static';

    let monthDay = `${new Date().getMonth() + 1 + '/' + new Date().getDate()}`
    let style;

    console.log(monthDay + ' \ ' + date)

    if (monthDay === date) style = {borderLeft: 'solid 1px red', borderRight: 'solid 1px red'}

    return (
        <div key={date + Math.random()} className="calendar" style={style ? style : undefined}>
            <div className='calendar-day'>{date}</div>
            {data.map(d => {
                const interpretation = getWeatherInterpretation(d.code);
                return (
                    <div key={date + ' ' + d.time} className='calendar-hour'>
                        <span className='calendar-hour-data' style={{ position: 'sticky' }}>{d.time}</span>
                        <span className='calendar-hour-data center'>
                            {d.temp}&deg;F({convertToCelsius(d.temp)})&deg;C
                        </span>
                        <span className='calendar-hour-data center'>
                            <img className='calendar-hour-data-image' src={`${imagePath}/${interpretation.icon}.svg`} />
                        </span>
                        <span className='calendar-hour-data center'>{interpretation.text}</span>
                        <hr />
                    </div>
                )
            })}
        </div>
    )
}