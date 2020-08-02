import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import { Fab } from "@material-ui/core";
import { Zoom } from "@material-ui/core";

function CreateArea(props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [image, setImage] = useState({
    title: "",
    description: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setImage(prevData => {
      return {
        ...prevData,
        [name]: value
      };
    });
  }

  return (
    <div>
      <form action="/" encType="multipart/form-data" method="post">
        {isExpanded && (
          <input
            value={image.title}
            name="title"
            placeholder="Title"
            onChange={handleChange}
          />
        )}
        <textarea
          value={image.description}
          name="description"
          placeholder="Take a image..."
          rows={isExpanded ? "3" : "1"}
          onChange={handleChange}
          onClick={() => {
            setIsExpanded(true);
          }}
        />
        {isExpanded &&<input type="file"
       id="image" name="image"
       accept="image/png, image/jpeg"></input>}
        <Zoom in={isExpanded}>
          <Fab
            className="add-button"
            onClick={event => {
              props.onAdd(image);
              setImage({
                title: "",
                description: ""
              });
              setIsExpanded(false);
              event.preventDefault();
            }}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
