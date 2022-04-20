import React, { useState } from "react"
import NavBar from "./components/AppBar"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid'
import './App.css';

function App() {
  const [colors, setColors] = useState({
    red: false,
    green: false,
    blue: false
  });

  const getColors = (e) => {
    fetch('http://localhost:5000/capture').then((res) => {
      res.json().then((data) => {
        setColors({
          red: data.Red,
          green: data.Green,
          blue: data.Blue
        });
      })
    })
  }

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h3><Typography variant="h4" className="app_blurb">Identify the RGB colors in your stream</Typography></h3>
        <img alt="streamwindow" className="stream_window" src={"https://api-computervision.herokuapp.com/video_feed"} />
        <br />
        <Button className="identify_button" onClick={getColors} variant="contained" startIcon={<ColorLensIcon />}>Identify Colors</Button>
        
        <br />
        <Grid className="colorGrid" container spacing={1}>
          {colors.red && <Grid item><Chip className="color_chip" label="RED" color="error" /></Grid>}
          {colors.green && <Grid item><Chip className="color_chip" label="GREEN" color="success" /></Grid>}
          {colors.blue && <Grid item><Chip className="color_chip" label="BLUE" color="primary" /></Grid>}
        </Grid>
      </header>
    </div>
  );
}

export default App;
