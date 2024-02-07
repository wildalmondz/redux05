import React, { Component } from 'react';
/*
import PropTypes from 'prop-types';
import { ContainerId } from './lib/containers.js';
import { confirmAlert } from 'react-confirm-alert'; // Import

import './stylesheet/GameDetails.scss';

 */

// Import necessary modules
import { useRouter } from 'next/router';

// Your React component
const InvitedGameDetails = () => {
    // Get the router instance
    const router = useRouter();

    // Extract path items as variables
    const { pathname } = router;
    const pathItems = pathname.split('/'); // Remove empty strings

    // Use the path items as variables
    const firstPathItem = pathItems[0];
    const secondPathItem = pathItems[1];
    const thirdPathItem = pathItems[2];

    return (
        <div>
            <p>First Path Item: {firstPathItem}</p>
            <p>Second Path Item: {secondPathItem}</p>
            <p>Third Path Item: {thirdPathItem}</p>
        </div>
    );
};

export default InvitedGameDetails;