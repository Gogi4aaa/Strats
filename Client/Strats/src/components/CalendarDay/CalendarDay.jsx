import { useState, forwardRef, useImperativeHandle, useRef, useEffect } from 'react';

import VerticalCarousel from '../Carousel/VerticalCarousel';
import { convertToCelsius, convertTimeStampToUnixTime, getWeatherInterpretation, getIsDaytime, getWindDirection, getTempColor } from '../../helpers';

import './CalendarDay.scss';

export default function CalendarDay({ date, data }) {
    const calenderDay = useRef();

    const imagePath = 'weather-icons/animated';

    let monthDay = `${new Date().getMonth() + 1 + '/' + new Date().getDate()}`
    let style;

    if (monthDay === date) style = {borderLeft: 'solid 1px red', borderRight: 'solid 1px red'}

    const [top, setTop] = useState(0);

    useEffect(() => {
        console.log(top);
    }, [top]);
    
    const measure = 9;
    const upperBound = 7;
    const [activeIndex, setActiveIndex] = useState(0);

    const handleClick = (direction) => {
        if (direction === 'prev' && activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
            setTop(top + measure);
        } else if (direction === 'next' && activeIndex < upperBound) {
            setActiveIndex(activeIndex + 1);
            setTop(top - measure);
        }
        // console.log('top: ' + top + 'activeIndex: ' + activeIndex);
    }

    return (
        <VerticalCarousel date={date} setThisTop={handleClick}>
        <div className='calendar-day'>{date}</div>
        <div key={date} className="calendar" style={style ? style : undefined}>
            {data.map(d => {
                const interpretation = getWeatherInterpretation(d.code, getIsDaytime(convertTimeStampToUnixTime(d.unformatted_time)));

                return (
                    <div key={`${date} ${d.time}`} className='calendar-hour' style={{ transform: `translateY(${top}rem)` }}>
                        <span className='calendar-hour-data time'>{d.time}</span>
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