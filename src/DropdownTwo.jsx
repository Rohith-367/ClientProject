import Dropdown from 'react-bootstrap/Dropdown';
import Avatar from './Images/avatar.png';

function DropdownMenuTwo() {
  return (
    <>
   

    <div style={{display:"flex", marginLeft:"50px", marginRight: "60px"}}
>

      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          <img src={Avatar} style={{width: "20px", height: "20px"}} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </div>
      </>
  );
}

export default DropdownMenuTwo;
