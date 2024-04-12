import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UploadSongPage = () => {
  const [songName, setSongName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct FormData for file upload
    const formData = new FormData();
    formData.append('songName', songName);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    try {
      const response = await fetch('/upload', { // Adjust the URL based on your API endpoint
        method: 'POST',
        body: formData, // Send formData without setting 'Content-Type' header
        // The browser will set the 'Content-Type' to 'multipart/form-data' with the boundary automatically
      });
    

      if (response.ok) {
        const data = response.json();
        console.log('Song uploaded:', data);
        navigate('/profile'); // Adjust the navigation route as needed
        // navigate('/profile'); // Adjust the navigation route as needed
      } else {
        console.error('Upload failed:', response.statusText);
        // Handle the failure case (e.g., stay on the page, show an error message)
      }
    } catch (error) {
      console.error('Error uploading song:', error);
      // Handle the error (e.g., showing an error message to the user)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="songName">Song Name:</label>
        <input type="text" id="songName" value={songName} onChange={(e) => setSongName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label htmlFor="file">File:</label>
        <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
      </div>
      <button type="submit">Upload Song</button>
    </form>
  );
};

export default UploadSongPage;
