import store from '../store.js'
import actions from './Actions.js'

//Displays an Existing Monster or Character's info
function DisplayInfoCard(characterName){

const state = store.getState();

  if (state.monsterNames.includes(characterName)) {
    //this will render a monster
    store.dispatch(actions.UpdateMonsterInfoCard(characterName));
  }
  //edge case will o wisp
  else if(characterName.substring(0,4) === "Will"){

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
function AddInfo(charName,charInitiative, info = ""){

  store.dispatch(actions.AddCharacterCardAndDisplayInfoCard(charName, charInitiative, info))

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
export default {AddAndDisplayInfoCard, DisplayInfoCard, AddInfo, DeleteInfo, ChangeCount, DeleteAll}
