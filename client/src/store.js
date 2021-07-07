import {createStore, applyMiddleware} from 'redux'
import rootReducer from './reducer.js'
import axios from 'axios'
import dispatchers from './utils/dispatchers.js'

const fetchInfoFromDBMiddleware = storeAPI => next => action => {
if(action.type === "Card/AddCharacterCardAndDisplayInfoCard"){

  async function getInfo(monsterMachine){
    let info = await monsterMachine;
    return info;
  }

  if(action.payload.charName === ""){
    action.payload.charName="nobody";
  }

  axios.get("/api/" + action.payload.charName).then(function(response){

    getInfo(response.data).then(function(){
      response.data.notes = action.payload.charInfo;
      dispatchers.AddAndDisplayInfoCard(response.data);
      let john = response.data;

    });

  });
}

return next(action);
}
const middlewareEnhancer = applyMiddleware(fetchInfoFromDBMiddleware);

const store = createStore(rootReducer,middlewareEnhancer);

export default store;
