import React, {Component} from 'react';
import PlacesAutocomplete,{ geocodeByAddress,getLatLng,} from 'react-places-autocomplete';
import { CirclePicker } from 'react-color';
import './GeoSideBar.css'
class GeoRightPanel extends Component {
    constructor(props) {
    super(props);
        this.state = {
            latitude:'',
            longitude:'',
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
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({c_radius: nextProps.c_radius, c_lat: nextProps.c_lat, c_lng: nextProps.c_lng});
        this.setState({r_lat1 :nextProps.r_lat1 , r_lng1 : nextProps.r_lng1,r_lat2 : nextProps.r_lat2,r_lng2 : nextProps.r_lng2,r_lat3 : nextProps.r_lat3,r_lng3 : nextProps.r_lng3,r_lat4 :nextProps.r_lat4,r_lng4 :nextProps.r_lng4})
        this.setState({fillColor : nextProps.fillColor})
    }
handleChangeComplete = (color) => {
    this.setState({ fillColor: color.hex });
    this.props.changeColor(this.state.fillColor)
};
handleNameUpdate = (evt) => {
	this.setState({name: evt.target.value});
}
handleLocationUpdate = (location) => {
    this.setState({location});
}
handleDescriptionUpdate = (evt) => {
    this.setState({description: evt.target.value});
}
handleLatitudeUpdate = (evt) => {
    if(this.state.latitude===''){
    this.setState({latitude: evt.target.value});
    }
}
handleLongitudeUpdate = (evt) => {
    if(this.state.longitude===''){
    this.setState({longitude: evt.target.value});
    }
}
handleCancel = () =>{
    document.getElementById("input_geo_form").reset();
    this.setState({location : ''})
}

handleSelect = location => {
    geocodeByAddress(location)
    .then(results => getLatLng(results[0]))
        .then(latLng => {
//        console.log('Success', latLng)
        this.setState({latitude : latLng.lat})
        this.setState({longitude : latLng.lng})
        this.props.modMap(this.state.latitude,this.state.longitude)
        })
     .catch(error => console.error('Error', error));
};
handleFormSubmit = (evt) => {
    evt.preventDefault();
        if (this.state.id === null || this.state.id ===undefined){
            this.props.createGeofence({...this.state});
        }
    else
        this.props.updateGeofence({...this.state});
}
render() {
    const buttonText = this.props.is_edit ? 'Update': 'Save';
 return (
<div>
    <div className="col-lg-2 col-md-2 rightsidebar ">
    <div className="rightscroll">
        <form id="input_geo_form" onSubmit={this.handleFormSubmit}>
            <div className="form-group"> <label for="Name"></label>
                <input type="text" name="geofence_name"  className="rightinputs" placeholder="Name" value={this.state.name} onChange={this.handleNameUpdate} required/>
            </div>
            <PlacesAutocomplete  value={this.state.location} onChange={this.handleLocationUpdate} onSelect={this.handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input {...getInputProps({ name : "location" , className : "rightinputs", placeholder : "Location", id : "Location" })}/>
                            <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                const style = suggestion.active ? { backgroundColor: '#00538326'} : { backgroundColor: '#e8e8e8'};
                                    return (
                                    <div {...getSuggestionItemProps(suggestion, {style,})}>
                                         {suggestion.description}
                                    </div>
                                    );
                                })}
                            </div>
                    </div>
                )}
            </PlacesAutocomplete>
            {/*OR Section*/}
            <div className="container" style={{'marginTop':'30px'}}>
                <div className="row ">
                    <div className="col-lg-5 col-md-5">
                        <div className="sections"></div>
                    </div>
                    <div className="col-lg-2 col-md-2">
                        <div className="sectionor">Or</div>
                    </div>
                    <div className="col-lg-5 col-md-5">
                        <div className="sections"></div>
                    </div>
                </div>
            </div>
            {/*LATITUDE Section*/}
            <div className="form-group"> <label for="Latitude"></label>
                <input type="text" name="latitude"  className="rightinputs" placeholder="Latitude" id="Latitude" onChange={this.handleLatitudeUpdate}/>
            </div>
            {/*LONGITUDE Section*/}
            <div className="form-group"> <label for="Longitude"></label>
                <input type="text" name="longitude"  className="rightinputs" placeholder="Longitude" id="Longitude" onChange={this.handleLongitudeUpdate}/>
            </div>
            {/*SHAPE Section*/}
            <div className="note" >To draw geofence select required shape from map and drag to draw respectively.</div>
            {/*COLOR Section*/}
             <div className="container">
                <div className="row ">
                 <p> Select Color </p>
                    <div className="col-lg-12 col-sm-4 colorblock" >
                        <CirclePicker color={ this.state.background } onChangeComplete={ this.handleChangeComplete  } />
                    </div>
                </div>
             </div>
            {/*DESCRIPTION Section*/}
            <div className="form-group"> <label for="Description"></label>
                <textarea type="text" name="Latitude"  className="rightdescription" placeholder="Description" value={this.state.description} onChange={this.handleDescriptionUpdate}/>
            </div>
            {/*SAVECANCEL Section*/}
            <div className="container">
                <div className="row ">
                    <div className="col-lg-6 col-md-6">
                        <button type="submit" className="savecancel">{buttonText}</button>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <button type="button" className="savecancel" onClick={this.handleCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    </div>
</div>
    );
  }
}
export default GeoRightPanel;