import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Cursor from "./Cursor";
import TrashIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
function CharacterCard(props){
  const[state,setState] = React.useState({
    index: props.index,
    count: props.count
  });
  //any time the monstercard rerenders(when count changes), the state will be changed accordingly
  React.useEffect(function(){
    setState({index: props.index, count: props.count});
    console.log("character card rendered" );
  },[props.index,props.count]);
  function handleTrashClick(){
    props.deleteInfo(props.card.charName,props.card.charInitiative);
  }
  return(
    <div
    className="areaCard"
    data-id={props.card.charName}
    id={props.index}
    >
    <div>
    <img
    className="profile-pic"
    onClick = {props.handleClick}
    src="images/man-profile-cartoon_18591-58482.jpg"
    alt="Profile Pic"
    data-id={props.card.charName}
    data-initiative={props.card.charInitiative}
    />
    </div>
    <div onClick = {props.handleClick} className="areaText">
    <p onClick = {props.handleClick} data-id={props.card.charName}>Name: {props.card.charName} <br/>
    Initiative: {props.card.charInitiative}</p>
    </div>
    {state.index === (props.count - 1) ? <ArrowBackIcon
      style={{position:"absolute",right:"0",margin:"auto", top: "0", bottom:"30"}}
      color="black"
      fontSize="large"/> : ""}
      <Fab style={{position:"absolute",right:"0",margin:"auto", top: "20", bottom:"0"}} onClick={handleTrashClick} className="addButton">
      <TrashIcon/>
      </Fab>

    </div>
  );
}


export default CharacterCard;
