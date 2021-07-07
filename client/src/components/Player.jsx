import React from "react";
import dispatchers from '../utils/dispatchers'
import {useSelector} from 'react-redux'
function Player(props){
  const divStyle = {
    overflowY: "scroll",
    overflowX: "hidden",
    border: "1px solid black",
    borderRadius: "30px",
    width: "300px",
    float: "left",
    height: "75vh",
    position: "relative",
    background: "#F5E5C9",
    boxShadow: "1px 1px 3px black",
    marginTop: "30px",
    textAlign: "center",
    fontFamily: "font-family: 'Langar', cursive;"
  };
    const {currentPlayerName, characterInfo} = useSelector(state => state);

  function handleChange(event){
    let info = {
      notes: event.target.value,
      status: {isAMonster: false, characterName: currentPlayerName}
    }
    dispatchers.AddAndDisplayInfoCard(info);
  }
  return(
  <div>
  {currentPlayerName !== "not a player" ?
  <div style={divStyle}>
  <h1>{ currentPlayerName !== "nobody" ? currentPlayerName : '' }</h1>
  <img
  className="playerImage"
  src="images/man-profile-cartoon_18591-58482.jpg"
  alt="Profile Pic"
  />
  <textarea
   id="playerNoteArea"
   name="playerNoteArea"
   cols="30"
   rows="10"
   className="playerNotes"
   placeholder="Take Notes Here"
   onChange={handleChange}
   value = {characterInfo[currentPlayerName] ? characterInfo[currentPlayerName] : ""}
   >
   </textarea>
  </div>
   :
  ""}
  </div>
)
}

export default Player;
