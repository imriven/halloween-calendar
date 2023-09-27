import React, { useState, useEffect } from "react";
import { createGlobalStyle } from "styled-components";
import styled from "styled-components";
import { StyledApp } from "./AppStyles";
import { createCalendar } from "./helpers";
import Door from "./door";
import Appbackground from "./img/haunted.jpg"
import creak from "./snd/creak.mp3"
import boo from "./snd/boo.mp3"
import HVideo from "./vid/Halloween1.mp4"


const GlobalStyle = createGlobalStyle`
  body {
    /* background: center / cover url(${Appbackground}); */
    margin: 0;
    background-color:black;
  }
  header {
    display: flex;
    align-items: center;
    text-align: center;
    z-index:2;
    color: white;
    text-shadow: 5px 5px 8px lime;
    padding: 2%;
    width:95%;
    justify-content: center;
    font-size:3rem;
  }
`;

// mine ------------------------------------------------------------------


const VideoBackground = styled.div`
display: flex;
z-index: 1;
justify-content: center;
flex-direction: column;
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
        <header>RockAGoth's Halloween Countdown Calendar</header>
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