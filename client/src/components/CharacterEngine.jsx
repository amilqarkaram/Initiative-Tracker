import React from "react";
import CreateCharacter from "./CreateCharacter"
import CharacterCard from "./CharacterCard"
import Cursor from "./Cursor"
import axios from "axios"
function CharacterEngine(props){
  React.useEffect(function(){
    console.log("array has changed")
  }, props.state.cards.length);
  function handleClick(event){
      props.setState(function(currentState){
        return{
          ...currentState,
          count: 0
        }
      });
      props.renderMonster(event.target.getAttribute("data-id"),event.target.getAttribute("data-initiative"));
  }
  function handleRunClick(event){
    props.setState(function(currentState){
      let newCount = currentState.count;
      ++newCount;
      if(newCount > props.state.cards.length){
        newCount = props.state.cards.length;
      }
      console.log("new count: " + newCount);
      return{
        ...currentState,
        count: newCount
      }
    });
  }
  function handleBackClick(event){
    props.setState(function(currentState){
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

 function deleteInfo(charName,charInitiative){
   props.setState(function(currentState){
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
       ...currentState,
       cards: filteredCards,
       count: 0
     }
   });
   props.removeMonster(charName);
 }
  return(
    <div id="engineContainer">
    <div className="createCharacterSpacing">
    <CreateCharacter windowWidth={props.windowWidth} saveMonsterInfo ={props.saveMonsterInfo} saveInfo = {props.saveInfo}/>
    </div>
    <div className="spacing">
    {props.state.cards !== undefined ?
      props.state.cards.map(function(element,index){
      return(
        <div className="characterCardSpacing" data-remove="hello">
       <CharacterCard count={props.state.count} index={index} key={index} card={element} deleteInfo={deleteInfo} handleClick={handleClick}/>
       </div>
     )
      })
       : ""
    }
    {props.state.cards.length !== 0 ?
    <div>
    <button id="run" onClick={handleRunClick} className="runButton btn btn-dark">Next</button>
    <button id="back" onClick={handleBackClick} className="backButton btn btn-dark">Back</button>
    </div> : ""}
    </div>
    </div>
  );
}
export default CharacterEngine;
