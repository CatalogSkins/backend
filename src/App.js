import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SkinsList from './components/SkinsList';
import AddSkin from './components/AddSkin';
import EditSkin from './components/EditSkin';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<SkinsList />} />
          <Route path="/add-skin" element={<AddSkin />} />
          <Route path="/edit-skin/:id" element={<EditSkin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
