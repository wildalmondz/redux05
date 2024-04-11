import reportData from "./fullData";
import React, { useState, useEffect } from 'react';
import TinyMCE from "./tinyMCE";
import ReportComponent from "./ReportComponent";
import BlogTable from "./BlogTable";

export default function Rtest() {

    const [results, setResults] = useState([]);

    // this is only run if the user is logged in | authenticated
    // display a message if not authenticated
    // add this to the admin section as that is where auth is already present along with the target company

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await fetch(`http://localhost:4500/blog/userblogs`, {
                    credentials: 'include', // Include credentials in the request
                });
                const data = await response.json();
                setResults(data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchInitialData();
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <>
            <div>
                <BlogTable data={results} />
            </div>
        </>
    );
}

// <BlogTable data={results} />
//                  <CustomTable data={reportData[0].participation}/>
//                 <ReportComponent data={reportData}/>