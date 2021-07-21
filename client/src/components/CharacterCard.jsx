import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Cursor from "./Cursor";
import HPACBubble from "./HPACBubble"
import TrashIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useSelector} from 'react-redux'
import dispatchers from '../utils/dispatchers'
import {handleClick} from '../utils/ClickHandler'
function CharacterCard(props){
  let {count} = useSelector(state => state);
  const[state,setState] = React.useState({
    index: props.index
  });
  //any time the monstercard rerenders(when count changes), the state will be changed accordingly
  React.useEffect(function(){
    setState({index: props.index});
    console.log("character card rendered" );
  },[props.index]);
  React.useEffect(function(){
    console.log("oy")
  },[])
  function handleTrashClick(){
    dispatchers.DeleteInfo(props.card.charName,props.card.charInitiative);
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
    onClick = {handleClick}
    src="images/man-profile-cartoon_18591-58482.jpg"
    alt="Profile Pic"
    data-id={props.card.charName}
    data-initiative={props.card.charInitiative}
    />
    </div>
    <div onClick = {handleClick} className="areaText">
    <p onClick = {handleClick} data-id={props.card.charName}>Name: {props.card.charName} <br/>
    Initiative: {props.card.charInitiative}</p>
    </div>
    {state.index === (count - 1) ? <ArrowBackIcon
      style={{position:"absolute",right:"0",margin:"auto", top: "0", bottom:"30"}}
      color="black"
      fontSize="large"/> : ""}
      <Fab style={{position:"absolute",right:"0",margin:"auto", top: "20", bottom:"0", cursor: "pointer"}} onClick={handleTrashClick} className="addButton">
      <TrashIcon/>
      </Fab>
      <HPACBubble charName={props.card.charName}/>
      <div className="red"/>
      <div className="blue" />
    </div>
  );
}


export default CharacterCard;
