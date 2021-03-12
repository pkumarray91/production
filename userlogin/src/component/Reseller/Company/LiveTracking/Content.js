import React, { Component } from 'react';
import 'react-leaflet-fullscreen/dist/styles.css';
import FullscreenControl from 'react-leaflet-fullscreen';
import { Map, Marker, Popup, Tooltip, Polyline} from "react-leaflet";
import L from "leaflet";
import './Map.css';
import MarkerClusterGroup from "react-leaflet-markercluster";
import ReactLeafletGoogleLayer from 'react-leaflet-google-layer';
import axios from 'axios';
import Sidebar from './Sidebar'
import FullScreenMap from './FullScreenMap';

class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat:8.525335,
      lng:76.939269,
      zoom: 4 ,
      maxZoom: 30,
      path : [],
      progress: [],
      counter: 0,
      paths : [],
      records : [],
    };
    this.handleClick = this.handleClick.bind(this)
  }

  pushCoordsToPath = (res) => {
    var data = res.data;
    console.log("push",data)
      this.setState({
        records:data
      });
    console.log("records : ",this.state.records)
    var path=[];
    for (var i=0; i< data.length; i++)
    {
      var multi=[];
      for (var j =0; j < data[i].position.length; j++) {
        multi.push({"lat": parseFloat(data[i].position[j].latitude), "lng": parseFloat(data[i].position[j].longitude)});
      }
      path.push(multi)
    }
    this.setState({
      path:path,
      paths:data
    });
  }

  componentDidMount = () => {
    axios.get('http://localhost:8000/locationTracking/coordinates/')
    .then(res => {this.pushCoordsToPath(res)})
    .catch(err => {console.log(err)})
    this.interval = window.setInterval(this.moveObject, 1000);
  };

  componentWillUnmount = () => {
    window.clearInterval(this.interval);
  };

  moveObject = () => {
    var currentPoints=[];
    for (var i=0; i< this.state.path.length; i++)
    {
      var myArr = []
      for (var j=0; j<=this.state.counter; j++) {
        if (j >= this.state.path[i].length) {
          break;
        }
        myArr.push(this.state.path[i][j])
      }
      currentPoints.push(myArr)
    }
    const progress = currentPoints;
    this.setState({ counter:this.state.counter+1 });
    this.setState({ progress });
  }

  handleClick = (pos) => {
         this.setState({zoom:16})
         this.setState({lat:pos.lat})
         this.setState({lng:pos.lng})
     }

  customIconCreateFunction(cluster) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: "marker-cluster-custom",
      iconSize: L.point(40, 40, true)
    });
  }

   renderPopup(index) {
     if (index >= this.state.paths.length) {
       return
     }
     return (
       <Popup
         tipSize={5}
         anchor="bottom-right"
         longitude={this.state.paths[index].position[0].longitude}
         latitude={this.state.paths[index].position[0].latitude}
         onMouseLeave={() => this.setState({ popupInfo: null })}
         closeOnClick={true}>

         <p>
           <strong>Vehicle Number: {this.state.paths[index].vehicle_number}</strong><br/>
           <strong>Speed: {this.state.paths[index].speed}</strong><br/>
           <strong>Location: {this.state.paths[index].current_location}</strong>
         </p>
       </Popup>
     );
   }

  render() {
    if (!this.state.progress) {
      return <span>loading...</span>
    }
    var contentClass = this.props.isOpen ? "content open" : "content";
     var TypeIcon = L.Icon.extend({
    options: {
      iconSize: [33, 44],
      shadowSize: [36, 39],
      iconAnchor: [17, 44],
      shadowAnchor: [0, 50],
      popupAnchor: [-3, -50]
    }
  });

 var Bike = new TypeIcon({
        iconUrl: '/Elements/BikeMarker.svg'
      }),
      Car = new TypeIcon({
        iconUrl: '/Elements/CarMarker.svg'
      }),
      LargeTruck = new TypeIcon({
        iconUrl: '/Elements/LargeTruckMarker.svg'
      }),
      Rikshaw = new TypeIcon({
        iconUrl: '/Elements/RikshawMarker.svg'
      }),
      Scooter = new TypeIcon({
        iconUrl: '/Elements/ScooterMarker.svg'
      }),
      Truck = new TypeIcon({
        iconUrl:  '/Elements/TruckMarker.svg'
      });
  var icons = {
    BikeMarker: Bike,
    CarMarker: Car,
    LargeTruckMarker: LargeTruck,
    RikshawMarker: Rikshaw,
    ScooterMarker: Scooter,
    TruckMarker : Truck
  }
    const position = [this.state.lat, this.state.lng];
    return (

    <div className={contentClass}>
      <Map center={position} zoom={this.state.zoom} maxZoom={20}>
        <ReactLeafletGoogleLayer useGoogMapsLoader={false} type={'roadmap'}/>
        <div className="">
            <a href="/FullScreenMap"><img src = {process.env.PUBLIC_URL + '/Elements/Fullscreen.svg' } alt="Alertnotify" className="FullScreenMap" /><span className="tooltiptext">Full-Screen</span></a>
        </div>
        <MarkerClusterGroup
          showCoverageOnHover={false}
          spiderfyDistanceMultiplier={2}
          iconCreateFunction={this.customIconCreateFunction}>
          {this.state.progress.length>0 && this.state.progress.map((marker, index) => {
            return (
              <div key={index}>
                <Polyline key={marker} positions={this.state.progress} color={'red'} />
                  <Marker zoom={this.state.markerZoom }
                        onClick={() => this.handleClick(marker[marker.length-1])}
                        key={index}
                        icon={icons[this.state.records[index]['icon_marker']]}
                        position={marker[marker.length-1]}>

                  {this.renderPopup(index)}
                </Marker>
              </div>
            );
          })}
        </MarkerClusterGroup>
         <FullscreenControl  position="topright" />

             </Map>
         </div>
     );
  }
}

export default Content;