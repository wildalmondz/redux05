// admin/experience/Tabs.js
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BlogTable from './BlogTable';
import BlogEdit from './BlogEdit';
import Group from './Group';
import Instructions from './Instructions';

export default function CenteredTabs() {
    const [value, setValue] = useState(0);
    const [groupId, setGroupId] = useState(0);
    const [groupName, setGroupName] = useState('Company/Group');
    const [blogId, setBlogId] = useState('');
    const [blogEditor, setBlogEditor] = useState(false);
    const [blogName, setBlogName] = useState('Select Blog');
    const [editTitle, setEditTitle] = useState('Editor');
    const [foundGroup, setFoundGroup] = useState(false);
    const [foundBlog, setFoundBlog] = useState(false);
    const [results, setResults] = useState([]);
    const [eventName, setEventName] = useState('Event');

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

    const handleChange = (event, newValue) => {
        if (newValue === 2) { setBlogName('Select Blog') }
        if (newValue === 3) { setEditTitle('Editor') }
        setValue(newValue);
    };

    if ((groupName !== 'Company/Group') && (blogName !== 'Select Blog') && (!foundGroup)) {
        setBlogName('Select Blog');
        setFoundGroup(true);
    }

    const handleClick = (event, newValue) => {
        if (newValue === 3) { setBlogEditor('Editor') }
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, width: '100%', bgcolor: 'background.paper', height: '40em', overflow: 'scroll' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                centered={false}
            >
                <Tab label="Instructions" onClick={() => handleClick(null, 0)} />
                <Tab label={groupName} onClick={() => handleClick(null, 1)} />
                <Tab
                    label={blogName}
                    onClick={() =>
                        handleClick(null, 2)}
                        disabled={groupName === 'Company/Group'}
                />
                <Tab
                    label={editTitle}
                    onClick={() =>
                        handleClick(null, 3)}
                    disabled={blogEditor == false}
                />

            </Tabs>
            {value === 0 && ( <Box sx={{ p: 3 }}> <Instructions /> </Box> )}
            {value === 1 && ( <Box sx={{ p: 3 }}> <Group
                groupName={groupName}
                setGroupName={setGroupName}
                setGroupId={setGroupId}
            />

            </Box> )}
            {value === 2 && ( <Box sx={{ p: 3 }}> <BlogTable data={results} groupId={groupId} setBlogId={setBlogId} setBlogEditor={setBlogEditor}/> </Box> )}
            {value === 3 && ( <Box sx={{ p: 3 }}> <BlogEdit blogId={blogId}  /> </Box> )}
        </Box>
    );
}


/*

                <Tab
                    label="Blogs"
                    onClick={() =>
                        handleClick(null, 2)}
                        disabled={groupName === 'Company/Group'}
                />
            {value === 1 && ( <Box sx={{ p: 3 }}> <Group groupName={groupName} setGroupName={setGroupName} setGroupId={setGroupId}/> </Box> )}
            {value === 2 && ( <Box sx={{ p: 3 }}> <Collection groupId={groupId} setTournament_id={setTournament_id} tournament_id={tournament_id} groupName={groupName} setCollectionName={setCollectionName}/> </Box> )}
            {value === 3 && ( <Box sx={{ p: 3 }}> <WAEvents groupName={groupName} collectionName={collectionName} tournament_id={tournament_id} setEventName={setEventName} eventName={eventName} event_id={event_id} setEvent_id={setEvent_id}/> </Box> )}
            {value === 4 && ( <Box sx={{ p: 3 }}> <ParticipationTable data={reportData}/> </Box> )}
            {value === 6 && ( <Box sx={{ p: 3 }}> <ProductTable data={reportData} tournament_id={tournament_id}/> </Box> )}

 */