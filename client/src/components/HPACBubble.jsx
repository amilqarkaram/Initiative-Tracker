import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'
import dispatchers from '../utils/dispatchers'
import { useSelector } from 'react-redux'



function HPACBubble(props){
  const [inputWidth, setInputWidth] = React.useState({
    "hpWidth": "17px",
    "acWidth": "17px",
    "dtWidth": "17px"
  });
  const {characterInfo} = useSelector(state => state)

  React.useEffect(function(){
    if(!characterInfo[props.charName]?.ac && !characterInfo[props.charName]?.hp && !characterInfo[props.charName]?.dt){
      dispatchers.DispatchAC(props.charName, "0");
      dispatchers.DispatchHP(props.charName, "0");
      dispatchers.DispatchDT(props.charName,"0");
    }
    else{
      restrictNumInput("ac",characterInfo[props.charName].ac);
      restrictNumInput("hp",characterInfo[props.charName].hp);
      restrictNumInput("dt",characterInfo[props.charName].dt);
    }
    dispatchers.RenderHPAC();
  },[props.charName])
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
      else if (type === "dt")
      dispatchers.DispatchDT(props.charName, e.target.value)

      restrictNumInput(type, e.target.value);
    }
  }
  function upClick(type,e){
    let tempNum = null;
    switch(type){
      case "hp":
        tempNum = (Number(characterInfo[props.charName]?.hp) + 1);
        break;
      case "ac":
        tempNum =(Number(characterInfo[props.charName]?.ac) + 1);
        break;
      case "dt":
        tempNum = (Number(characterInfo[props.charName]?.dt) + 1);
        break;
      default:
        tempNum = (Number(characterInfo[props.charName]?.hp) + 1);
    }
    if(isProperLength(tempNum)){
      if(type === "hp")
      dispatchers.DispatchHP(props.charName, tempNum);
      else if (type === "ac")
      dispatchers.DispatchAC(props.charName, tempNum);
      else if (type === "dt")
      dispatchers.DispatchDT(props.charName, tempNum)

      restrictNumInput(type, tempNum);
    }

  }
  function downClick(type,e){
    let tempNum = null;
    switch(type){
      case "hp":
        tempNum = (Number(characterInfo[props.charName]?.hp) - 1);
        break;
      case "ac":
        tempNum =(Number(characterInfo[props.charName]?.ac) - 1);
        break;
      case "dt":
        tempNum = (Number(characterInfo[props.charName]?.dt) - 1);
        break;
      default:
        tempNum = (Number(characterInfo[props.charName]?.hp) - 1);
    }
    if(isProperLength(tempNum)){
      if(type === "hp")
      dispatchers.DispatchHP(props.charName,tempNum);
      else if (type === "ac")
      dispatchers.DispatchAC(props.charName,tempNum);
      else if (type === "dt")
      dispatchers.DispatchDT(props.charName, tempNum)

      restrictNumInput(type, tempNum);
    }
  }
  function restrictNumInput(type, num){
    let propertyName = "";
    switch(type){
      case "hp":
        propertyName = "hpWidth";
        break;
      case "ac":
        propertyName = "acWidth"
        break;
      case "dt":
        propertyName = "dtWidth"
        break;
      default:
        propertyName = ""
    }
    let inputValueLength = String(num).length;
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
    <div className="DTBubble" >
    <i class="far fa-arrow-alt-circle-up"></i>
    <FontAwesomeIcon icon={faArrowAltCircleUp} onClick={(e)=> upClick("dt",e)} className="upArrow"/>
    <input value={characterInfo[props.charName]?.dt} onChange={(e)=>handleChange("dt",e)} style={{width: inputWidth["dtWidth"]}} className= "inputStyle" min="1" max="24" step="1"  />
    <FontAwesomeIcon icon={faArrowAltCircleDown} onClick={(e)=> downClick("dt",e)} className="downArrow"/>
    </div>
    <div className="red"/>
    <div className="blue" />
    <div className="blueTwo" />
    <div className="green" />
    </>
  );
}

export default HPACBubble;
