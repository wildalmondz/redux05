import Link from "next/link";
import styles from '../styles/Home.module.css';

export default function Layout({ children }) {
    return(
        <div className={styles.container}>
            <br></br>
          {children}
        </div>
    )
}