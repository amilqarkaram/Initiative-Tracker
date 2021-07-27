import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import axios from "axios"
import DropdownMenu from "./Dropdown"
import HPACHeader from "./HPACHeader"
import dispatchers from "../utils/dispatchers"
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

// handles pressing the enter key
React.useEffect(function(){
  let textarea = document.querySelector(".inputArea");
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
      dispatchers.AddAndDisplayInfoCard(response.data);
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
  let inputArr = input.split(" ");
  for(let i = 0; i < inputArr.length; ++i){
    let inputStr = inputArr[i];
      if(inputStr.charCodeAt(0) >= 48 && inputStr.charCodeAt(0) <= 57){
        for(let k = 0; k < inputStr.length; ++k){
          if(inputStr.charCodeAt(k) >= 48 && inputStr.charCodeAt(k) <= 57){
            charInitiative = charInitiative + inputStr.charAt(k);
          }
        }
        continue;
      }
      else {
        for(let j = 0; j < inputStr.length; ++j){
        if(check && inputStr.charCodeAt(j) !== 10){
          charName = charName + inputStr.charAt(j);
        }
      }
    }
  }
  // passes input back to a function defined in the character engine
  dispatchers.AddInfo(charName, charInitiative, "");
  setState((currentState)=>{
    return{
      ...currentState,
      textInput: ""
    }
  });
}

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
  <DropdownMenu handleDropdownClick={handleDropdownClick} searchItems={state.dropdownMonsters}/>
  <HPACHeader />
  </div>
);
}
export default CreateCharacter;
