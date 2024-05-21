import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const handleUpload = () => {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:3000/upload', formData)
      .then(res => { console.log(res); })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios.get('http://localhost:3000/getImage')
      .then(res => {
        if (res.data.length > 0) {
          setImage(res.data[0].image);
        }
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <div>
        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        <button onClick={handleUpload}>Upload</button>
        <br />
        {image && <img src={`http://localhost:3000/Images/${image}`} alt='' />}
      </div>
    </>
  );
}

export default App;
