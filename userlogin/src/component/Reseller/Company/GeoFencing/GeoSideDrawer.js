import React, {Component} from 'react';
import GeoMap from './GeoMap';
import GeoSideBar from './GeoSideBar';
import GeoRightPanel from './GeoRightPanel'
import './GeoSideBar.css'
import axios from 'axios'
const google = window.google
const base_url ='http://140.238.84.255:8000'

class GeoSideDrawer extends Component {
    constructor(props) {
    super(props);
        this.state = {
            geofences: [],
            latitude : 22.668460,
            longitude : 79.494055,
            zoom : 5,
            c_radius : '',
            c_lat: '',
            c_lng : '',
            r_lat1 : '',
            r_lng1 : '',
            r_lat2 : '',
            r_lng2 : '',
            r_lat3 : '',
            r_lng3 : '',
            r_lat4 : '',
            r_lng4 : '',
            fillColor : '#03a9f4',
            geosidebarOpen: true,
            drawingControl : true,
            is_edit : false
        };
        this.mapElement = React.createRef();
        this.rightPanel = React.createRef();
    }
getData(){
    axios.get('http://140.238.84.255:8000/geoFence/list/')
        .then(res => {
        var data = res.data;
        this.setState({geofences:data});
        console.log("gggggg : ",this.state.geofences)
        })
    .catch(err => {})
}

componentDidMount() {
    this.getData()
}

handleViewSidebar = () =>
    this.setState({ geosidebarOpen: !this.state.geosidebarOpen });
setMapCenterAndZoom = (latitude,longitude) => {
    this.mapElement.current.setState({zoom:17,latitude : latitude,longitude : longitude});
    console.log("geo side drawer lat : ",this.state.latitude)
}
circleCoordinates = (c_radius,c_lat,c_lng) => {
    this.setState({c_radius : c_radius ,c_lat : c_lat,c_lng : c_lng})
    this.rightPanel.current.setState({c_radius : c_radius ,c_lat : c_lat,c_lng : c_lng})
}
rectangleCoordinates  = ( r_lat1, r_lng1,r_lat2,r_lng2,r_lat3,r_lng3,r_lat4,r_lng4) => {
    this.setState({r_lat1 :r_lat1 , r_lng1 : r_lng1,r_lat2 : r_lat2,r_lng2 : r_lng2,r_lat3 : r_lat3,r_lng3 : r_lng3,r_lat4 :r_lat4,r_lng4 :r_lng4})
    this.rightPanel.current.setState({r_lat1 :r_lat1 , r_lng1 : r_lng1,r_lat2 : r_lat2,r_lng2 : r_lng2,r_lat3 : r_lat3,r_lng3 : r_lng3,r_lat4 :r_lat4,r_lng4 :r_lng4})
}
changeColor = (fillColor) =>{
    this.setState({fillColor : fillColor})
    this.mapElement.current.setState({fillColor : fillColor})
}
changeDrawingControl = () => {
    this.setState({drawingControl : false})
}
editGeofence = (geofence) => {
    this.setState({is_edit : true})
    this.setState({drawingControl : false})
    this.setState({
        c_radius : geofence.c_radius,c_lat: geofence.c_lat,c_lng : geofence.c_lng,
        r_lat1 : geofence.r_lat1,r_lng1 : geofence.r_lng1,r_lat2 : geofence.r_lat2,
        r_lng2 : geofence.r_lng2,r_lat3 : geofence.r_lat3,r_lng3 : geofence.r_lng3,r_lat4 : geofence.r_lat4,
        r_lng4 : geofence.r_lng4,fillColor : geofence.fillColor
    })
    this.rightPanel.current.setState({id : geofence.id,name : geofence.name,location : geofence.location,description : geofence.description,
    latitude : geofence.latitude,longitude : geofence.longitude,})
}
createGeofence = (geofence) => {
    fetch('http://140.238.84.255:8000/geoFence/list/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(geofence),
    })
    .then(response => {response.json();alert("Geofence created successfully!!"); this.getData()})
    .then(geofence => {
        this.setState({data: this.state.geofences.concat([geofence])});
    })
    .catch(error => {
    console.log(error)
    })
    this.setState({zoom : 5})
    this.setState({fillColor : ''})
    this.setState({drawingControl : true})
}

updateGeofence = (newGeofence) => {
    fetch(`${base_url}/geoFence/list/${newGeofence.id}/`, {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGeofence),
    })
    .then(newGeofence => {
        const newGeofences = this.state.geofences.map(geofence => {
        if(geofence.id === newGeofence.id) {
        return Object.assign({}, newGeofence)
        } else {
        return geofence;
        }
        });
        this.setState({geofences: newGeofences});
        alert("Geofence edited successfully!!");
        this.getData()
    })
    .catch(error => {
        console.log(error)
    })
    this.setState({is_edit : false})
}
deleteGeofence = (geofenceId) => {
	fetch(`${base_url}/geoFence/list/${geofenceId}/`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		.then(() => {
			this.setState({geofences: this.state.geofences.filter(geofence => geofence.id !== geofenceId)})
			alert("Geofence deleted successfully!!");
			this.getData()
		})
		 .catch(error => {
        console.log(error)
    })
}
render() {
    return(
        <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-2">
                        <GeoSideBar
                            createGeofence={this.createGeofence}
                            isOpen={this.state.geosidebarOpen}
                            toggleSidebar={this.handleViewSidebar}
                            geofences={this.state.geofences}
                            onUpdateClick={this.updateGeofence}
                            setMapCenterAndZoom={this.setMapCenterAndZoom}
                            editGeofence = {this.editGeofence}
                            deleteGeofence = {this.deleteGeofence}
                        />
                    </div>
                    <div className="col-lg-8">
                        <GeoMap
                            isOpen={this.state.geosidebarOpen}
                            geofences={this.state.geofences}
                            latitude={this.state.latitude}
                            longitude={this.state.longitude}
                            zoom = {this.state.zoom}
                            fillColor = {this.state.fillColor}
                            ref={this.mapElement}
                            circleCoordinates={this.circleCoordinates}
                            rectangleCoordinates={this.rectangleCoordinates}
                            fillColor = {this.state.fillColor}
                            drawingControl = {this.state.drawingControl}
                            changeDrawingControl = {this.changeDrawingControl}
                            is_edit={this.state.is_edit}
                        />
                    </div>
                </div>
                    <div>
                        <GeoRightPanel
                            createGeofence={this.createGeofence}
                            updateGeofence={this.updateGeofence}
                            geofences={this.state.geofences}
                            modMap={this.setMapCenterAndZoom}
                            ref={this.rightPanel}
                            fillColor = {this.state.fillColor}
                            changeColor={this.changeColor}
                            c_radius = {this.state.c_radius}
                            c_lat = {this.state.c_lat}
                            c_lng = {this.state.c_lng}
                            r_lat1 ={this.state.r_lat1}
                            r_lng1={this.state.r_lng1}
                            r_lat2 ={this.state.r_lat2}
                            r_lng2 ={this.state.r_lng2}
                            r_lat3 ={this.state.r_lat3}
                            r_lng3 ={this.state.r_lng3}
                            r_lat4={this.state.r_lat4}
                            r_lng4 ={this.state.r_lng4}
                            is_edit = {this.state.is_edit}
                        />
                    </div>
            </div>
        </React.Fragment>
    )
  }
}
export default GeoSideDrawer;
