import React from 'react';
import { Link } from 'react-router-dom'; 
import "./Sidebar.css"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Menu</h2>
      </div>
      <ul className="sidebar-links">
        <li>
          <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
        </li>
        <li>
          <Link to="/tables" className="sidebar-link">Table</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;