"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import { TbMenu2, TbX, TbHelpCircle, TbShare2, TbWorld, TbUser, TbChevronDown } from 'react-icons/tb';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FormControl, FormHelperText, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { ModeComment } from '@material-ui/icons';

import Image from 'next/image';

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
}

const drawerWidth = 240;
const navItems: string[] = [];

const handleHelpClick = () => {
    // To be implemented
};
const actionMap: { [key: string]: () => void } = {
    Help: handleHelpClick
};


export default function DrawerAppBar(props: Props) {
    const router = useRouter();
    const [mode, setMode] = useState('');
    const handleMode = (event: SelectChangeEvent) => {
        setMode(event.target.value);

        if (event.target.value === 'plot') {
            router.push('/plot');
            setMode('plot');
        }
        else if (event.target.value === 'classify') {
            router.push('/classify');
            setMode('classify');
        }

    };
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const [helpOpen, setHelpOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleHelpClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        setHelpOpen((prev) => !prev);
    };

    const handleHelpClickAway = () => {
        setAnchorEl(null);
        setHelpOpen(false);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Link href='/' onClick={() => setMode('')}>
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={1201}
                    height={347}
                    className="w-64 object-contain"
                />
            </Link>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item} disablePadding>
                        <ListItemButton
                            sx={{ textAlign: 'center' }}
                            onClick={actionMap[item]}
                        >
                            <ListItemText primary={item} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <AppBar component="nav" sx={{ color: 'black', backgroundColor: 'white'}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <TbMenu2 />
                    </IconButton>

                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                        <Link href='/' onClick={() => setMode('')}>
                            <Image
                                src="/logo.png" // Path to your image
                                alt="Logo"
                                width={1201} // Adjust width as needed
                                height={347} // Adjust height as needed
                                className="w-64 object-contain"
                            />
                        </Link>
                    </Box>

                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <FormControl sx={{ m: 1, minWidth: 180 }}>
                            <InputLabel id="demo-simple-select-helper-label">Select a mode</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={mode}
                                label="Select a mode"
                                onChange={handleMode}
                            >
                                <MenuItem value={'classify'}>Classify</MenuItem>
                                <MenuItem value={'plot'}>Plot</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    
                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'right', alignItems: 'center'}}>
                        <ClickAwayListener onClickAway={handleHelpClickAway}>
                            <Box sx={{ position: 'relative' }}>
                                <Button type="button" sx={{ color: '#000' }} onClick={handleHelpClick}>
                                    Help
                                </Button>
                                <Popover
                                    open={helpOpen}
                                    anchorEl={anchorEl}
                                    onClose={handleHelpClickAway}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    slotProps={{
                                        paper: {
                                            sx: {
                                                width: 'auto',
                                                maxWidth: '25%',
                                            },
                                        }
                                    }}
                                >
                                    <Typography sx={{ p: 2 }}>
                                        To classify, input the measurement of each element of each sample for each row. For multiple samples, you can add rows by clicking "Add row". To see the classifications, click "Classify". The best classification for each row will appear, labeled by row number. If our algorithm does not find a classification given the provided values, the sample will be considered ungrouped.
                                    </Typography>
                                    <Typography sx={{ p: 2 }}>
                                        To plot, input the measurement of each element of each sample for each row, then click "Plot". This tool also supports pasted input from spreadsheet applications such as Microsoft Excel. Once the plot is rendered, specific points can be examined by hovering with your mouse. The default x- and y-axes are Ni and Co respectively, but can be selected using the dropdowns on the bottom left. The color of the points can also be altered using the color picker.
                                    </Typography>
                                </Popover>
                            </Box>
                        </ClickAwayListener>
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button key={item} sx={{ color: '#000' }} onClick={actionMap[item]}>
                                {item}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>

        </Box>
    );
}