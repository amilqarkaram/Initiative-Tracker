
function UpdateMonsterInfoCard(name){
  return {
    type: 'Card/DisplayMonsterInfoCard',
    payload:
      {
        currentPlayerName: "not a player",
        currentMonsterName: name
      }
    }
}
function UpdatePlayerInfoCard(name){
  return {
    type: 'Card/DisplayPlayerInfoCard',
    payload:
      {
        currentPlayerName: name,
        currentMonsterName: "not a monster"
      }
    }
}

function AddAndUpdateMonsterInfoCard(name, info){
  return {
    type: 'Card/AddAndDisplayMonsterInfoCard',
    payload:
      {
        currentPlayerName: "not a player",
        currentMonsterName: name,
        additionalInfo: info
      }
    }
  }
  function AddAndUpdatePlayerInfoCard(name, notes){
    return {
      type: 'Card/AddAndDisplayPlayerInfoCard',
      payload:
        {
          currentPlayerName: name,
          currentMonsterName: "not a monster",
          notes: notes
        }
      }
    }
    function AddCharacterCardAndDisplayInfoCard(name, initiative, info){
      return {
        type: 'Card/AddCharacterCardAndDisplayInfoCard',
        payload:
        {
          charName: name,
          charInitiative: initiative,
          charInfo: info
        }
        }
    }
    function RemoveInfoCard(){
      return {
        type: 'Card/RemoveInfoCard'
      }
    }
    function RemoveCharacterCard(charName, charInitiative){
      return {
        type: 'Card/RemoveCharacterCard',
        payload: {
          charName: charName,
          charInitiative: charInitiative
        }
      }
    }
    function ChangeCount(count){
      return{
        type: 'Order/ChangeCount',
        payload: {
          count: count
        }
      }
    }
    function IncrementCount(){
      return{
        type: 'Order/IncrementCount'
      }
    }
    function DecrementCount(){
      return{
        type: 'Order/DecrementCount'
      }
    }
    function DeleteAll(){
      return{
        type: 'Cards/DeleteAll'
      }
    }


export default {UpdatePlayerInfoCard, UpdateMonsterInfoCard, AddAndUpdatePlayerInfoCard, AddAndUpdateMonsterInfoCard, AddCharacterCardAndDisplayInfoCard,
RemoveInfoCard, RemoveCharacterCard, ChangeCount, IncrementCount, DecrementCount, DeleteAll};