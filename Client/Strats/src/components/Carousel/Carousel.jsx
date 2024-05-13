import { useCarousel } from "react-use-carousel-hook";
import "react-use-carousel-hook/dist/index.css";

import CalendarDay from '../CalendarDay/CalendarDay.jsx';

import './Carousel.scss';

export default function Slideshow({ items }) {
    const { Carousel, Slides, Control, Pagination } = useCarousel();
    console.log(items);

    return (
        <Carousel className="carousel">
            <Slides className="slides">
                {items.map((item, index) => {
                    return (
                        <CalendarDay className="slide" key={item.day} date={item.day} data={item.dayData} />
                    )
                })}
            </Slides>

            <div className="controls">
                <Control direction="prev" className="control">prev</Control>
                <Control direction="next" className="control">next</Control>
            </div>
        </Carousel>
    )
}