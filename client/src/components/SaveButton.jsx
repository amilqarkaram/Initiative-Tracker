import React from "react"

export default function saveButton(props){
  return (
    <button handleClick={props.handleSave} className="saveButton btn btn-dark">Save</button>
  )
}
