/*global google*/
import React, { Component } from "react";
import { withGoogleMap, withScriptjs, GoogleMap,lineSymbol,  DirectionsRenderer, InfoWindow, Marker} from "react-google-maps";
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
import { Polyline } from 'react-google-maps';
  const iconList = {
    icon1: 'http://maps.google.com/mapfiles/ms/micons/green.png',
    icon2: 'http://maps.google.com/mapfiles/ms/micons/blue.png',
//    icon3: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Ball-Right-Azure.png',
//    icon4: 'https://cdn1.iconfinder.com/data/icons/Map-Markers-Icons-Demo-PNG/256/Map-Marker-Marker-Outside-Pink.png',
  }

  class Maps extends Component {
    constructor(props) {
    super(props);
    this.state = {
      directions: null,
      error: null,
      isOpen: true,
      open:false,
      midpoints:{}
    }
     this.onToggleOpen = this.onToggleOpen.bind(this);
  }

  componentWillReceiveProps(){
//  this.getDirection()
   if(this.props.refresh){
   this.setState({directions: null})
//   setTimeout(function(){ This.setState({refresh: false })}, 10);
   }else{
   this.getDirection()
   }
  }

  onToggleOpen() {
    this.setState({
        isOpen: true
    });
  }

  getDirection(){
     const directionsRenderer = new google.maps.DirectionsRenderer();
     const directionsService = new google.maps.DirectionsService();
     const origin = this.props.start_lat_lng;
     const destination =this.props.end_lat_lng;
     const midpoint =  [(this.props.start_lat_lng.lat + this.props.end_lat_lng.lat) / 2, (this.props.start_lat_lng.lng + this.props.end_lat_lng.lng) / 2];
     const midLat = midpoint[0];
     const midLng = midpoint[1];
     this.setState({
     midpoints:{lat:midLat,lng:midLng}
     })
     console.log("midpoint",midpoint)
     console.log("propssssss: ",this.props)
     directionsService.route(
     {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
        unitSystem: google.maps.UnitSystem.METRIC
     },
     (response, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
        console.log(response,"result")
          this.setState({
            directions: response,
          });
        }
     }
    );
  }
//  marker_destination = () =>{
//     return(<Marker
//        position={{
//          lat: 22.6648319,
//          lng: 72.8762904
//        }}
//        onClick={()=>{this.setState({open:!this.state.open})}}
//        >
//         {this.state.open && <InfoWindow
//         options={{ closeBoxURL: ``, enableEventPropagation: true }} >
//            <div style={{ backgroundColor: `yellow`,zindex:`999`, opacity: 0.75, padding: `12px` }}>
//              <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
//                Hello, Kaohsiung!
//              </div>
//            </div>
//         </InfoWindow>}
//      </Marker>
//    )}
  render() {
      const createMarker = (markerObj) => new window.google.maps.Marker({
      icon1: {
      scaledSize: new window.google.maps.Size(50, 50)
      }
      });
     const origin = this.props.start_lat_lng;
     const destination =this.props.end_lat_lng;
     const ShowGoogleMap = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: 8.525335, lng: 76.939269 }}
        defaultZoom={4}
      >
     {this.state.midpoints !=={} && <InfoBox
         defaultPosition={new google.maps.LatLng(this.state.midLat,this.state.midLng)}
         options={{ closeBoxURL: ``, enableEventPropagation: true }} >
            <div style={{ backgroundColor: `white`,zindex:`999`, padding: `5px`, borderRadius:`5px` }}>
              <div style={{  fontColor: `#08233B` }}>
               <center><h6 style={{ fontSize: `10px`}}> { this.props.distance}</h6></center>
               <center><h6 style={{ fontSize: `10px`}}>{this.props.duration}</h6></center>
              </div>
            </div>
         </InfoBox>
     }
       {this.state.directions && this.state.directions.routes.map((data,i)=>{
       return(
        <div>
            <DirectionsRenderer
              draggable={true}
              directions={this.state.directions}
              key={i}
               options={{
               suppressMarkers: true,
               icon: { scale: 1 }
            }}/>
         </div>
       )})
       }
        {this.state.directions &&
          <Marker position={origin} color='red' icon={iconList.icon2}> </Marker>
        }
        {this.state.directions &&
          <Marker position={destination} color='red' icon={iconList.icon1}></Marker>
        }
      </GoogleMap>
    ));

    return (
      <div>
        <ShowGoogleMap
          containerElement={<div className="mapdesign"/>}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
  }}

export default Maps;
