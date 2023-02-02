import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import API from './helpers/Api';

function App() {

  const imageRef = useRef();
  const [image, setImage] = useState(null);
  const [legend, setLegend] = useState('');
  const [list, setList] = useState([]);

  useEffect(() => {
    requestList();
  }, []);

  const requestList = async () => {
    const ApiBase = 'http://127.0.0.1/photoGalleryServer/api/v1';
    axios.get(ApiBase+'/photos')
    .then((res)=>{
        setList(res.data);
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.upload(image, legend);

    imageRef.current.value = null;
    setImage(null);
    setLegend('');

    requestList();
  }

  const handleDelete = async (id, e) => {
    e.preventDefault();

    const ApiBase = 'http://127.0.0.1/photoGalleryServer/api/v1';
    axios.delete(ApiBase+'/photo/'+id+'/delete')
    .then(res => console.log('Deleted!!!', res),requestList()).catch(err => console.log(err))

    requestList();
  }

  return (
    <div className='container'>

      <div className='header'>
        <h1>Send Photo</h1>
        <form onSubmit={handleSubmit}>
          <label className="file">
            <input type="file" name="image" ref={imageRef} onChange={e => setImage(e.target.files[0])}/>
            <span className="file-custom"></span>
          </label>
          <input type="text" name="legend" placeholder="Type a caption" value={legend} onChange={e => setLegend(e.target.value)}></input>
          <button>Submit</button>
        </form>
      </div>
      <div className='gallery'>
      {
        list.map((val)=>{
          const id = `${val.id}`;
          return (
            <div className='pics' key={val.id}>
              <img src={val.img} style={{ width: '100%' }}/>
              <p>{val.legend}</p>
              <div className='pics-bottom'>
                <small>{val.date}</small>
                <button className="btn-delete" onClick={(e) => handleDelete(id, e)}>
                  <span>Delete</span>
                </button>
              </div>
            </div>
          )
        })
      }
      </div>

    </div>
  );
}

export default App;
