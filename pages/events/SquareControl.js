import React from 'react';

const htmlFormat = "<h1 style='color: red;'>I'm rendered html text</h1>";

const SquareControl = ({  }) => {
    return (
        <>
            <span>Hello World</span>
            <div dangerouslySetInnerHTML={{ __html: htmlFormat }} />
        </>
    );
};

export default SquareControl;