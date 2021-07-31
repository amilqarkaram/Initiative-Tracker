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
  const [tempValue, setTempValue] = React.useState({
    hp: "",
    ac: "",
    dt: ""
  })
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
    handleUpDownClick(type,"addition",1);
  }
  function downClick(type,e){
    handleUpDownClick(type,"subtraction",1);
  }
  function handleUpDownClick(type,operation,extraNum){
    let hp = characterInfo[props.charName]?.hp ? characterInfo[props.charName]?.hp : 0;
    let ac = characterInfo[props.charName]?.ac ? characterInfo[props.charName]?.ac : 0;
    let dt = characterInfo[props.charName]?.dt ? characterInfo[props.charName]?.dt : 0;
    if(type === "hp"){
      if(operation === "addition"){
        let newNum = String(Number(hp) + extraNum);
        if(isProperLength(newNum)){
          dispatchers.DispatchHP(props.charName,newNum);
          restrictNumInput(type, newNum);
        }
      }
      else if(operation === "subtraction"){
          let newNum = String(Number(hp) - extraNum);
          if(isProperLength(newNum)){
            dispatchers.DispatchHP(props.charName,newNum);
            restrictNumInput(type, newNum);
          }
    }
  }
  if(type === "ac"){
    if(operation === "addition"){
      let newNum = String(Number(ac) + extraNum);
      if(isProperLength(newNum)){
        dispatchers.DispatchAC(props.charName,newNum);
        restrictNumInput(type, newNum);
      }
    }
    else if(operation === "subtraction"){
        let newNum = String(Number(ac) - extraNum);
        if(isProperLength(newNum)){
          dispatchers.DispatchAC(props.charName,newNum);
          restrictNumInput(type, newNum);
        }
  }
}
if(type === "dt"){
  if(operation === "addition"){
    let newNum = String(Number(dt) + extraNum);
    if(isProperLength(newNum)){
      dispatchers.DispatchDT(props.charName,newNum);
      restrictNumInput(type, newNum);
    }
  }
  else if(operation === "subtraction"){
      let newNum = String(Number(dt) - extraNum);
      if(isProperLength(newNum)){
        dispatchers.DispatchDT(props.charName,newNum);
        restrictNumInput(type, newNum);
      }
}
}

}
  function calculator(type,operation,extraNum){
    let _extraNum = extraNum;
    if(_extraNum[0] === '-' || _extraNum[0] === '+'){
      _extraNum = _extraNum.slice(1,_extraNum.length);
    }
    let tempNum = null;
    let baseNum = null;
    switch(type){
      case "hp":
        baseNum = tempValue?.hp ? tempValue.hp : 0;
        if(operation === "addition"){
          tempNum = (Number(baseNum) + Number(_extraNum));
        }
        else if(operation === "subtraction"){
          tempNum = (Number(baseNum) - Number(_extraNum));
        }
        break;
      case "ac":
        baseNum = tempValue?.ac ? tempValue.ac : 0;
        if(operation === "addition"){
          tempNum = (Number(baseNum) + Number(_extraNum));
        }
        else if(operation === "subtraction"){
          tempNum = (Number(baseNum) - Number(_extraNum));
        }
        break;
      case "dt":
        baseNum = tempValue?.dt ? tempValue.dt : 0;
        if(operation === "addition"){
          tempNum = (Number(baseNum) + Number(_extraNum));
        }
        else if(operation === "subtraction"){
          tempNum = (Number(baseNum) - Number(_extraNum));
        }
        break;
      default:
        baseNum = tempValue?.hp ? tempValue.hp : 0;
        if(operation === "addition"){
          tempNum = (Number(baseNum) + Number(_extraNum));
        }
        else if(operation === "subtraction"){
          tempNum = (Number(baseNum) - Number(_extraNum));
        }
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
  function subtractNumbers(typ,extraNumber){}
  function handleFocus(type, e){
      switch(type){
        case "hp":
          setTempValue(function(currentState){
            return{
              ...currentState,
              hp: e.target.value
            }
          });
          dispatchers.DispatchHP(props.charName, "");
          break;
        case "ac":
          setTempValue(function(currentState){
            return{
              ...currentState,
              ac: e.target.value
            }
          });
          dispatchers.DispatchAC(props.charName, "");
          break;
        case "dt":
          setTempValue(function(currentState){
            return{
              ...currentState,
              dt: e.target.value
            }
          });
          dispatchers.DispatchDT(props.charName,"");
          break;
        default:
          setTempValue(function(currentState){
            return{
              ...currentState,
              hp: e.target.value
            }
          });
          dispatchers.DispatchHP(props.charName,"");
      }

  }
  function handleDynamicInputChange(type,value){
    if(value[0] === '+'){
      calculator(type,"addition",value)
    }
    else if(value[0] === '-'){
      calculator(type,"subtraction",value)
    }
    else{
      switch(type){
        case "hp":
          if(characterInfo[props.charName]?.hp === ""){
            dispatchers.DispatchHP(props.charName, tempValue.hp);
          }
          break;
        case "ac":
          if(characterInfo[props.charName]?.ac === ""){
            dispatchers.DispatchAC(props.charName, tempValue.ac);
          }
          break;
        case "dt":
          if(characterInfo[props.charName]?.dt === ""){
            dispatchers.DispatchDT(props.charName, tempValue.dt);
          }
          break;
        default:
          if(characterInfo[props.charName]?.hp === ""){
            dispatchers.DispatchHP(props.charName, tempValue.hp);
          }
      }
  }

}
function handleBlur(type,e){
  handleDynamicInputChange(type, e.target.value)
}
function handleKeyUp(type, e){
  if(e.charCode === 13){
    //handleDynamicInputChange(type,e.target.value)
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
    <input value={characterInfo[props.charName]?.hp} onKeyUp={(e) => handleKeyUp("hp",e)} onChange={(e)=>handleChange("hp",e)} onBlur={(e) => handleBlur("hp",e)} onFocus={(e) => handleFocus("hp",e)}style={{width: inputWidth["hpWidth"]}} className= "inputStyle" min="1" max="24" step="1"  />
    <FontAwesomeIcon icon={faArrowAltCircleDown} onClick={(e)=> downClick("hp",e)} className="downArrow"/>
    </div>
    <div className="ACBubble" >
    <i class="far fa-arrow-alt-circle-up"></i>
    <FontAwesomeIcon icon={faArrowAltCircleUp} onClick={(e)=> upClick("ac",e)} className="upArrow"/>
    <input value={characterInfo[props.charName]?.ac} onKeyUp={(e) => handleKeyUp("ac",e)} onChange={(e)=>handleChange("ac",e)} onBlur={(e) => handleBlur("ac",e)} onClick={(e) => handleFocus("ac",e)} style={{width: inputWidth["acWidth"]}} className= "inputStyle" min="1" max="24" step="1"  />
    <FontAwesomeIcon icon={faArrowAltCircleDown} onClick={(e)=> downClick("ac",e)} className="downArrow"/>
    </div>
    <div className="DTBubble" >
    <i class="far fa-arrow-alt-circle-up"></i>
    <FontAwesomeIcon icon={faArrowAltCircleUp} onClick={(e)=> upClick("dt",e)} className="upArrow"/>
    <input value={characterInfo[props.charName]?.dt} onKeyUp={(e) => handleKeyUp("dt",e)} onChange={(e)=>handleChange("dt",e)} onBlur={(e) => handleBlur("dt",e)} onClick={(e) => handleFocus("dt",e)} style={{width: inputWidth["dtWidth"]}} className= "inputStyle" min="1" max="24" step="1"  />
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
