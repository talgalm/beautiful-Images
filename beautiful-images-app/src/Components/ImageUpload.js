import { React, useState, useEffect } from 'react';
import { storage } from "../Firebase/FirebaseActions";
import { listAll, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const ImageUpload = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imgaeList, setImageList] = useState([]);
  
  const imageListRef = ref(storage, "images/");
  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageList((prevImageList) => [...prevImageList, url]);
        alert("Image uploaded successfully");

      })
    
    });
  }

  useEffect(() => {
    listAll(imageListRef).then((response) => {
      console.log(response);
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageList((prevImageList) => [...prevImageList, url]);
        });
      });
    });
  }, []);

  return (
    <div>
      <h1>Image Upload Page</h1>

      <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>

      <button onClick={uploadImage}> Upload Image </button>

      <div>
        {imgaeList.map((image) => {
          console.log("aaaa");
          return <img src={image} alt="uploaded" width="300px" margin="10px"/>;
        })}
      </div>


      </div>
  );
}

export default ImageUpload;