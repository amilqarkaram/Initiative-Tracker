import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import axios from "axios"
import DropdownMenu from "./Dropdown"
function CreateCharacter(props){
const [state,setState] = React.useState({
  textInput: "",
  allMonsters:{},
  dropdownMonsters:[],
  readOnly: true
});
// use effect will only run once for initial render
React.useEffect(function(){
  async function getInfo(monsterNames){
    let info = await monsterNames;
    await setState(function(currentState){
      return{
        ...currentState,
        readOnly: false
      }
    });
    return info;
  }
  axios.get("/api/").then(function(response){
    getInfo(response).then(function(){
      console.log(response.data);
      setState(function(currentState){
        return{
        ...currentState,
        allMonsters: response.data,
        }
      })
    });
  });
},[]);
function handleDropdownClick(value){
  setState(function(currentState){
    return{
      ...currentState,
      textInput: value,
    }
  });
  async function getInfo(monsterMachine){
    let info = await monsterMachine;
    return info;
  }
  axios.get("/api/" + value)
  .then(function(response){
    getInfo(response.data).then(function(){
      props.saveMonsterInfo(response.data);
    });
  });
  //finally, focus back on input
  document.querySelector("textarea").focus();
}
// will save the input into the state variable
function handleChange(event){
  if(event.target.value === ""){
    setState(function(currentState){
      return{
        ...currentState,
        textInput: event.target.value,
        dropdownMonsters: []
      }
    });
  }
  else{
  let savedArray = [];
  let savedLCArray = [];
  let numSearchItems = 4;
  if(props.windowWidth > 641 && props.windowWidth < 1007){numSearchItems = 2}
  let lowerCaseMonsters = [];
  for(let i = 0;i<state.allMonsters.length;++i){
    lowerCaseMonsters.push(state.allMonsters[i].toLowerCase());
  }
  for(let i = 0; i < numSearchItems;++i){
  let monster = lowerCaseMonsters.find(function(element,index){
    return ((element.includes(event.target.value.toLowerCase())) && !savedLCArray.includes(element))
  });
  savedLCArray.push(monster);
  savedArray.push(state.allMonsters[lowerCaseMonsters.indexOf(monster)]);
  }
  let filtered = savedArray.filter(function(x) {
   return x !== undefined;
});
  setState(function(currentState){
    return{
      ...currentState,
      textInput: event.target.value,
      dropdownMonsters: filtered
    }
  });
}
}
// on a click, filters through input to retrieve name and initiative
function handleClick(event){
  let charName = "";
  let charInitiative=""
  let input = state.textInput;
  let check = true;
  //edge case will o wisp
  if(input.substring(0,4).toLowerCase() === "will"){
    charName = input;
    check = false;
  }
  for(let i =0;i < input.length;++i){
    if(check && ((input.charCodeAt(i) >= 65 && input.charCodeAt(i) <= 122 ) || (input.charCodeAt(i) === 32) || (input.charCodeAt(i) === 44))){
      charName = charName + input.charAt(i);
    }
    else if(input.charCodeAt(i) >= 48 && input.charCodeAt(i) <= 57){
      charInitiative = charInitiative + input.charAt(i);
    }
  }
  // passes input back to a function defined in the character engine
  props.saveInfo(charName, charInitiative);
  setState((currentState)=>{
    return{
      ...currentState,
      textInput: ""
    }
  });
}
// handles pressing the enter key
React.useEffect(function(){
  let textarea = document.querySelector("textarea");
  function handlePress(event){
      // enter key
      if (event.keyCode === 13) {
          event.preventDefault();
          // force triggers a click on the button
          document.querySelector(".addButton").click();
      }
  }
  // assigns event listener to textarea
  textarea.addEventListener("keyup", handlePress);
  //cleanup event listeners
  return _ => {
    textarea.removeEventListener('keyup', handlePress)
  }
});
const iconStyle= {
}
return(
  <div
  className="divArea"
  >
  <textarea
  placeholder="Name + Initiative"
  rows= "1"
  className="inputArea"
  value={state.textInput}
  onChange= {handleChange}
  readOnly ={state.readOnly}
  />
  <Fab onClick={handleClick} className="addButton">
  <AddIcon/>
  </Fab>
  <DropdownMenu handleDropdownClick={handleDropdownClick}searchItems={state.dropdownMonsters}/>
  </div>
);
}
export default CreateCharacter;
