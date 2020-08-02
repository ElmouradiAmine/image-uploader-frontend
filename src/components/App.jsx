import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Image from "./Image";
import CreateArea from "./CreateArea";

function App() {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => fetchImages());

  function fetchImages() {
    if (loading) {
      console.log("passed");
      const apiUrl = "https://imagix-app-api.herokuapp.com/images";
      fetch(apiUrl)
        .then((reponse) => reponse.json())
        .then((data) => {
          const mappedData = data.images.map((image) => {
            return {
              id: image._id,
              title: image.title,
              description: image.description,
              url: image.url,
            };
          });
          setImageList([...mappedData]);
          console.log(imageList);
          setLoading(false);
        });
    }
  }

  function addImage(image) {
    const formData = new FormData();
    const fileField = document.querySelector('input[type="file"]');
    formData.append("title", image.title);
    formData.append("description", image.description);
    formData.append("image", fileField.files[0]);
    const url = "https://imagix-app-api.herokuapp.com/images";
    fetch(url, {
      method: "POST",
      body: formData,
    }).then((reponse) => reponse.json()).then((result) => {
      console.log(result);
      setImageList(prevData => [...prevData,{
        id:result.imageCreated._id,
        url: result.imageCreated.url,
        title:  result.imageCreated.title,
        description:  result.imageCreated.description,
      }])
    });
  }

  function deleteImage(id) {
    fetch("https://imagix-app-api.herokuapp.com/images/" + id, {
      method: "DELETE",
    }).then((res) =>
      setImageList((prevData) => {
        return prevData.filter((image) => image.id !== id);
      })
    );
  }

  return (
    <div>
      <Header />
      
      <CreateArea onAdd={addImage} />
      {imageList.map((image, index) => (
        <Image
          id={image.id}
          key={index}
          title={image.title}
          description={image.description}
          url={image.url}
          onDelete={deleteImage}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
