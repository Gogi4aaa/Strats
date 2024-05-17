import { useState, useRef } from "react";

import './Carousel.scss';

const VerticalCarousel = ({ children, setThisTop }) => {
    const contentDiv = useRef();
    const [activeIndex, setActiveIndex] = useState(0);

    const myIcons = {
        prev: 'fa-solid fa-chevron-up',
        next: 'fa-solid fa-chevron-down'
    }

    const [top, setTop] = useState(0);

    const measure = 9;
    const upperBound = 7;
    
    const handleClick = (direction) => {
        if (direction === 'prev' && activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
            setTop(top + measure);
        } else if (direction === 'next' && activeIndex < upperBound) {
            setActiveIndex(activeIndex + 1);
            setTop(top - measure);
        }
        console.log('top: ' + top + 'activeIndex: ' + activeIndex);
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
                <div ref={contentDiv} className="vertical-content">
                    {children}
                </div>
                <button
                    type="button"
                    className={`control ${-top === (upperBound * measure) ? 'disabled' : undefined}`}
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