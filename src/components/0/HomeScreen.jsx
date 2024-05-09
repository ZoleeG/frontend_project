import styles from "./HomeScreen.module.css";
import Articles from '../1/Articles';
import NavBar from "../1/NavBar";
import Header from "../1/Header";

const HomeScreen = () => {


    return <div className={styles.grid_container}>
        <Header className={styles.header} />
        <NavBar className={styles.navbar} />
        <article className={styles.articles}><Articles /></article>
        </div>
}

export default HomeScreen