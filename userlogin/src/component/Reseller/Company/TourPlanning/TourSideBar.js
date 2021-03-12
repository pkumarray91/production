import React, {Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCar,  faThumbtack,faTruck,faMotorcycle} from '@fortawesome/free-solid-svg-icons';
import { IconContext } from 'react-icons';
import {faUpload,faPlus,faEye,faTrash, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import L from "leaflet";
import { Button, Popover, Overlay,OverlayTrigger } from 'react-bootstrap';

import { Link } from 'react-router-dom';
//import './Map.css'
import '../../../../css/SideBar.css'

class TourSideBar extends Component {
  constructor(props) {
    super(props);
     this.state = {
     tour_name: [],
     isShown: false
    };
}

 popover = (tour) => (

    <Popover
    onMouseOver={() =>this.setState({isShown:true })}
    onMouseLeave={() =>this.setState({isShown:false }) } style={{'margin': '-20px 0px'}}>
      <Popover.Content>
        <div className="container">
          <div className="row optionspopup">
            <div className="col-lg-12 col-md-12" onClick={()=>{this.props.editTour(tour)}} >
              <h6 style={{'fontSize': '12px'}}>Edit Tour</h6>
            </div>
          </div>
          <div className="row optionspopup">
            <div className="col-lg-12 col-md-12">
            <h6 style={{'fontSize': '12px'}} onClick={()=>{if(window.confirm('Are you sure to delete this Tour?')){this.props.deleteCreate(tour.id)};}}>Delete Tour</h6>
            </div>
          </div>
          <div className="row ">
             <div className="col-lg-12 col-md-12" onClick={()=> this.props.openAllocateTour(tour)}>
               <h6 style={{'fontSize': '12px'}}>Allocate Tour</h6>
             </div>
          </div>
        </div>
      </Popover.Content>
    </Popover>
  );
  render() {

    var sidebarClass = this.props.isOpen ? "sidebar open" : "sidebar";
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

             <div className="collapase-box" >
             <div className="row">
                <div className="col-md-12" style={{'cursor':'pointer'}} onClick={()=> this.props.openCreateTour()}>
                    <p className="new">+New</p>
                </div>
               { /*<div className="col-md-6" style={{'cursor':'pointer'}} onClick={()=> this.props.newAllocateTour()}>
                    <p className="new">Allocate</p>
                </div>*/}
             </div>
            </div>
            <div className="scrollarea">
                {
                   this.props.tourData.map((tour) =>(
                <div>
                <div className="row seperator side-details">
                    <div className="col-lg-2" >
                    <img src={process.env.PUBLIC_URL + '/Elements/Tour.svg'} style={{'width':'22px'}}/>
                    </div>
                    <div className="col-lg-7">
                       <p>{tour.tour_name}</p>
                    </div>
                    <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={this.popover(tour)}>
                    <div className="col-lg-2" >
                    <FontAwesomeIcon icon={faEllipsisV}/>
                    </div></OverlayTrigger>
                </div>
            </div>))}
        </div>
        </div>
      </div>
    );
  }
}
export default TourSideBar;