import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SkinsList = () => {
  const [skins, setSkins] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/skins')
      .then(response => setSkins(response.data))
      .catch(error => console.error('Error fetching skins:', error));
  }, []);

  const deleteSkin = (id) => {
    axios.delete(`http://localhost:3000/skins/${id}`)
      .then(() => setSkins(skins.filter(skin => skin._id !== id)))
      .catch(error => console.error('Error deleting skin:', error));
  };

  return (
    <div>
      <h1>Skins List</h1>
      <Link to="/add-skin">Add New Skin</Link>
      <ul>
        {skins.map(skin => (
          <li key={skin._id}>
            <img src={skin.imageUrl} alt={skin.name} width="100" />
            <p>{skin.name}</p>
            <p>{skin.description}</p>
            <p>{skin.price}</p>
            <Link to={`/edit-skin/${skin._id}`}>Edit</Link>
            <button onClick={() => deleteSkin(skin._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkinsList;