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

function App() {
  // monster info holds all of the mosnters info already fetched
  // monster names has an array of all the names of monsters fetched
  // current monster name is the current monster that will be rendered
  // current player name is the current player that will be rendered
  const [state, setState] = React.useState({
    monsterInfo: {},
    monsterNames: [],
    currentMonsterName: "not a monster",
    currentPlayerName: "not a player",
    windowWidth: window.innerWidth,
    cards: [],
    count: 0
  });
  //keyboard shortcuts
  React.useEffect(function(){

    function handleResize(event){
      setState(function(currentState){
        return{
          ...currentState,
          windowWidth: window.innerWidth
        }
      });
    }
    function handlePress(event){
        // enter key
        if (event.keyCode === 39 && !/INPUT|TEXTAREA|SELECT|BUTTON/.test(event.target.nodeName)) {
            event.preventDefault();
            // force triggers a click on the button
            if(document.querySelector(".runButton")){
              document.querySelector(".runButton").click();
            }
        }
        if (event.keyCode === 37 && !/INPUT|TEXTAREA|SELECT|BUTTON/.test(event.target.nodeName)) {
            event.preventDefault();
            // force triggers a click on the button
            if(document.querySelector(".backButton")){
              document.querySelector(".backButton").click();
            }
        }
        if (event.keyCode === 82 && !/INPUT|TEXTAREA|SELECT|BUTTON/.test(event.target.nodeName)) {
            event.preventDefault();
            // force triggers a click on the button
            document.querySelector("#roll").click();
        }
    }
    // assigns event listener to document
    document.addEventListener("keyup", handlePress);
    window.addEventListener('resize', handleResize);
    //cleanup event listeners
    return _ => {
      document.removeEventListener('keyup', handlePress);
      window.removeEventListener('resize', handleResize);
    }
  });
  // function nameIntoIndex(characterName){
  //   if(characterName.includes(",") && characterName.substring(0,4) === "were"){
  //     let temp = characterName;
  //     characterName = temp.split(',')[0] + '-' + temp.split(' ')[1];
  //   }
  //   else{
  //         characterName = characterName.replace(/ /g,"-");
  //   }
  //   return characterName.toLowerCase();
  // }
  // if the character card is clicked, this function will be called
  function renderMonster(characterName) {
    console.log("character name: " + characterName);
    console.log("monsterNames: " + state.monsterNames);
    console.log(state);
    if (state.monsterNames.includes(characterName)) {
      //this will render a monster
      setState(function(currentState) {
        return {
          ...currentState,
          currentPlayerName: "not a player",
          currentMonsterName: characterName
        }
      });
    }
    //edge case will o wisp
    else if(characterName.substring(0,4) === "Will"){
      setState(function(currentState) {
        return {
          ...currentState,
          currentPlayerName: "not a player",
          currentMonsterName: "Will-o'-Wisp"
        }
      });
    }
    // this will render a player
     else {
      setState(function(currentState) {
        return {
          ...currentState,
          currentPlayerName: characterName,
          currentMonsterName: "not a monster"
        }
      });
    }
  }
  // funciton called in child component
  function saveMonsterInfo(info) {
    if (state.monsterNames.includes(info.name)) {
      renderMonster(info.name);
    } // if the info belongs to a monster
    else if (info.status.isAMonster) {
      setState(function(currentState) {
        currentState.monsterInfo[info.name] = info;
        return {
          ...currentState,
          monsterInfo: currentState.monsterInfo,
          monsterNames: [...currentState.monsterNames, info.name],
          currentMonsterName: info.name,
          currentPlayerName: "not a player"
        }
      });
    } //if the info belongs to a player
    else {
      setState(function(currentState) {
        return {
          ...currentState,
          monsterInfo: currentState.monsterInfo,
          monsterNames: currentState.monsterNames,
          currentMonsterName: "not a monster",
          currentPlayerName: info.status.characterName
        }
      });
    }
  }
  //this function does not actually remove monsters
  // it removes any way that the player can access it.**** this still needs to be optimized
  function removeMonster(charName){
    setState(function(currentState) {
      return {
        ...currentState,
        monsterInfo: currentState.monsterInfo,
        monsterNames: currentState.monsterNames,
        currentMonsterName: "not a monster",
        currentPlayerName: "not a player"
      }
    });
  }
  function handleGoogleSave(googleData){
    console.log(googleData);
    axios({
      method: 'post',
      url: '/api/save',
      data: JSON.stringify({
        token: googleData.tokenId,
        cards: state.cards
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  function handleGoogleRetrieve(googleData){
    axios({
      method: 'post',
      url: '/api/retrieve',
      data: JSON.stringify({
        token: googleData.tokenId,
        cards: state.cards
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(function(response){
      setState(function(currentState){
        var tempArr = [...currentState.cards]
        tempArr.length = 0;
        return{
          ...currentState,
          cards: [...tempArr]
        }
      })
      for(let i = 0; i < response.data.length; ++i){
        saveInfo(response.data[i].charName, response.data[i].charInitiative);
        console.log("wy")
      }
      console.log("ajsdfiwejfsajioaj[jois[jjioj[j]]]" + response.data.length);
    });
  }
  // this function sets the state to the inputted information
  // in order to be used in the charactercard component
  function saveInfo(charName,charInitiative){
    setState(function(currentState){
      if(currentState.cards !== undefined){
        // new information is added to the array of character character
      var tempArray = [...currentState.cards];
      tempArray.push({charName,charInitiative});
      //sorted in ascending order by initiative
      tempArray.sort(function(a, b){return b.charInitiative - a.charInitiative})
    }
      return{
        ...currentState,
        cards: [...tempArray],
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
    axios.get("/api/" + charName)
    .then(function(response){
      getInfo(response.data).then(function(){
        saveMonsterInfo(response.data);
      });
    });
  }
  return (
    <div className = " App" >
    <Header windowWidth={state.windowWidth}/ >
    <GoogleLogin
     clientId={"669290193365-6a99rv1tr3a7cuqjjc940n1c0uru49o5.apps.googleusercontent.com"}
     buttonText="Save with Google"
     onSuccess={handleGoogleSave}
     onFailure={handleGoogleSave}
     cookiePolicy={'single_host_origin'}
     />
     <GoogleLogin
      clientId={"669290193365-6a99rv1tr3a7cuqjjc940n1c0uru49o5.apps.googleusercontent.com"}
      buttonText="Retrieve with Google"
      onSuccess={handleGoogleRetrieve}
      onFailure={handleGoogleRetrieve}
      cookiePolicy={'single_host_origin'}
      />
    <div className = "monsterCard" >
    {state.currentMonsterName === "not a monster" ?
      < PlayerCard info = {state.currentPlayerName}/>
      :
      < MonsterCard info = {state.monsterInfo[state.currentMonsterName]}/>}
      </div>
      <CharacterEngine
      savedMonsterNames={state.monsterNames}
      windowWidth={state.windowWidth}
      style={{position: "absolute",right:"0"}}
      renderMonster = {renderMonster}
      saveMonsterInfo = {saveMonsterInfo}
      removeMonster={removeMonster}
      setState={setState}
      state={state}
      saveInfo={saveInfo}
      />
       <div className = "RightCol" > < DiceRoll windowWidth={state.windowWidth} / > < /div>
       </div>
    );
  }

  export default App;
