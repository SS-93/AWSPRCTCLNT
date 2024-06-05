import React, { useState } from 'react';

async function postImage({ image, description }) {
  const formData = new FormData();
  formData.append("image", image);
  formData.append("description", description);

  try {
    const response = await fetch('http://localhost:8080/images', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

function FileInputTest() {
  const [file, setFile] = useState();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const submit = async event => {
    event.preventDefault();
    try {
      const result = await postImage({ image: file, description });
      setImages([result.image, ...images]);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  const fileSelected = event => {
    const file = event.target.files[0];
    setFile(file);
  }

  return (
    <div>
      <h1>File Input Test</h1>
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*" />
        <input value={description} onChange={e => setDescription(e.target.value)} type="text" />
        <button type="submit">Submit</button>
      </form>

      {images.map(image => (
        <div key={image}>
          <img src={image} alt="Uploaded" />
        </div>
      ))}
    </div>
  );
}

export default FileInputTest;
