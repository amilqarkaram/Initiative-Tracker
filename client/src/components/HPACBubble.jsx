import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'
import dispatchers from '../utils/dispatchers'
import { useSelector } from 'react-redux'



function HPACBubble(props){
  const [inputWidth, setInputWidth] = React.useState({
    "hpWidth": "17px",
    "acWidth": "17px"
  });
  const {characterInfo} = useSelector(state => state)

  React.useEffect(function(){
    if(!characterInfo[props.charName]?.ac && !characterInfo[props.charName]?.hp){
      dispatchers.DispatchAC(props.charName, "0");
      dispatchers.DispatchHP(props.charName, "0");
    }
    else{
      restrictNumInput("ac",characterInfo[props.charName].ac);
      restrictNumInput("hp",characterInfo[props.charName].hp);
    }
  },[])
  function isProperLength(value){
    if(String(value).length > 3){
      return false;
    }
    else return true;
  }
  function handleChange(type,e){
    if(isProperLength(e.target.value)){
      if(type === "hp")
      dispatchers.DispatchHP(props.charName, e.target.value);
      else if (type === "ac")
      dispatchers.DispatchAC(props.charName, e.target.value);

      restrictNumInput(type, e.target.value);
    }
  }
  function upClick(type,e){
    let tempNum = type === "hp" ? (Number(characterInfo[props.charName]?.hp) + 1) : (Number(characterInfo[props.charName]?.ac) + 1);
    if(isProperLength(tempNum)){
      if(type === "hp")
      dispatchers.DispatchHP(props.charName, tempNum);
      else if (type === "ac")
      dispatchers.DispatchAC(props.charName, tempNum);

      restrictNumInput(type, tempNum);
    }

  }
  function downClick(type,e){
    let tempNum = type === "hp" ? (Number(characterInfo[props.charName]?.hp) - 1) : (Number(characterInfo[props.charName]?.ac) - 1);
    if(isProperLength(tempNum)){
      if(type === "hp")
      dispatchers.DispatchHP(props.charName,tempNum);
      else if (type === "ac")
      dispatchers.DispatchAC(props.charName,tempNum);

      restrictNumInput(type, tempNum);
    }
  }
  function restrictNumInput(type, num){
    let propertyName = type === "hp" ? "hpWidth" : "acWidth";
    let inputValueLength = type === "hp" ? String(num).length : String(num).length;
    switch(inputValueLength){
      case 1:
          setInputWidth(function(currentState){
            return {
              ...currentState,
              [propertyName] : "17px"
            }
          })
        break;
      case 2:
      setInputWidth(function(currentState){
        return {
          ...currentState,
          [propertyName] : "27px"
        }
      })
        break;
      case 3:
      setInputWidth(function(currentState){
        return {
          ...currentState,
          [propertyName] : "37px"
        }
      })
        break;
      default:
      setInputWidth(function(currentState){
        return {
          ...currentState,
          [propertyName] : "17px"
        }
      })
    }

  }
  return(
    <>
    <div className="HPBubble">
    <i class="far fa-arrow-alt-circle-up"></i>
    <FontAwesomeIcon icon={faArrowAltCircleUp} onClick={(e)=> upClick("hp",e)} className="upArrow"/>
    <input value={characterInfo[props.charName]?.hp} onChange={(e)=>handleChange("hp",e)} style={{width: inputWidth["hpWidth"]}} className= "inputStyle" min="1" max="24" step="1"  />
    <FontAwesomeIcon icon={faArrowAltCircleDown} onClick={(e)=> downClick("hp",e)} className="downArrow"/>
    </div>
    <div className="ACBubble" >
    <i class="far fa-arrow-alt-circle-up"></i>
    <FontAwesomeIcon icon={faArrowAltCircleUp} onClick={(e)=> upClick("ac",e)} className="upArrow"/>
    <input value={characterInfo[props.charName]?.ac} onChange={(e)=>handleChange("ac",e)} style={{width: inputWidth["acWidth"]}} className= "inputStyle" min="1" max="24" step="1"  />
    <FontAwesomeIcon icon={faArrowAltCircleDown} onClick={(e)=> downClick("ac",e)} className="downArrow"/>
    </div>
    <div className="red"/>
    <div className="blue" />
    </>
  );
}

export default HPACBubble;
