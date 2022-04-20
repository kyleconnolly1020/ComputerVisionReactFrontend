import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import Grid from '@mui/material/Grid'
import "./AppBar.css"

export default function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" className={"navbar"}>
                <Grid container>
                    <Grid className="icon_container" item xs={2} md={2}>
                        <ColorLensIcon sx={{ fontSize: 58}} />
                    </Grid>
                    <Grid item xs={8} md={8}>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            React ComputerVision RGB
                        </Typography>
                    </Toolbar>
                    </Grid>
                </Grid>
            </AppBar>
        </Box >
    );
}