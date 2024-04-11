import React, { useState, useEffect } from 'react';
import CenteredTabs from "./Tabs";


export default function Blogs() {
    // this is only run if the user is logged in | authenticated
    // display a message if not authenticated
    // add this to the admin section as that is where auth is already present along with the target company
    return (
        <>
            <div>
                <CenteredTabs />
            </div>
        </>
    );
}