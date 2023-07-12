import Calendar from "./Calendar";
import Header from "../../components/Header";

export const Home = () => {

    return (
        <div className={'wrapper bg-main'}>
            <Header />
            <Calendar />
        </div>
    );
};

export default Home;
