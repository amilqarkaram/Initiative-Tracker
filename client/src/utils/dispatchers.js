import store from '../store.js'
import actions from './Actions.js'

//Displays an Existing Monster or Character's info
function DisplayInfoCard(characterName){

const state = store.getState();

  if (state.monsterNames?.includes(characterName)) {
    //this will render a monster
    store.dispatch(actions.UpdateMonsterInfoCard(characterName));
  }
  //edge case will o wisp
  else if(characterName?.substring(0,4) === "Will"){

    store.dispatch(actions.UpdateMonsterInfoCard("Will-o'-Wisp"));

  }
  // this will render a player
   else {
     store.dispatch(actions.UpdatePlayerInfoCard(characterName));
  }
}
//Instantaite new info card and dispaly it
function AddAndDisplayInfoCard(info){

const state = store.getState();

  if (state.monsterNames.includes(info.name)) {

    DisplayInfoCard(info.name);

  } // if the info belongs to a monster
  else if (info.status.isAMonster) {

    store.dispatch(actions.AddAndUpdateMonsterInfoCard(info.name,info));

  } //if the info belongs to a player
  else {

    store.dispatch(actions.AddAndUpdatePlayerInfoCard(info.status.characterName,info.notes))

  }
}
//add smaller initiative card and display it
function AddInfo(charName,charInitiative, info = "", _hp = "0", _ac = "0", _dt = "0"){
  const state = store.getState();
  let number = 1;
  let isDuplicate = false;
  for(let i = 0; i < state.cards.length; ++i){
      let cardCharName = state.cards[i].charName;
      if(cardCharName === charName){
        isDuplicate = true;
        break;
      }
  }
  if(!isDuplicate){
    store.dispatch(actions.AddCharacterCardAndDisplayInfoCard(charName, charInitiative, info, _hp, _ac, _dt))
  }

}

function DeleteInfo(charName, charInitiative){

  store.dispatch(actions.RemoveCharacterCard(charName, charInitiative));
  store.dispatch(actions.RemoveInfoCard());

}

function ChangeCount(count = 0,type = null){
  if(type == null){
      store.dispatch(actions.ChangeCount(count));
  }
  else if(type === "IncrementCount"){
    store.dispatch(actions.IncrementCount())
  }
  else if(type === "DecrementCount"){
    store.dispatch(actions.DecrementCount())
  }

}

function DeleteAll(){
  store.dispatch(actions.DeleteAll());
}

function DispatchHP(_charName, _hp){
  store.dispatch(actions.AddHP(_charName, _hp));
}
function DispatchAC(_charName, _ac){
  store.dispatch(actions.AddAC(_charName, _ac));
}
function DispatchDT(_charName, _dt){
  store.dispatch(actions.AddDT(_charName, _dt));
}
function RenderHPAC(){
  store.dispatch(actions.SetHPACRender());
}
function SetWindowWidth(_windowWidth){
  store.dispatch(actions.SetWindowWidth(_windowWidth))
}
export default {AddAndDisplayInfoCard, DisplayInfoCard, AddInfo, DeleteInfo, ChangeCount, DeleteAll, DispatchHP, DispatchAC, DispatchDT, RenderHPAC, SetWindowWidth}
