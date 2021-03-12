import React, {Component,useState} from 'react';
import './Tabs.css'
import { useHistory } from "react-router-dom";
import {Navbar,NavDropdown,Nav,Media} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCog ,faExclamationTriangle,faGasPump,faSignature,faTemperatureLow,faTools,faChartBar,faFileAlt, faVectorSquare, faFileSignature,faRss,faMap, faPlayCircle} from '@fortawesome/free-solid-svg-icons';
function Tabs(){
let router = useHistory()
const {pathname} = router.location
const [key, setKey] = useState('first');
const handleKey = (eventKey) => {
setKey(eventKey);
}

const ActiveStyle = {
   background: '#005383',
    color:"white",
  };
const inActiveStyle = {
    ...ActiveStyle,
    background: '#f0eeef',
    'borderColor': 'transparent',
    'color': '#025480'
  };
  return (

  <div className="tabbg">
  <Navbar collapseOnSelect expand="lg">
{/*  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>*/}
  <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto" activeKey={key} onSelect={handleKey}>
        <form>
         <input className="mb-search side-search tabbg-sec" placeholder="Search for..."  />
        </form>

         <Nav.Item>
             <Nav.Link href="/LiveTracking" eventKey="first">
                  <Media className="tabbg-sec" style={ pathname === '/LiveTracking' ? ActiveStyle : inActiveStyle}><FontAwesomeIcon icon={faRss} className="mr-1 name"/>
                    <Media.Body className=" name"> Live Tracking</Media.Body>
                  </Media>
             </Nav.Link>
         </Nav.Item>

        <Nav.Item>
        <Nav.Link href="/Demo"  eventKey="second">
           <Media className="tabbg-sec" style={ pathname === '/Demo' ? ActiveStyle : inActiveStyle}><FontAwesomeIcon icon={faFileAlt} className="mr-1 name"/>
                <Media.Body className=" name">Reports</Media.Body>
           </Media>
        </Nav.Link>
        </Nav.Item>

        <Nav.Link href="/#">
              <Media className="tabbg-sec" style={ pathname ==='/#' ? ActiveStyle : inActiveStyle} ><FontAwesomeIcon icon={faPlayCircle} className="mr-1 name"/>
                <Media.Body className=" name">Playback</Media.Body>
              </Media>
         </Nav.Link>

        <Nav.Link href="/GeoFencing">
              <Media className="tabbg-sec"  style={ pathname === '/GeoFencing'? ActiveStyle : inActiveStyle}><FontAwesomeIcon icon={faVectorSquare} className="mr-1 name"/>
                <Media.Body className=" name">Geo Fencing</Media.Body>
              </Media>
         </Nav.Link>
         <Nav.Link href="/FuelManagement">
              <Media className="tabbg-sec" style={ pathname === '/Fueldisplay' ? ActiveStyle : inActiveStyle} ><FontAwesomeIcon icon={faGasPump} className="mr-1 name"/>
                <Media.Body className=" name">Fuel Management</Media.Body>
              </Media>
         </Nav.Link>
         <Nav.Link href="/#">
              <Media className="tabbg-sec" style={ pathname === '/#' ? ActiveStyle : inActiveStyle}  ><FontAwesomeIcon icon={faSignature}  className="mr-1 name "/>
                <Media.Body className=" name">Driving Style</Media.Body>
              </Media>
         </Nav.Link>
        <Nav.Link href="/TourPlanning">
              <Media className="tabbg-sec" style={ pathname === '/TourPlanning' ? ActiveStyle : inActiveStyle}><FontAwesomeIcon icon={faFileSignature} className="mr-1 name"/>
                <Media.Body className=" name">Tour Planning</Media.Body>
              </Media>
         </Nav.Link>

        <Nav.Link href="/#">
              <Media className="tabbg-sec"style={ pathname === '/#' ? ActiveStyle : inActiveStyle} ><FontAwesomeIcon icon={faChartBar} className="mr-1 name"/>
                <Media.Body className=" name">Dashboard</Media.Body>
              </Media>
         </Nav.Link>

         <Nav.Link href="/#">
              <Media className="tabbg-sec"style={ pathname === '/#' ? ActiveStyle : inActiveStyle}  ><FontAwesomeIcon icon={faTools} className="mr-1 name"/>
                <Media.Body className=" name">Maintenance</Media.Body>
              </Media>
         </Nav.Link>

         <Nav.Link href="/#">
              <Media className="tabbg-sec"style={ pathname === '/#' ? ActiveStyle : inActiveStyle}  ><FontAwesomeIcon icon={faTemperatureLow} className="mr-1 name"/>
                <Media.Body className=" name">Temperature </Media.Body>
              </Media>
         </Nav.Link>
         <Nav.Link href="/#">
              <Media className="tabbg-sec"style={ pathname === '/#' ? ActiveStyle : inActiveStyle}  ><FontAwesomeIcon icon={faCog} className="mr-1 name"/>
                <Media.Body className=" name">Settings</Media.Body>
              </Media>
         </Nav.Link>
    </Nav>
   </Navbar.Collapse>
</Navbar>
</div>

);
}
export default Tabs;