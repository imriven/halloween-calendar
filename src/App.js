import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { StyledApp } from "./AppStyles";
import { createCalendar } from "./helpers";
import Door from "./door";
import creak from "./snd/creak.mp3"
import boo from "./snd/boo.mp3"
import HVideo from "./vid/Halloween1.mp4"
import Countdown from "react-countdown";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    background-color:black;
  }
  header {
    display: flex;
    align-items: center;
    text-align: center;
font-family: 'Rubik Moonrocks', cursive;
    z-index:2;
    color: white;
    text-shadow: 5px 5px 8px lime;
    padding-top: 2%;
    width:95%;
    justify-content: center;
    font-size:3rem;
  }
`;

// mine ------------------------------------------------------------------


const VideoBackground = styled.div`
display: flex;
z-index: -1;
justify-content: center;
flex-direction: column;
position:top
`
const AwesomeTitleHeader = styled.h2`
display:flex;
z-index: 1;
text-align:center;
color: darkred;
align-content:center;
justify-content: center;
text-shadow: 5px 5px 8px lime;
padding:0;
`
const ContainerDiv = styled.div`
text-decoration:none;
display: flex;
font-family: 'Pixelify Sans', cursive;
flex-direction:column;
flex-wrap: wrap;
align-content:center;
justify-content: center;
text-align: center;
width: 100%;
`


function App() {
  const [doors, setDoors] = useState([]);

  useEffect(() => {

    const calendar = localStorage.calendar
      ? JSON.parse(localStorage.calendar)
      : createCalendar();

    setDoors(calendar);
  }, []);

  // Store calendar in localStorage
  useEffect(() => {

    doors.length && localStorage.setItem("calendar", JSON.stringify(doors));
  }, [doors]);
  // Random component
  const Completionist = () => <AwesomeTitleHeader>Happy Halloween!!!</AwesomeTitleHeader>;

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <AwesomeTitleHeader>
          {days} Days {hours} Hours {minutes} Minutes {seconds} Seconds Until Halloween
        </AwesomeTitleHeader>
      );
    }
  };
  const audio_creak = new Audio(creak)
  const audio_boo = new Audio(boo)


  const handleFlipDoor = id => {
    const date = new Date();
    const month = 8
    // Change month back to 9
    if (parseInt(id.substring(6)) > date.getDate()) {
      return
    }
    if (month !== date.getMonth()) {
      return
    }
    const updatedDoors = doors.map(door =>
      door.id === id ? { ...door, open: !door.open } : door
    );
    if (["hatch-10", "hatch-30"].includes(id)) {
      audio_boo.play()
    } else {
      audio_creak.play()
    }

    setDoors(updatedDoors);
  };

  return (
    <>
      <VideoBackground>
        <video style={{ position: "fixed" }} autoPlay loop muted>
          <source src={HVideo} type="video/mp4" />
        </video>
        <GlobalStyle />
        <ContainerDiv>
          <header>RockAGoth's Halloween Countdown Calendar</header>
          <AwesomeTitleHeader><a style={{color:"darkred"}} href="https://twitch.tv/rockagoth" target="blank">twitch.tv/rockagoth</a></AwesomeTitleHeader>
          <AwesomeTitleHeader><Countdown style={{margin:"0"}}
            date={new Date("2023", "9", "31")}
            renderer={renderer}
          />
          </AwesomeTitleHeader>
        </ContainerDiv>
        <StyledApp>
          {doors.map(door => (
            <Door
              key={door.id}
              doorData={door}
              handleClick={handleFlipDoor}
            />
          ))}
        </StyledApp>
      </VideoBackground>
    </>
  );
}

export default App;