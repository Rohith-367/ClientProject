import React, {useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {format} from 'date-fns';
import DatePickerImage from './Images/datepickerimage.png';


const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <>
    
      <button className="example-custom-input" onClick={handleClick}>
      <img src={DatePickerImage}/>
        {format(startDate, "dd-MM-yyyy")}
      
      </button>
      {isOpen && (
        <DatePicker selected={startDate} onChange={handleChange} inline />
      )}
      
    </>
  );
};

export default DatePickerComponent;
