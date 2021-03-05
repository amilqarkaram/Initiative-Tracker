import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'

function Header(props){
  const iconStyle = { fontSize: 50, float:"left", padding:5 };
  if(props.windowWidth > 641 && props.windowWidth < 1007){
    iconStyle.fontSize = "70";
    iconStyle.float = "none";
    iconStyle.position = "absolute";
    iconStyle.right = "120vh";
    iconStyle.top = "0";
    iconStyle.visibility = "hidden"
  }
  return(
  <div className="header">
  <div className= "innerHeader">
  <FontAwesomeIcon icon={faDiceD20} style={iconStyle}/>
  <h1>Initiative Tracker</h1>
  </div>
  </div>
);
}

export default Header;
