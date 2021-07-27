import dispatchers from './dispatchers'
const axios = require("axios");

function handleGoogleSave(googleData, state){
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


  function handleGoogleRetrieve( googleData, state){
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
        if(response.data !== "no-data"){
          dispatchers.DeleteAll();
          for(let i = 0; i < response.data.length; ++i){
            dispatchers.AddInfo(response.data[i].charName, response.data[i].charInitiative, response.data[i].charInfo, response.data[i].charHP, response.data[i].charAC, response.data[i].charDT);
          }
        }
      });
  }

  export { handleGoogleSave, handleGoogleRetrieve }
