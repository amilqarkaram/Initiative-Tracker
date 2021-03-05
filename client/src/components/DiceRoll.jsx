import React from "react"
import Icon from '@material-ui/core/Icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'
import Fab from "@material-ui/core/Fab";

function DiceRoll(props){
  function handleMouseOver(event){
    let element = document.getElementById("result");
    element.style.color = "black";
  }
  function handleMouseOut(event){
    let element = document.getElementById("result");
    element.style.color = "#F5E5C9";
  }
  function handleClick(event){
    let buttonEl = document.getElementById("roll");
    buttonEl.classList.add("clicked");
    function createNumber(){
    //make sure header element has no text
    let headerEl = document.getElementById("result"); // Create the H1 element
    headerEl.textContent = "";
    headerEl.removeAttribute("class");
    let randNum = Math.floor(Math.random() * 20) + 1;
    if(randNum % 10 === randNum){
      headerEl.classList.add("oneDigit");
      console.log("classList: " + headerEl.classList);
    }
    else{
      headerEl.classList.add("twoDigit");
      console.log("classList: " + headerEl.classList);
    }
    let randString = randNum.toString();
    let textNode = document.createTextNode(randString); // Create a text element
    headerEl.appendChild(textNode); // Append the text node to the H1 element
    buttonEl.classList.remove("clicked");
  }
  setTimeout(createNumber,1000);
  }
  const iconStyle ={
    fontSize:180
  }
  if(props.windowWidth > 641 && props.windowWidth < 1007){
    iconStyle.fontSize = 65;
  }
return(
  <div className="die">
  <button onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} type="button" id= "roll" onClick={handleClick}>
  <FontAwesomeIcon className="center dieIcon" style={iconStyle} icon={faDiceD20}/>
      <h1 id="result" className="twoDigit"></h1>
  </button>
  </div>
);
}

export default DiceRoll;
