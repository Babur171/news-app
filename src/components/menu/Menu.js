import React, { useState } from 'react';
import './Menu.css';

const Menu = ({ active, setActive, setCategory }) => {
  const [menuActive, setMenuActive] = useState(false); // State to control the menu visibility

  const links = [
    { id: 1, name: 'General', value: 'general' },
    { id: 2, name: 'Technology', value: 'technology' },
    { id: 3, name: 'Entertainment', value: 'entertainment' },
    { id: 4, name: 'Science', value: 'science' },
    { id: 5, name: 'Health', value: 'health' },
    { id: 6, name: 'Sports', value: 'sports' },
    { id: 7, name: 'Business', value: 'business' },
  ];

  // Handle menu item click
  const onClick = (id, value) => {
    setActive(id);
    setCategory(value);
    if (window.innerWidth <= 768) {
      setMenuActive(false); // Close the menu on mobile after selecting an item
    }
  };

  return (
    <div className={`menu ${menuActive ? 'active' : ''}`}>
      <ul>
        {links.map((link) => (
          <li
            key={link.id}
            className={active === link.id ? 'active' : 'inactive'}
            onClick={() => onClick(link.id, link.value)}
          >
            {link.name}
          </li>
        ))}
      </ul>
      {/* Hamburger button to toggle menu visibility */}
      <div className="menu-button" onClick={() => setMenuActive(!menuActive)}>
        ☰
      </div>
    </div>
  );
};

export default Menu;
