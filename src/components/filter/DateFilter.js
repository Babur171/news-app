import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const DateFilter = () => {
  const [selectedOption, setSelectedOption] = useState('All');

  const options = [
    'All',
    'Past 24 Hours',
    'Past 7 Days',
    'Past 30 Days',
    'Past 12 Months'
  ];

  return (
      <Dropdown>
	  <h3 style={{fontSize:24}}>Date Filter</h3>
        <Dropdown.Toggle variant="success" id="dropdown-basic" >
          {selectedOption}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {options.map((option, index) => (
            <Dropdown.Item key={index} onClick={() => setSelectedOption(option)}>
              {option}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
  );
};

export default DateFilter;
