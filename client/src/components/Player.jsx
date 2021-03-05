import React from "react";

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
  return(
  <div>
  {props.info !== "not a player" ?
  <div style={divStyle}>
  <h1>{props.info !== "nobody" ? props.info:''}</h1>
  <img
  className="playerImage"
  src="images/man-profile-cartoon_18591-58482.jpg"
  alt="Profile Pic"
  />
  </div>
   :
  ""}
  </div>
)
}

export default Player;
