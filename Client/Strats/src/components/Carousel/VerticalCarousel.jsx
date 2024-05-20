import { useState } from "react";

import './Carousel.scss';

const VerticalCarousel = ({ children, setThisTop }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const myIcons = {
        prev: 'fa-solid fa-chevron-up',
        next: 'fa-solid fa-chevron-down'
    }

    const [top, setTop] = useState(0);

    const MEASURE = 10.5;
    const UPPERBOUND = 7;
    
    const handleClick = (direction) => {
        if (direction === 'prev') {
            setTop(top + MEASURE);
        } else {
            setTop(top - MEASURE);
        }
    }

    return (
        <section className="outer-container">
            <div className="carousel-wrapper">
                <button
                    type="button"
                    className={`control ${top === 0 ? 'disabled' : undefined}`}
                    // onClick={(() => handleClick('prev'))}
                    onClick={(() => { setThisTop('prev'); handleClick('prev') })}
                >
                    <i className={myIcons.prev}></i>
                </button>
                <div className="vertical-content">
                    {children}
                </div>
                <button
                    type="button"
                    className={`control ${-top === (UPPERBOUND * MEASURE) ? 'disabled' : undefined}`}
                    // onClick={(() => handleClick('next'))}
                    onClick={(() => { setThisTop('next'); handleClick('next') })}
                >
                    <i className={myIcons.next}></i>
                </button>                
            </div>
        </section>
    )
}

export default VerticalCarousel;