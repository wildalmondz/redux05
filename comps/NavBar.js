import Link from "next/link";
import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function NavBar() {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleContextMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleContextMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
        <IconButton
            aria-label="Context Menu"
            aria-controls="context-menu"
            aria-haspopup="true"
            onClick={handleContextMenuOpen}
        >
            <MenuIcon />
        </IconButton>
    <Popover
        id="context-menu"
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleContextMenuClose}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
    >
        <div style={{ padding: '10px' }}>
            <ul>
                <li>
                    <Link href={'/'} onClick={handleContextMenuClose}>Home</Link>
                </li>
                <li>
                    <Link href={'/blogs'} onClick={handleContextMenuClose}>Blogs</Link>
                </li>
                <li>
                    <Link href={'/about/pricing'} onClick={handleContextMenuClose}>Pricing</Link>
                </li>
            </ul>
        </div>
    </Popover>
        </>
    )
}