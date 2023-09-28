import React from "react";
import { StyledDoor } from "./doorStyles";

const Door = ({ doorData: { id, nr, link, streamLink, img, open }, handleClick }) => (
  <StyledDoor background={img} onClick={() => handleClick(id)}>
    <div className={open ? "front open" : "front"}>
      <p>{nr}</p>
    </div>
    <div className={open ? "back open" : "back"} style={{display:"flex", flexDirection:"column"}}>
      <p style={{backgroundColor:"#FFE0F87C", padding:0}}><a href={link} target="blank">Spooky Link of the Day</a></p>
    <p style={{backgroundColor:"#FFE0F87C", padding:0}}><a href={"https://twitch.tv/" + streamLink} target="blank">Streamer of the Day</a></p>
    </div>
  </StyledDoor>
);

export default Door;