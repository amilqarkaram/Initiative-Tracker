import React from "react";
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Fab from "@material-ui/core/Fab";
function dropdownMenu(props){
  function handleClick(event){
    props.handleDropdownClick(event.target.innerText);
  }
  return(
    <div>
    {console.log("lenght" + props.searchItems.length)}
      {props.searchItems.map(function(element){
            return  (
            <button onClick={handleClick} className="areaOptions">
            <p style={{zIndex: "1"}} href="#/action-1">{element}</p>
            </button>
          )
      })}
      </div>
  )
}

export default dropdownMenu;
