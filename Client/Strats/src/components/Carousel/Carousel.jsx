// carousel documentation https://react-use-carousel-hook.vercel.app/examples

import { useCarousel } from "react-use-carousel-hook";
import "react-use-carousel-hook/dist/index.css";

import VerticalCarousel from "./VerticalCarousel.jsx";
import CalendarDay from '../CalendarDay/CalendarDay.jsx';

import './Carousel.scss';

export default function Slideshow({ items }) {
    const { Carousel, Slides, Control } = useCarousel();
    const myIcons = {
        prev: 'fa-solid fa-chevron-left',
        next: 'fa-solid fa-chevron-right'
    }

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
                <Control direction="prev" className="control"><i className={myIcons.prev}></i></Control>
                <Control direction="next" className="control"><i className={myIcons.next}></i></Control>
            </div>
        </Carousel>
    )
}