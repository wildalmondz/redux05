// Define types for your data
interface BlogResult {
    id: number;
    name: string;
    type: string;
    slug: string;
    image_path: string;
    blog_title: string;
}

// index.old

import { ReactElement } from 'react';
import styles from '../styles/Home.module.css';
import HeroPage from './home/Hero2';
import Scroll from './home/Scroll';
import ScrollNews from './home/scrollNews';
import Album from './album';
import NewsLetter from './home/NewsLetter';
import { handler } from "./api";

interface HomeProps {
    results: BlogResult[];
}

export default function Home({ results }: HomeProps): ReactElement {
    return (
        <div className={styles.container}>
            <HeroPage></HeroPage>
            <Album></Album>
            <Scroll results={results}></Scroll>
            <Album></Album>
            <ScrollNews></ScrollNews>
            <NewsLetter></NewsLetter>
        </div>
    );
}

export async function getStaticProps() {
    const results: BlogResult[] = await handler(`http://localhost:4500/blog/frontblogs_v3`);
    // The value of the `props` key will be passed to the component
    return {
        props: {
            results
        }
    };
}
