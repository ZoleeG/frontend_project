import styles from "./HomeScreen.module.css";
import Articles from '../1/Articles';
import NavBar from "../1/NavBar";
import Header from "../1/Header";
import { useParams, useSearchParams } from "react-router-dom";

const HomeScreen = () => {

    const { topic } = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const sortByQuery = searchParams.get("sort_by")
    const orderQuery = searchParams.get("order")

    return <div className={styles.grid_container}>
        <Header className={styles.header} />
        <NavBar className={styles.navbar} />
        <article className={styles.articles}><Articles selectedTopic={topic} sortByQuery={sortByQuery} orderQuery={orderQuery} /></article>
        </div>
}

export default HomeScreen