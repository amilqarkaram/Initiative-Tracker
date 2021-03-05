import React from "react";
import CreateCharacter from "./CreateCharacter"
import CharacterCard from "./CharacterCard"
import Cursor from "./Cursor"
import axios from "axios"
function CharacterEngine(props){
  const[state, setState]= React.useState({
        cards:[],
        count: 0
  });
  function handleClick(event){
      setState(function(currentState){
        return{
          ...currentState,
          count: 0
        }
      });
      props.renderMonster(event.target.getAttribute("data-id"),event.target.getAttribute("data-initiative"));
  }
  function handleRunClick(event){
    setState(function(currentState){
      let newCount = currentState.count;
      ++newCount;
      if(newCount > state.cards.length){
        newCount = state.cards.length;
      }
      console.log("new count: " + newCount);
      return{
        ...currentState,
        count: newCount
      }
    });
  }
  function handleBackClick(event){
    setState(function(currentState){
      let newCount = currentState.count;
      --newCount;
      if(newCount < 1){
        newCount = 1;
      }
      console.log("new Count :" + newCount);
      return{
        ...currentState,
        count: newCount
      }
    });
  }
 // this function sets the state to the inputted information
 // in order to be used in the charactercard component
 function saveInfo(charName,charInitiative){
   setState(function(currentState){
     if(currentState.cards !== undefined){
       // new information is added to the array of character character
     currentState.cards.push({charName,charInitiative});
     //sorted in ascending order by initiative
     currentState.cards.sort(function(a, b){return b.charInitiative - a.charInitiative})
   }
     return{
       cards: currentState.cards,
       count: 0
     }
   });
   //send name to server via axios
   //set state with axios response
   async function getInfo(monsterMachine){
     let info = await monsterMachine;
     return info;
   }
   if(charName === ""){
     charName="nobody";
   }
   axios.get("/apit/" + charName)
   .then(function(response){
     getInfo(response.data).then(function(){
       props.saveMonsterInfo(response.data);
     });
   });
 }
 function deleteInfo(charName,charInitiative){
   setState(function(currentState){
     let filteredCards = [];
     if(currentState.cards !== undefined){
       // new information is added to the array of character character
     filteredCards = currentState.cards.filter(function(value){
       return (value.charName !== charName || value.charInitiative!== charInitiative)
     });
     console.log(currentState.cards);
     //sorted in ascending order by initiative
     currentState.cards.sort(function(a, b){return b.charInitiative - a.charInitiative})
   }
     return{
       cards: filteredCards,
       count: 0
     }
   });
   props.removeMonster(charName);
 }
  return(
    <div id="engineContainer">
    <div className="createCharacterSpacing">
    <CreateCharacter windowWidth={props.windowWidth} saveMonsterInfo ={props.saveMonsterInfo} saveInfo = {saveInfo}/>
    </div>
    <div className="spacing">
    {state.cards !== undefined ?
      state.cards.map(function(element,index){
      return(
        <div className="characterCardSpacing" data-remove="hello">
       <CharacterCard count={state.count} index={index} key={index} card={element} deleteInfo={deleteInfo} handleClick={handleClick}/>
       </div>
     )
      })
       : ""
    }
    {state.cards.length !== 0 ?
    <div>
    <button id="run" onClick={handleRunClick} className="runButton btn btn-dark">Next</button>
    <button id="back" onClick={handleBackClick} className="backButton btn btn-dark">Back</button>
    </div> : ""}
    </div>
    </div>
  );
}
export default CharacterEngine;
