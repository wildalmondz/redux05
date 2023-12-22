import styles from '../styles/Home.module.css'
import HeroPage from './home/Hero2'
import Scroll from './home/scrollCard'
import ScrollNews from './home/scrollNews'
import Album from './album'
import NewsLetter from './home/NewsLetter'

export default function Home() {
  return (
      <div className={styles.container}>
        <HeroPage></HeroPage>
        <Album></Album>
        <Scroll></Scroll>
        <Album></Album>
        <ScrollNews></ScrollNews>
        <NewsLetter></NewsLetter>
      </div>
  )
}