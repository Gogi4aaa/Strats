import { convertToCelsius } from '../../helpers';

import './CalendarDay.scss';

export default function CalendarDay({ date, data }) {
    return (
        <div key={date + Math.random()} className="calendar">
            <div className='calendar-day'>{date}</div>
            {data.map(obj => {
                return (
                    <div key={date + ' ' + obj.time} className='calendar-hour'>
                        <span className='calendar-hour-data'>{obj.time}</span>
                        <span className='calendar-hour-data'>{obj.temp}&deg;F({convertToCelsius(obj.temp)})&deg;C</span>
                        {/* <span>{obj.code}</span> */}
                    </div>
                )
            })}
        </div>
    )
}