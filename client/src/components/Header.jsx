import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDiceD20 } from '@fortawesome/free-solid-svg-icons'
library.add(faDiceD20);

function Header(props){
  // const iconStyle = { fontSize: "50px", float:"left", padding:"5px" };
  // if(props.windowWidth > 641 && props.windowWidth < 1007){
  //   iconStyle.fontSize = "70px";
  //   iconStyle.float = "none";
  //   iconStyle.position = "absolute";
  //   iconStyle.right = "120vh";
  //   iconStyle.top = "0";
  //   iconStyle.visibility = "hidden"
  // }
  return(
  <div className="header">
  <div className= "innerHeader">
  <FontAwesomeIcon icon={['fas', 'dice-d20']} className="headerIcon"/>
  <h1 className="headerTextStyle">Initiative Tracker <p className="devStage">Alpha</p> </h1>
  </div>
  </div>
);
}

export default Header;
