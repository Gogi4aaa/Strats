import { useEffect } from 'react';

import VerticalCarousel from '../Carousel/VerticalCarousel';
import { convertToCelsius, convertTimeStampToUnixTime, getWeatherInterpretation, getIsDaytime, getWindDirection, getTempColor } from '../../helpers';

import './CalendarDay.scss';

export default function CalendarDay({ date, data }) {
    const imagePath = 'weather-icons/animated';

    let monthDay = `${new Date().getMonth() + 1 + '/' + new Date().getDate()}`
    let style;

    if (monthDay === date) style = {borderLeft: 'solid 1px red', borderRight: 'solid 1px red'}

    return (
        <VerticalCarousel date={date}>
        <div className='calendar-day'>{date}</div>
        <div key={date + Math.random()} className="calendar" style={style ? style : undefined}>
            {data.map(d => {
                const interpretation = getWeatherInterpretation(d.code, getIsDaytime(convertTimeStampToUnixTime(d.unformatted_time)));

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
                        {/* <br /> */}
                    </div>
                )
            })}
        </div>
        </VerticalCarousel>
    )
}