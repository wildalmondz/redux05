import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../../styles/Hero.module.css'
import Typography from "@mui/material/Typography";

export default function Hero2() {
        return (
            <div className={styles.bigimage}>
                <div className={styles.overlay}>
                    <Typography
                        component="h1"
                        variant="h3"
                        align="center"
                        color="white"
                        gutterBottom
                    >
                        WildAlmonds
                    </Typography>
                    <Typography
                        component="h1"
                        variant="h3"
                        align="center"
                        color="white"
                        gutterBottom
                        fontSize="medium"
                        textTransform="uppercase"
                    >
                        Discover, experience, never forget your next favorite wine
                    </Typography>
                </div>
            </div>
        );
}