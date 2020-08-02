import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
function Image(props) {
  console.log(props.url);
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.description}</p>

      <img src={props.url} alt="img"/>
      <button
        onClick={() => {
          props.onDelete(props.id);
        }}
      >

      
        <DeleteIcon style={{
          color:"red",
          backgroundColor: "transparent"
        }} />
      </button>
    </div>
  );
}

export default Image;
