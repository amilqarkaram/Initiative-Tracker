import dispatchers from './dispatchers'
function handleResize(event, setState){

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
        if(document.querySelector(".nextButton")){
          document.querySelector(".nextButton").click();
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

function handleClick(event){
    dispatchers.ChangeCount(0)
    dispatchers.DisplayInfoCard(event.target.getAttribute("data-id"));
}

function handleNextClick(event){
    dispatchers.ChangeCount(null,"IncrementCount");
}

function handleBackClick(event){
    dispatchers.ChangeCount(null,"DecrementCount");
}
export {handleResize, handlePress, handleClick, handleNextClick,handleBackClick};
