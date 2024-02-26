// admin/experience/Tabsv02.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import HtmlTest from './htmltest';
import Group from './Group';

export default function CenteredTabs() {
    const [value, setValue] = useState(0);
    const [groupName, setGroupName] = useState('Company/Group');
    const [collectionName, setCollectionName] = useState('Collection');
    const [eventName, setEventName] = useState('Event');
    const [invitationName, setInvitationName] = useState('Invitation');

    const handleChange = (event, newValue) => {
        if (newValue === 2) { setCollectionName('Found collection') }
        if (newValue === 3) { setEventName('Found events') }
        setValue(newValue);
    };

    if ((groupName !== 'Company/Group') && (collectionName !== 'Select Collection')) {
        setCollectionName('Select Collection');
    }

    const handleClick = (event, newValue) => {

        if (newValue === 3) { setEventName('Select Event') }
        setValue(newValue);
    };

    return (
        <Box sx={{ flexGrow: 1, width: '100%', bgcolor: 'background.paper', height: '30em' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                centered={false}
            >
                <Tab label="Get Started" onClick={() => handleClick(null, 0)} />
                <Tab label={groupName} onClick={() => handleClick(null, 1)} />
                <Tab
                    label={collectionName}
                    onClick={() => handleClick(null, 2)}
                    disabled={groupName === 'Company/Group'}
                />
                <Tab
                    label={eventName}
                    onClick={() => handleClick(null, 3)}
                    disabled={collectionName === 'Collection'}
                />
                <Tab
                    label="Invitations"
                    onClick={() => handleClick(null, 4)}
                    disabled={eventName === 'Event'}
                />
                <Tab
                    label="Reports"
                    onClick={() => handleClick(null, 5)}
                    disabled={groupName === 'Company/Group'}
                />
                <Tab label="Testing" onClick={() => handleClick(null, 6)} />
            </Tabs>
            {value === 0 && ( <Box sx={{ p: 3 }}> <HtmlTest /> </Box> )}
            {value === 1 && ( <Box sx={{ p: 3 }}> <Group groupName={groupName} setGroupName={setGroupName}/> </Box> )}
        </Box>
    );
}
