import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Hero.module.css'

class HeroPage extends Component {
    render() {
        return (
            <section className={styles.hero}>
                <article id={styles.heroArticle}>
                    <br/>
                    <h1 style={{color: 'black'}}>WildAlmonds Hero Page</h1>
                    <p id="head-title"></p>
                </article>
            </section>
        );
    }
}

HeroPage.propTypes = {
    onFetchUserId: PropTypes.func,
    image: PropTypes.string,
};

HeroPage.defaultProps = {
    onFetchUserId: f => f,
    image: 'https://images.pexels.com/photos/1277181/pexels-photo-1277181.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};

export default HeroPage;

/*
      <section className="hero">
        <article>
          <before />
          <br/>
          <h1>WildAlmonds</h1>
          <p id="head-title"></p>
        </article>
        <div id="top-actions">
          <a href="/winetasting" className="event-button blue-button">Let's go tasting!</a>
          <div id="choice">{''}OR{''}</div>
          <a href="mailto:support@wildalmonds.com?subject=Demo%20Request%20for%20WildAlmonds&body=Please%20contact%20
          this%20email%20address%20and%20provide%20us%20a%20demo.%20Here%20are%20a%20few%20times%20and%20dates%20we%20
          are%20available:" className="event-button">Request Demo</a>
        </div>
      </section>
 */

