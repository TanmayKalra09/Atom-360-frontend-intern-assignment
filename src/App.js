import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';  // Make sure this line is included

import Dashboard from './elements/Dashboard';
import Tables from './elements/Tables';
import './App.css';
import Sidebar from './elements/Sidebar';

const App = () => {
  return (
    
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/tables' element={<Tables/>}/>

      </Routes>
    </Router>
  );
}

export default App;