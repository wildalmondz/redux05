import React from 'react';

const htmlFormat = "<h1 style='color: red;'>I'm rendered html text</h1>";

const HtmlTest = () => {
    return (
        <>
            <h1>Hello World</h1>
            <div dangerouslySetInnerHTML={{ __html: htmlFormat }} />
        </>
    );
};

export default HtmlTest;
