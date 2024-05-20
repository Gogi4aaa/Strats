import DefaultPage from "../../components/DefaultPage/DefaultPage";
import Weather from "../../components/Weather/Weather";
import Layout from "../../layout/Layout";

function Home() {
    return (
        <Layout>
        <DefaultPage id="weather">
            <Weather />
        </DefaultPage>
        </Layout>
    );
}
export default Home;