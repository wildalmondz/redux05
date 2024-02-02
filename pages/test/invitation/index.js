import * as React from 'react';
import { styled } from '@mui/material/styles';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '5em' // Adjust the height as needed
}));


import ContainerNoDivision from "../squarelayout/containerNoDivision";
import Paper from "@mui/material/Paper";

export default function rtest({ }) {

    return (
        <ContainerNoDivision>
            <Item>
                <h3>Welcome to WildAlmonds!!</h3>
            </Item>
        </ContainerNoDivision>
    );
}