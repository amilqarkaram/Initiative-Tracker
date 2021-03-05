import React from "react";

function Monster(props) {
  const divStyle = {
    overflowY: "scroll",
    overflowX: "hidden",
    border: "1px solid black",
    borderRadius: "30px",
    width: "300px",
    float: "left",
    height: "75vh",
    position: "relative",
    background: "#F5E5C9",
    boxShadow: "1px 1px 3px black",
    marginTop: "30px"
  };
  let info = props.info;
  console.log(info);
  return (
    <div className="monster">
      <div style={divStyle}>
      <div className="monsterHeader">
        <h1>{info.name}</h1>
        <i>{info.size} {info.type}, {info.alignment}</i>
        </div>
        <img
          alt=""
          src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"
        />
        <table className="monsterTable">
          <tr>
            <td>
              <p>
                <b>Armor Class</b> {info.armor_class}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <b>Hit Points</b> {info.hit_points}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <b>Speed</b> {info.speed.walk},{info.speed.swim !== undefined ? (" swim " + info.speed.swim + ",") : ""}{info.speed.climb !== undefined ? (" climb " + info.speed.climb + ",") : ""}
              </p>
            </td>
          </tr>
        </table>
        <img
          alt=""
          src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"
        />
        <table className="abilityScores">
          <tr>
            <td style={{textAlign:"center"}}>
              <b>STR</b>
            </td>
            <td style={{textAlign:"center"}}>
              <b>DEX</b>
            </td>
            <td style={{textAlign:"center"}}>
              <b>CONT</b>
            </td>
            <td style={{textAlign:"center"}}>
              <b>INT</b>
            </td>
            <td style={{textAlign:"center"}}>
              <b>WIS</b>
            </td>
            <td style={{textAlign:"center"}}>
              <b>CHA</b>
            </td>
          </tr>
          <tr className="stats">
            <td>{info.strength} ({info.strength < 10 ? "-" : "+"}{Math.floor((parseInt(info.strength) - 10)/2)})</td>
            <td>{info.dexterity}({info.dexterity < 10 ? "" : "+"}{Math.floor((parseInt(info.dexterity) - 10)/2)})</td>
            <td>{info.constitution}({info.constitution < 10 ? "-" : "+"}{Math.floor((parseInt(info.constitution) - 10)/2)})</td>
            <td>{info.intelligence}({info.intelligence < 10 ? "-" : "+"}{Math.floor((parseInt(info.intelligence) - 10)/2)})</td>
            <td>{info.wisdom}({info.wisdom < 10 ? "-" : "+"}{Math.floor((parseInt(info.wisdom) - 10)/2)})</td>
            <td>{info.charisma}({info.charisma < 10 ? "-" : "+"}{Math.floor((parseInt(info.charisma) - 10)/2)})</td>
          </tr>
        </table>
        <img
          alt=""
          src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"
        />
        <table>
          <tr>
            <td>
              <p>
                <b>Challenge</b> {info.challenge_rating} ({info.xp} XP)
              </p>
            </td>
          </tr>
          <tr>
            <p>
              <b>Saving Throws</b> {info.savingThrows.map((element)=>(element + ", "))}
            </p>
          </tr>
          <tr>
            <td>
              <p>
                <b>Skills</b> {info.skills.map((element)=>(element + " "))}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <b>Senses</b> {Object.keys(info.senses).map(function(keyName, keyIndex) {
                  let name = keyName;
                  if(keyName.includes("_")){
                    name = keyName.replace("_"," ") ;
                  }
                  return (name + ": " + info.senses[keyName] + ", ");
                  })}
              </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>
                <b>Languages</b> {info.languages}
              </p>
            </td>
          </tr>
        </table>
        <img
          alt=""
          src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"
        />
        <table>
          <th>
            <b>{info.special_abilities !== undefined? "Special Abilities" : ""}</b>
          </th>
          <tr>
            {info.special_abilities !== undefined ? info.special_abilities.map((element)=>{
              return(
              <p>
              <b> {element.name}</b> {element.desc}
              <br />
              </p>
            )
          }) : ""}
          </tr>
        </table>
        <table>
          <th>
            <img
              alt=""
              src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"
            />
            <b>Actions</b>
          </th>
          <tr>
          {info.actions.map((element)=>{
            return(
            <p>
            <b> {element.name}</b> {element.desc}
            <br />
            </p>
          )
          })}
          </tr>
        </table>
        <table>
          <th>
            <img
              alt=""
              src="https://media-waterdeep.cursecdn.com/file-attachments/0/579/stat-block-header-bar.svg"
            />
            <b>{info.legendary_actions !==undefined ? "Legendary Actions" : ""}</b>
          </th>
          <tr>
          {info.legendary_actions !== undefined ? info.legendary_actions.map((element)=>{
            return(
            <p>
            <b> {element.name}</b> {element.desc}
            <br />
            </p>
          )
        }) : ""}
          </tr>
        </table>
      </div>
    </div>
  );
}

export default Monster;
