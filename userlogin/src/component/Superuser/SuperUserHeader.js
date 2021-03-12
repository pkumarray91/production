import React, {Component,useState} from 'react';
//import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPowerOff,faUser,faBell,faExclamationTriangle,faExpandArrowsAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Popover, Overlay,OverlayTrigger } from 'react-bootstrap';

function SuperUserHeader() {
const [isShown, setIsShown] = useState(false);
 const popover = (
    <Popover id="popover-basic"
    onMouseOver={() => setIsShown(false)}
        onMouseLeave={() => setIsShown(false)}>
      <Popover.Content>
        <div className="container">
          <div className="row seperatorpopup">
                <div className="col-lg-6 col-md-6">Name</div>
                <div className="col-lg-6 col-md-6"><strong>Priya Tripathi</strong></div>
          </div>
          <div className="row seperatorpopup">
                <div className="col-lg-6 col-md-6">License No.</div>
                <div className="col-lg-6 col-md-6"><strong>09021996120799</strong></div>
          </div>
          <div className="row">
                <div className="col-lg-6 col-md-6">Expiry Date</div>
                <div className="col-lg-6 col-md-6"><strong>09/Feb/2021</strong></div>
          </div>
        </div>

      </Popover.Content>
    </Popover>
  );

  const handleLogout = () => {
    localStorage.removeItem("token")
       window.location.href="/"

  }
{

return(
<div className="header-top">
<div className="container-fluid">
    <div className="row">
       <div className="col-lg-2 col-md-2 col-sm-2 col-3">
            <img src = {process.env.PUBLIC_URL + '/logoblue.svg' } alt="sapas" className="headerlogo " />
            <strong className="l1">SAPAS Telematics</strong>
       </div>
        <div className="head-search col-lg-3 col-md-3 col-sm-4">
            <form >
                <div className="">
                <input className="header-search" placeholder="Search "   />
                </div>
            </form>
        </div>
        <div className="col-lg-3 col-md-3 col-sm-4 col-9">
            <div className="row">
                <div className="outerblock">
                    <div className="innerblock">
                       <div style={{'color':'#008923'}} className="summarycounter"> 000 </div>
                       <div style={{'color':'#008923'}} className="summarycount"> Moving </div>
                    </div>
                </div>
                <div className="outerblock">
                    <div className="innerblock">
                       <div style={{'color':'#d20000'}} className="summarycounter"> 000 </div>
                       <div style={{'color':'#d20000'}} className="summarycount"> Idle </div>
                    </div>
                </div>
                <div className="outerblock">
                    <div className="innerblock">
                       <div style={{'color':'#d67b23'}} className="summarycounter"> 000 </div>
                       <div style={{'color':'#d67b23'}} className="summarycount"> Parked </div>
                    </div>
                </div>
            </div>
        </div>
         <div className="p2 col-lg-2" >
            <div className="">

            <strong>Welcome Priya Tripathi</strong>
            </div>
         </div>
        <div className="rt-icon col-lg-2 col-md-3 " >
            <div style={{'float':'right'}}>
                <div  className="controls "><FontAwesomeIcon icon={faExclamationTriangle} /></div>
                <div  className="controls "><FontAwesomeIcon icon={faBell} /></div>
                <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
                    <div  className="controls "><FontAwesomeIcon icon={faUser} /></div>
                </OverlayTrigger>
                <div  className="controls " onClick={handleLogout}><FontAwesomeIcon icon={faPowerOff} /></div>
            </div>
        </div>
     </div>
</div>
</div>
  );
}
}
export default SuperUserHeader;
// <div  className="controls "><FontAwesomeIcon icon={faExpandArrowsAlt} /></div>