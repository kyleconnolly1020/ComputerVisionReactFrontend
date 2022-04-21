import React, { useEffect, useRef, useState } from "react"
import NavBar from "./components/AppBar"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid'
import './App.css';

function App() {
  const videoRef = useRef(null)
  const photoRef = useRef(null)
  const [colors, setColors] = useState({
    red: false,
    green: false,
    blue: false
  });

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: { width: 1920, height: 1080 }
      })
      .then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch(err => {
        console.error(err);
      })
  }

  const getColors = async () => {
    const width = 414;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext('2d');
    await ctx.drawImage(video, 0, 0, width, height)

    let base64 = photo.toDataURL()

    await fetch('https://api-computervision.herokuapp.com/capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({ photo: base64 })
    }).then(res => {
      res.json().then((data) => {
        setColors({
          red: data.Red,
          green: data.Green,
          blue: data.Blue
        });
      })
    });

    // let result = response.json()
    // console.log(result)

    // setColors({
    //   red: result.Red,
    //   green: result.Green,
    //   blue: result.Blue
    // })
  }

  // const getColors = (e) => {
  //   fetch('http://localhost:5000/capture').then((res) => {
  //     res.json().then((data) => {
  //       setColors({
  //         red: data.Red,
  //         green: data.Green,
  //         blue: data.Blue
  //       });
  //     })
  //   })
  // }

  useEffect(() => {
    getVideo();
  }, [videoRef])

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <h3><Typography variant="h4" className="app_blurb">Identify the RGB colors in your stream</Typography></h3>
        <video alt="streamwindow" className="stream_window" ref={videoRef} playsInline ></video>
        <canvas className="imageCanvas" ref={photoRef}></canvas>
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
