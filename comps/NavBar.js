import Link from 'next/link';
import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

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
                <List>
                    <ListItem button>
                        <Link href={'/'} onClick={handleContextMenuClose}>
                            Home
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link href={'/blogs'} onClick={handleContextMenuClose}>
                            Blogs
                        </Link>
                    </ListItem>
                    <ListItem button>
                        <Link href={'/about/pricing'} onClick={handleContextMenuClose}>
                            Pricing
                        </Link>
                    </ListItem>
                </List>
            </Popover>
        </>
    );
}
