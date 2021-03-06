import React from 'react'
import { useSelector } from 'react-redux'

function HPACHeader(props){
  const { renderHPAC } = useSelector(state => state);
  if(renderHPAC){
  return(
    <div className="HPACHeader" >

      <div className="HPHeaderDiv">

        <h2 className="HPHeader">HP</h2>

      </div>

      <div className="ACHeaderDiv">

        <h2 className="ACHeader">AC</h2>

      </div>

      <div className="DTHeaderDiv">

        <h2 className="DTHeader">DT</h2>

      </div>

      <div className="redHeaderBlock"/>

      <div className="blueHeaderBlock" />

      <div className="blueHeaderBlockTwo" />

      <div className="greenHeaderBlock" />

    </div>
  )
}
  else return "";
}

export default HPACHeader;
