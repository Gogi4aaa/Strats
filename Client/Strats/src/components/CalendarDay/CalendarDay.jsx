import './CalendarDay.scss';

export default function CalendarDay({ date, data }) {
    return (
        <div key={date + Math.random()} className="calendar">
            <div className='calendar-day'>{date}</div>
            {data.map(obj => {
                return (
                    <div key={date + ' ' + obj.time} className='calendar-hour'>
                        <span className='calendar-hour-data'>{obj.time}</span>
                        <span className='calendar-hour-data'>{obj.temp}&deg;F({((obj.temp - 32) / 1.8).toFixed(2)})&deg;C</span>
                        {/* <span>{obj.code}</span> */}
                    </div>
                )
            })}
        </div>
    )
}