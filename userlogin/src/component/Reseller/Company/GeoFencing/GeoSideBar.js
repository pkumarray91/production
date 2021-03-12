import React, {Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUpload,faPlus,faEye,faTrash} from '@fortawesome/free-solid-svg-icons';
import {Modal,OverlayTrigger,Popover} from 'react-bootstrap';
//import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import './GeoSideBar.css'
import Upload from './Upload'
import EditableGeofence from './GeoRightPanel'
class GeoSideBar extends Component {
    constructor(props) {
    super(props);
        this.state = {
        };
    }

handleCreateClick = () => {
    document.getElementById("input_geo_form").reset();
}
handleZoom = (geofence) => {
    this.props.setMapCenterAndZoom(parseFloat(geofence.latitude),parseFloat(geofence.longitude))
    this.props.editGeofence(geofence)
}

handleDelete = (geofenceId) => {
    console.log("delete geofence id : ",geofenceId)
    this.props.deleteGeofence(geofenceId)

}

render() {

    var geosidebarClass = this.props.isOpen ? "geosidebar open" : "geosidebar";
    return (

        <div className={geosidebarClass}>
            <div onClick={this.props.toggleSidebar} className="geosidebar-toggle">
                <img src={this.props.isOpen ? process.env.PUBLIC_URL + '/Elements/left.svg' : process.env.PUBLIC_URL + '/Elements/right.svg'} alt="arrow" />
            </div>
            <div className=" geov-list geoscrollareaht">
                    <form>
                        <input className="geoside-search" placeholder="Search for..."  />
                    </form>
                    <div className="geobreadcum">
                        <div className="">
                            <a href="">SAPAS &gt;</a>
                            <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                            <a href="">Eastzone &gt;</a>
                            <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                            <a href="">Eastwestern</a>
                        </div></div>
                        <div className="row "/*style={{'margin-top':'20px'}}*/ >
                            <div className="col-lg-6 col-md-6 NewUpload" onClick={this.handleCreateClick}><FontAwesomeIcon icon={faPlus}/> New</div>
                            <div className="col-lg-6 col-md-6 " ><Upload createGeofence={this.props.createGeofence}/></div>
                        </div>

                 <div   className="geoscrollarea" /*style={{'margin-top':'40px'}}*/>
                    {this.props.geofences.map((geofence) => (
                        <div>
                            <div className="container">
                                <div className="row geoseperator geoside-details" >
                                    <div className="col-11" >
                                        <div className="row" >
                                            <div className="col-1">
                                                <img src={process.env.PUBLIC_URL + '/Elements/GeoSide.svg'} style={{'width':'24px'}} alt="GeoFence"/>
                                            </div>
                                            <div className="col-9">
                                                <p style = {{'overflow':'hidden','textOverflow': 'ellipsis', 'whiteSpace': 'nowrap'}} onClick={() => this.handleZoom(geofence)}>{geofence.name}</p>
                                            </div>
                                            <div className="col-1 marginlow">
                                                <svg height="20" width="20">
                                                    <circle cx="10" cy="10" r="5" fill={geofence.fillColor} />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-1">
                                            <FontAwesomeIcon icon={faTrash} className="delete" onClick={()=>{if(window.confirm('Are you sure to delete this Geofence?')){this.handleDelete(geofence.id)};}}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        </div>
    );
}
}
export default GeoSideBar;