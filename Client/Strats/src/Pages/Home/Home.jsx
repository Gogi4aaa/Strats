import DefaultPage from "../../components/DefaultPage/DefaultPage";
import Weather from "../../components/Weather/Weather";
import withMainLayout from "../../layout/withMainLayout";

function Home() {
    return (
        <DefaultPage id="weather">
            <Weather />
        </DefaultPage>
    );
}
export default withMainLayout(Home);