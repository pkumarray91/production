import React, {Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCar,  faThumbtack,faTruck,faMotorcycle} from '@fortawesome/free-solid-svg-icons';
import { IconContext } from 'react-icons';
import {faUpload,faPlus,faEye,faTrash, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import L from "leaflet";
import { Button, Popover, Overlay,OverlayTrigger } from 'react-bootstrap';
import CompanyUser from './CompanyUser'
import AddDevicetovehicle from './AddDevicetovehicle'
import DeallocateDevice from './DeallocateDevice'
import AddCompanyVehicle from './AddCompanyVehicle'
import { Link } from 'react-router-dom';
import './ResellerSideBar.css'
class ResellerSideBar extends Component {
  constructor(props) {
    super(props);
     this.state = {
     isShown: false,
     modalShow : false
    };
}
updateDetails(){
         this.setState({modalShow : true});
    }
popover = (data,deviceData,deviceList) => (
<Popover id="popover-basic"
    onMouseOver={() =>this.setState({isShown:true })}
    onMouseLeave={() =>this.setState({isShown:false }) } style={{'margin': '-20px 0px'}}>
      <Popover.Content>
        <div className="container">
          <div className="row optionspopup">
            <div className="col-lg-12 col-md-12" >
              <h6 style={{'fontSize': '12px','cursor':'pointer'}}><CompanyUser
                  company_id={data.company}
                 show={this.state.modalShow} onHide={() =>  this.setState({modalShow : false})} />
              </h6>
            </div>
          </div>
          <div className="row optionspopup">
            <div className="col-lg-12 col-md-12" >
              <h6 style={{'fontSize': '12px','cursor':'pointer'}}><AddCompanyVehicle
                 company_id={data.company}
                 deviceList = {deviceList}
                 show={this.state.modalShow} onHide={() =>  this.setState({modalShow : false})} />
              </h6>
            </div>
          </div>
          <div className="row optionspopup">
          <div className="col-lg-12 col-md-12" >
            <h6 style={{'fontSize': '12px','cursor':'pointer'}}><AddDevicetovehicle
                company_id={data.company}
                  deviceList = {deviceList}
               show={this.state.modalShow} onHide={() =>  this.setState({modalShow : false})} />
            </h6>
          </div>
        </div>
        <div className="row optionspopup">
          <div className="col-lg-12 col-md-12" >
            <h6 style={{'fontSize': '12px','cursor':'pointer'}}><DeallocateDevice
               company_id={data.company}
               show={this.state.modalShow} onHide={() =>  this.setState({modalShow : false})} />
            </h6>
          </div>
        </div>
          <div className="row optionspopup">
            <div className="col-lg-12 col-md-12" >
              <h6 style={{'fontSize': '12px'}} onClick={() => this.props.editCompany(data)}>Edit Company</h6>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12">
            <h6 style={{'fontSize': '12px'}} onClick={() => this.props.deleteCompany(data.id)}>Delete Company</h6>
            </div>
          </div>
        </div>
      </Popover.Content>
    </Popover>
);
  render() {
    var sidebarClass = this.props.isOpen ? "resellersidebar open" : "resellersidebar";
    return (
      <div className={sidebarClass}>
        <div onClick={this.props.toggleSidebar} className="sidebar-toggle">
          <img src={this.props.isOpen ? process.env.PUBLIC_URL + '/Elements/left.svg' : process.env.PUBLIC_URL + '/Elements/right.svg'} alt="arrow" />
        </div>
        <div className="v-list ">
            <form>
                <input className="side-search" placeholder="Search for..."  />
            </form>
            <div className="breadcum">
              <div className="">
                <a href="">SAPAS &gt;</a>
                  <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                <a href="">Eastzone &gt;</a>
                  <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                <a href="">Eastwestern</a>
              </div>
            </div>
            <div className="scrollarea">
                {this.props.companyData.map((data,index) =>(
                <div key={index}>
                    <div className="row seperator side-details">
                        <div className="col-lg-9" onClick={() => window.location.href="/LiveTracking"}>
                           <p>{data.company_name}</p>
                        </div>
                        <OverlayTrigger trigger="click" placement="bottom" overlay={this.popover(data,this.props.deviceData,this.props.deviceList)}>
                        <div className="col-lg-2" >
                        <FontAwesomeIcon icon={faEllipsisV}/>
                        </div></OverlayTrigger>
                    </div>
                </div>
                ))}
        </div>
        </div>
      </div>
    );
  }
}
export default ResellerSideBar;
