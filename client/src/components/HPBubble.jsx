import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons'



function HPBubble(props){
  const [inputWidth, setInputWidth] = React.useState("sizeOne");
  function restrictNumInput(e){
    switch(e.target.value.length){
      case 1:
        setInputWidth("17px");
        break;
      case 2:
        setInputWidth("26px");
        break;
      case 3:
        setInputWidth("37px");
        e.preventDefault();
        break;
      default:
        setInputWidth("sizeOne")
    }

  }
  return(
    <div className={props.className}>
    <i class="far fa-arrow-alt-circle-up"></i>
    <FontAwesomeIcon icon={faArrowAltCircleUp} className="upArrow"/>
    <input style={{width: inputWidth}} onKeyPress={restrictNumInput} className= "inputStyle" onChange={restrictNumInput}min="1" max="24" step="1"  />
    <FontAwesomeIcon icon={faArrowAltCircleDown} className="downArrow"/>
    </div>
  );
}

export default HPBubble;
