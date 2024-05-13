import DefaultPage from "../../components/DefaultPage/DefaultPage";
import Weather from "../../components/Weather/Weather";

import './Home.scss';

export default function Home() {
    return (
        <DefaultPage id="weather">
            <Weather />
        </DefaultPage>
    );
}
