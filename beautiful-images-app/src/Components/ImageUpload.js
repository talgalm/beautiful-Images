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
      const promises = response.items.map((item) => getDownloadURL(item));
      Promise.all(promises).then((urls) => {
        setImageList(urls);
      });
    });
  }, []);

  return (
    <div>
      <h1>Image Upload Page</h1>

      <input type="file" onChange={(event) => {setImageUpload(event.target.files[0])}}/>

      <button onClick={uploadImage}> Upload Image </button>

      <div>
        {imgaeList.map((image, index) => (
          <img key={index} src={image} alt="uploaded" width="300px" margin="10px" />
        ))}
      </div>
    </div>
  );
}

export default ImageUpload;