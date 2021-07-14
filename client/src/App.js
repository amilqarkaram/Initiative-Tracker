import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import axios from 'axios'
import CreateCharacter from "./components/CreateCharacter"
import CharacterEngine from "./components/CharacterEngine"
import Header from "./components/Header"
import CharacterCard from "./components/CharacterCard"
import DiceRoll from "./components/DiceRoll"
import MonsterCard from "./components/Monster"
import PlayerCard from "./components/Player"
import SaveButton from "./components/SaveButton"
import GoogleLogin from 'react-google-login'
import { useSelector } from 'react-redux'
import store from './store';
import actions from './utils/Actions.js'
import dispatchers from './utils/dispatchers.js'
import {handleResize, handlePress, handleClick, handleNextClick, handleBackClick} from './utils/ClickHandler.js'
import {handleGoogleSave, handleGoogleRetrieve} from './utils/OauthHandler.js'
const util = require('util')
const selectStoreState = state => state;

//console.log(util.inspect(myObject, {showHidden: false, depth: null}))
function App() {
  const storeState = useSelector(state => state);
  const unsubscribe = store.subscribe(()=>{
    console.log('State after dispatch: ' + util.inspect(store.getState(),{showHidden: false, depth: null}));
  });

  return (
    <div className = " App" >
    <Header windowWidth={storeState.windowWidth}/ >
    <div className = "googleAuth">
    <GoogleLogin
     clientId={"669290193365-6a99rv1tr3a7cuqjjc940n1c0uru49o5.apps.googleusercontent.com"}
     buttonText="Save with Google"
     onSuccess={function(event){handleGoogleSave(event, storeState)}}
     onFailure={function(event){handleGoogleSave(event, storeState)}}
     cookiePolicy={'single_host_origin'}
     />
     <GoogleLogin
      clientId={"669290193365-6a99rv1tr3a7cuqjjc940n1c0uru49o5.apps.googleusercontent.com"}
      buttonText="Retrieve with Google"
      onSuccess={function(event){handleGoogleRetrieve(event, storeState)}}
      onFailure={function(event){handleGoogleRetrieve(event, storeState)}}
      cookiePolicy={'single_host_origin'}
      />
      </div>
    <div className = "monsterCard" >
    {storeState.currentMonsterName === "not a monster" ?
      < PlayerCard/>
      :
      < MonsterCard />}
      </div>
      <CharacterEngine
      windowWidth={storeState.windowWidth}
      style={{position: "absolute",right:"0"}}
      />
       <div className = "RightCol" > < DiceRoll windowWidth={storeState.windowWidth} / > < /div>
       </div>
    );
  }

  export default App;
