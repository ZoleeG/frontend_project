import styles from "./HomeScreen.module.css";
import Articles from './sub-components/Articles';
import NavBar from "./sub-components/NavBar";
import Header from "./sub-components/Header";

const HomeScreen = ({setVotes, loading, setLoading}) => {
    return <div className={styles.grid_container}>
        <div className={styles.header}><Header /></div>
        <div className={styles.navbar}><NavBar /></div>
        <div className={styles.articles}><Articles setVotes={setVotes} loading={loading} setLoading={setLoading}/></div>
        </div>
}

export default HomeScreen