const initialState = {
  characterInfo: {},
  monsterNames: [],
  currentMonsterName: "not a monster",
  currentPlayerName: "not a player",
  currentPlayerInfo: "",
  windowWidth: window.innerWidth,
  cards: [],
  count: 0,
}

export default function appReducer(state = initialState, action){
  switch(action.type){
    case 'Card/DisplayMonsterInfoCard' : {
      return {
        ...state,
        currentMonsterName: action.payload.currentMonsterName,
        currentPlayerName: "not a player"
      }
    }
    case 'Card/DisplayPlayerInfoCard' : {
      return {
        ...state,
        currentPlayerName: action.payload.currentPlayerName,
        currentMonsterName: "not a monster"
      }
    }
    case 'Card/AddAndDisplayMonsterInfoCard' : {
      return {
        ...state,
        currentMonsterName: action.payload.currentMonsterName,
        currentPlayerName: action.payload.currentPlayerName,
        monsterNames: [...state.monsterNames, action.payload.additionalInfo.name],
        characterInfo: {...state.characterInfo,
                          [action.payload.currentMonsterName]: {
                            ...state.characterInfo[action.payload.currentMonsterName],
                            notes: action.payload.additionalInfo
                          }
                      }
      }
    }
    case 'Card/AddAndDisplayPlayerInfoCard' : {
      let filteredCards = [...state.cards];
      filteredCards.forEach(function(obj){
        if(obj.charName === action.payload.currentPlayerName){
          obj.charInfo = action.payload.notes;
        }
      })

      return {
        ...state,
        currentPlayerName: action.payload.currentPlayerName,
        currentMonsterName: action.payload.currentMonsterName,
        characterInfo: {...state.characterInfo,
                          [action.payload.currentPlayerName]: {
                            ...state.characterInfo[action.payload.currentPlayerName],
                            notes: action.payload.notes ? action.payload.notes : ""
                          }
                      },
        cards: [...filteredCards]
      }
    }
    case 'Card/AddCharacterCardAndDisplayInfoCard' : {

        // new information is added to the array of character character
      var tempArray = [...state.cards];
      let charName = action.payload.charName;
      let charInitiative = action.payload.charInitiative;
      let charInfo = action.payload.charInfo;
      let charHP = action.payload.hp;
      let charAC = action.payload.ac;
      tempArray.push({charName,charInitiative,charInfo, charHP, charAC});
      //sorted in ascending order by initiative
      tempArray.sort(function(a, b){return b.charInitiative - a.charInitiative})
      return{
        ...state,
        cards: [...tempArray],
        count: 0,
        characterInfo: {...state.characterInfo,
                          [action.payload.currentPlayerName]: {
                            ...state.characterInfo[action.payload.currentPlayerName],
                            notes: charInfo ? charInfo : "",
                            hp: charHP ? charHP : "0",
                            ac: charAC ? charAC : "0"
                          }
                        }
            }
    }
    case 'Card/RemoveInfoCard' : {
      return{
        ...state,
        characterInfo: state.characterInfo,
        monsterNames: state.monsterNames,
        currentMonsterName: "not a monster",
        currentPlayerName: "not a player"
      }
    }
    case 'Card/RemoveCharacterCard' : {
      let filteredCards = [];
      if(state.cards == undefined){return state}
      else{
        // new information is added to the array of character character
      filteredCards = state.cards.filter(function(value){
        return (value.charName !== action.payload.charName || value.charInitiative!== action.payload.charInitiative)
      });
      //sorted in ascending order by initiative
      filteredCards.sort(function(a, b){return b.charInitiative - a.charInitiative})
        return {
          ...state,
          cards: filteredCards,
          count: 0
        }
      }
    }
    case 'Card/AddHP':{
      let filteredCards = [...state.cards];
      filteredCards.forEach(function(card){
        if(card.charName === action.payload.charName){
          card.charHP = action.payload.hp;
        }
      })
      return{
        ...state,
        characterInfo: {...state.characterInfo,
                          [action.payload.charName]: {
                            ...state.characterInfo[action.payload.charName],
                            hp: action.payload.hp
                          }
                        }
      }
    }
    case 'Card/AddAC':{
      let filteredCards = [...state.cards];
      filteredCards.forEach(function(card){
        if(card.charName === action.payload.charName){
          card.charAC = action.payload.ac;
        }
      })
      return{
        ...state,
        characterInfo: {...state.characterInfo,
                          [action.payload.charName]: {
                            ...state.characterInfo[action.payload.charName],
                            ac: action.payload.ac
                          }
                        }
      }
    }
    case 'Order/ChangeCount' : {
      return{
        ...state,
        count: action.payload.count
      }
    }
    case 'Order/IncrementCount' : {
      let newCount = state.count;
      ++newCount;
      if(newCount > state.cards.length){
        newCount = state.cards.length;
      }
      return {
        ...state,
        count: newCount
      }
    }
    case 'Order/DecrementCount' : {
      let newCount = state.count;
      --newCount;
      if(newCount < 1){
        newCount = 1;
      }
      return {
        ...state,
        count: newCount
      }
    }
    case 'Cards/DeleteAll' : {
      var tempArr = [...state.cards]
      tempArr.length = 0;
      return{
        ...state,
        cards: [...tempArr]
      }
    }
    default:{
      return state;
    }
  }
}
