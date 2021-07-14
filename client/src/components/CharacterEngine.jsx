import React from "react";
import CreateCharacter from "./CreateCharacter"
import CharacterCard from "./CharacterCard"
import Cursor from "./Cursor"
import axios from "axios"
import {handleNextClick, handleBackClick} from '../utils/ClickHandler.js'
import {useSelector} from 'react-redux'
function CharacterEngine(props){

let { cards } = useSelector(state => state);

  return(
    <div id="engineContainer">

      <div className="createCharacterSpacing">

        <CreateCharacter windowWidth={props.windowWidth}/>

      </div>

      <div className="spacing">
      {cards !== undefined ?
        cards.map(function(element,index){
          return(
            <div className="characterCardSpacing" data-remove="hello">

              <CharacterCard index={index} key={index} card={element}/>

            </div>
          )
        })
        : ""
      }
      {cards.length !== 0 ?
        <div>

          <button id="next" onClick={handleNextClick} className="nextButton btn btn-dark">Next</button>

          <button id="back" onClick={handleBackClick} className="backButton btn btn-dark">Back</button>

        </div> : ""}

      </div>

    </div>
  );
}

export default CharacterEngine;
