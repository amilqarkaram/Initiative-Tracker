import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'



function HPBubble(props){
  const [inputWidth, setInputWidth] = React.useState("17px");
  const [inputValue, setInputValue] = React.useState(0);
  function isProperLength(value){
    if(String(value).length > 3){
      return false;
    }
    else return true;
  }
  function handleChange(e){
    if(isProperLength(e.target.value)){
      setInputValue(e.target.value)
    }
  }
  React.useEffect(function(){
    restrictNumInput();
  },[inputValue]);
  function upClick(e){
    let tempNum = Number(inputValue) + 1;
    if(isProperLength(tempNum)){
      setInputValue(tempNum);
    }

  }
  function downClick(e){
    let tempNum = Number(inputValue) - 1;
    if(isProperLength(tempNum)){
      setInputValue(tempNum);
    }

  }
  function restrictNumInput(){
    switch(String(inputValue).length){
      case 1:
          setInputWidth("17px")
        break;
      case 2:
          setInputWidth("28px");
        break;
      case 3:
          setInputWidth("40px");
        break;
      default:
        setInputWidth("17px");
    }

  }
  return(
    <div className={props.className}>
    <i class="far fa-arrow-alt-circle-up"></i>
    <FontAwesomeIcon icon={faArrowAltCircleUp} onClick={upClick} className="upArrow"/>
    <input value={inputValue} onChange={handleChange} style={{width: inputWidth}} className= "inputStyle" min="1" max="24" step="1"  />
    <FontAwesomeIcon icon={faArrowAltCircleDown} onClick={downClick} className="downArrow"/>
    </div>
  );
}

export default HPBubble;
