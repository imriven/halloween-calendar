import styled from "styled-components";
import doorBackdrop from "./img/door.jpeg";


export const StyledDoor = styled.div`
  padding-top: 100%;
  position: relative;
  cursor: pointer;
  .front {
    background: center / cover url(${doorBackdrop});
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    transition-duration: 4.5s;
    p {
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: "Dancing Script", cursive;
      color: black;
      padding: 20px;
      width: 50%;
      height: 50%;
      /* border-radius: 50%;
      background: rgba(0, 0, 0, 0.7); */
      font-weight: 700;
      font-size: 4rem;
    }
    &.open {
      transform: rotateY(180deg);
    }
  }
  .back {
    position: absolute;
    background: center / cover url(${props => props.background});
    top: 0px;
    left: 0px;
    z-index: 1;
    transition-duration: 4.5s;
    transform: rotateY(180deg);
    p {
      font-family:"Rubik Moonrocks", serif;
      color: black;
      padding: 10px;
      font-size: 1.2rem;
      text-align: center;
    }
    &.open {
      z-index: 2;
      transform: rotateY(0deg);
    }
  }
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    transition: all 0.5s;
    transform-style: preserve-3d;
    border-radius: 20px;
    border: 1px solid #ffffff;
    box-sizing: border-box;
  }
`;

