import { useState, useEffect } from "react";

import './Carousel.scss';

const VerticalCarousel = ({ date, children }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const myIcons = {
        prev: 'fa-solid fa-chevron-up',
        next: 'fa-solid fa-chevron-down'
    }
    
    const handleClick = (direction) => {}

    return (
        <section className="outer-container">
            <div className="carousel-wrapper">
                <button
                    type="button"
                    className="control"
                    onClick={(() => handleClick('prev'))}
                >
                    <i className={myIcons.prev}></i>
                </button>
                <div className="vertical-content">
                    {children}
                </div>
                <button
                    type="button"
                    className="control"
                    onClick={(() => handleClick('next'))}
                >
                    <i className={myIcons.next}></i>
                </button>                
            </div>
        </section>
    )
}

export default VerticalCarousel;