import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { resetMessage } from '../../src/redux/actions'; // Update the path

const MessageBoard02 = ({ text }) => {
    const dispatch = useDispatch();
    let exists = null;
    // const exists = useSelector((state) => state.authReducer.value.isAuth); // Assuming isAuth is a boolean in your state

    if (text != 'null') {
        console.log('[ ' + text + ' ]');
        exists = true;
    }

        useEffect(() => {
        const asyncRequest = dispatch(resetMessage()); // Dispatch the resetMessage action

        return () => {
            if (asyncRequest.abort) {
                asyncRequest.abort(); // Make sure to handle cancellation properly
            }
        };
    }, [dispatch]);

    return exists && <div><strong style={{ color: '#95232F' }}>{text}</strong></div>;
};

MessageBoard02.propTypes = {
    text: PropTypes.string,
};

MessageBoard02.defaultProps = {
    text: 'null',
};

export default MessageBoard02;
