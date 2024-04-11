// admin/experience/Tabs.js
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Instructions from './Instructions';
/*
import Group from './Group';
import Collection from './Collection';
import WAEvents from './WAEvents';
import reportData from "./fullData";
import ParticipationTable from "./ParticipationTable";
import ProductTable from "./ProductTable";

 */

export default function CenteredTabs() {
    const [value, setValue] = useState(0);
    const [groupId, setGroupId] = useState(0);
    const [groupName, setGroupName] = useState('Company/Group');
    const [collectionName, setCollectionName] = useState('Collection');
    const [foundCollection, setFoundCollection] = useState(false);
    const [tournament_id, setTournament_id] = useState('');
    const [event_id, setEvent_id] = useState('');

    const [eventName, setEventName] = useState('Event');
    const [invitationName, setInvitationName] = useState('Invitation');

    const handleChange = (event, newValue) => {
        if (newValue === 2) { setCollectionName('Select Collection') }
        if (newValue === 3) { setEventName('Found events') }
        setValue(newValue);
    };

    if ((groupName !== 'Company/Group') && (collectionName !== 'Select Collection') && (!foundCollection)) {
        setCollectionName('Select Collection');
        setFoundCollection(true);
    }

    if ((collectionName !== 'Select Collection' || 'Collection') && (eventName !== 'Select Event')) {
       // setEventName('Select Event');
    }

    const handleClick = (event, newValue) => {
        if (newValue === 3) { setEventName('Select Event') }
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
                    disabled={collectionName === 'Select Collection' || collectionName === 'Collection'}
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
                <Tab label="Product" onClick={() => handleClick(null, 6)} />
            </Tabs>
            {value === 0 && ( <Box sx={{ p: 3 }}> <Instructions /> </Box> )}
        </Box>
    );
}


/*
            {value === 1 && ( <Box sx={{ p: 3 }}> <Group groupName={groupName} setGroupName={setGroupName} setGroupId={setGroupId}/> </Box> )}
            {value === 2 && ( <Box sx={{ p: 3 }}> <Collection groupId={groupId} setTournament_id={setTournament_id} tournament_id={tournament_id} groupName={groupName} setCollectionName={setCollectionName}/> </Box> )}
            {value === 3 && ( <Box sx={{ p: 3 }}> <WAEvents groupName={groupName} collectionName={collectionName} tournament_id={tournament_id} setEventName={setEventName} eventName={eventName} event_id={event_id} setEvent_id={setEvent_id}/> </Box> )}
            {value === 4 && ( <Box sx={{ p: 3 }}> <ParticipationTable data={reportData}/> </Box> )}
            {value === 6 && ( <Box sx={{ p: 3 }}> <ProductTable data={reportData} tournament_id={tournament_id}/> </Box> )}

 */