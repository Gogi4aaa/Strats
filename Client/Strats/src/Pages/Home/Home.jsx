import DefaultPage from "../../components/DefaultPage/DefaultPage";
import Weather from "../../components/Weather/Weather";

export default function Home() {
    return (
        <DefaultPage id="weather">
            <Weather />
        </DefaultPage>
    );
}