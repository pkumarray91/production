import React, { useState,useEffect,Component } from "react";
import { withGoogleMap,withScriptjs,GoogleMap} from "react-google-maps";
import './GeoSideBar.css'
import { Circle, Rectangle} from "react-google-maps";
import { DrawingManager } from "react-google-maps/lib/components/drawing/DrawingManager";
const google = window.google;

class GeoMap extends Component {
    constructor(props) {
    super(props);
    this.state = {
        latitude:22.668460,
        longitude:79.494055,
        zoom: 5,
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
        fillColor : '',
    }
}
componentWillReceiveProps(nextProps) {
    this.setState({fillColor : nextProps.fillColor})
    this.setState({drawingControl : nextProps.drawingControl})
 }
onOverlayComplete = (event) =>{
    if (event.type === 'circle') {
        this.props.changeDrawingControl();
        var radius = event.overlay.getRadius();
        var latitude = event.overlay.getCenter().lat();
        var longitude = event.overlay.getCenter().lng();
        this.setState({c_radius : radius,c_lat:latitude,c_lng:longitude})
        this.props.circleCoordinates(this.state.c_radius,this.state.c_lat,this.state.c_lng)
        console.log("c_radius : ",this.state.c_radius)
        console.log("radius : ",radius)
        console.log('lat', latitude);
        console.log('lng', longitude);
    }
    if (event.type === 'rectangle') {
        this.props.changeDrawingControl();
        var bounds = event.overlay.getBounds();
        var NE = bounds.getNorthEast();
        var SW = bounds.getSouthWest();
        this.setState({r_lat1 : NE.lat(),r_lng1 : NE.lng(),
        r_lat2 : NE.lat(),r_lng2 : SW.lng(),
        r_lat3 : SW.lat(),r_lng3 : SW.lng(),
        r_lat4 : SW.lat(),r_lng4 : NE.lng()})
        this.props.rectangleCoordinates(this.state.r_lat1,this.state.r_lng1,this.state.r_lat2,this.state.r_lng2,this.state.r_lat3,this.state.r_lng3,this.state.r_lat4,this.state.r_lng4)
        console.log("NE latLng: ",NE.lat()+ ","+NE.lng())
        console.log("SW latLng: ",SW.lat()+ ","+SW.lng())
        console.log("NW latLng: ",NE.lat()+ ","+SW.lng())
        console.log("SE latLng: ",SW.lat()+ ","+NE.lng())
    }
}
render() {
    var contentClass = this.props.isOpen ? "geocontent open" : "geocontent";
        var polyOptions = {
        fillColor: '#03a9f4',
        strokeColor: '#3a3939',
        strokeWeight: 2,
        fillOpacity: 0.8,
        editable: false,
        };
        var shapeOptions = {
            options : {
            fillColor: this.state.fillColor
            }
        }
const ShowGoogleMap = withGoogleMap(props => (
    <GoogleMap
    defaultCenter={{ lat: this.state.latitude, lng: this.state.longitude }}
    defaultZoom={this.state.zoom}
    disableDefaultUI = {true} >
        <Circle
            defaultCenter={
                {
                lat: parseFloat(this.state.c_lat),
                lng: parseFloat(this.state.c_lng)
                }
            }
            radius={parseFloat(this.state.c_radius)}
            options = {shapeOptions.options}
            /*  editable = {true}*//>
        <Rectangle
            defaultBounds = {
                {
                  north: parseFloat(this.state.r_lat1),
                  south: parseFloat(this.state.r_lat3),
                  east:parseFloat(this.state.r_lng1),
                  west: parseFloat(this.state.r_lng3)
                }
            }
            options = {shapeOptions.options}
        /* editable = {true}*//>
            {this.props.geofences.map(geofence => {
             return(
                <Circle
                defaultCenter={{
                lat: parseFloat(geofence.c_lat),
                lng: parseFloat(geofence.c_lng)
                }}
                radius={parseFloat(geofence.c_radius)}
                options = {geofence}
                editable = {false}
                draggable = {false}
                />
                )})}
            {this.props.geofences.map(geofence => {
            return(
                <Rectangle
                defaultBounds = {{
                north: parseFloat(geofence.r_lat1),
                south: parseFloat(geofence.r_lat3),
                east:parseFloat(geofence.r_lng1),
                west: parseFloat(geofence.r_lng3)
                }}
                options = {geofence}
                />
                )})}

    <DrawingManager
        onOverlayComplete={this.onOverlayComplete}
        defaultOptions={{
            drawingControl : this.props.drawingControl,
            drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.RECTANGLE,
                ],
            },
            circleOptions : polyOptions,
            rectangleOptions : polyOptions
        }} />
    </GoogleMap>
));
    return (
        <div key="div" className={contentClass}>
            <ShowGoogleMap
                containerElement={<div className="maparea" style={{ height: `87vh`, width: "100%" }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
  }
}
export default GeoMap;



