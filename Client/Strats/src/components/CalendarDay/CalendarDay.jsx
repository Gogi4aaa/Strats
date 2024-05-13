import './CalendarDay.scss';

export default function CalendarDay({ date, data }) {
    return (
        <div key={date + Math.random()} className="calendar">
            <hr />
            <div className='calendar-day'>{date}</div>
            {data.map(obj => {
                return (
                    <span key={date + ' ' + obj.time} className='calendar-hour'>
                        <span>{obj.time}</span>
                        <span>{obj.temp}</span>
                        <span>{obj.code}</span>
                    </span>
                )
            })}
        </div>
    )
}