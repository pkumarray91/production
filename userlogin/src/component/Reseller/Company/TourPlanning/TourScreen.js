/* global google */
import React, {Component,useState} from 'react';
import {Button, Collapse} from 'react-bootstrap';
import './Map.css';
import './StopsModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCar,  faThumbtack,faTruck,faMotorcycle} from '@fortawesome/free-solid-svg-icons';
import { IconContext } from 'react-icons';
import {faUpload,faPlus,faEye,faTrash} from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table'
import TourMap from './TourMap';
import {Nav,Row,Col,Modal,Tab,TabContainer} from 'react-bootstrap';
import axios from 'axios'
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";
import PlacesAutocomplete,{geocodeByAddress,getLatLng,} from 'react-places-autocomplete';
import '../../../../css/FooterModal.css';
const base_url ='http://140.238.84.255:8000'
class Example extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			open: true,
			close:false,
			tour_name:'',
            start_point:'',
            end_point:'',
            start_lat_lng:[{
                lat : '',
                lng:''
            }],
            end_lat_lng:[{
             lat : '',
             lng:''
            }],
            Tour_Name:'',
            Vehicle_data:'',
            Date:'',
            Time:'',
            id : null,
            modal: false,
            editButton:false,
            createButton:true,
            duration: '',
            distance: '',
            stops:'',
            total_hours:'',
            total_minutes:'',
            comment:''
		};
   this.handleSubmit = this.handleSubmit.bind(this);
   this.distanceService = new google.maps.DistanceMatrixService();
   this.handleAllocateSubmit =this.handleAllocateSubmit.bind(this);
 }

   componentWillReceiveProps(nextProps,prevProps) {
   console.log("next",nextProps, prevProps)
   if (nextProps.editTour!=null){
   console.log("Tourdata",nextProps.editTour.tour_name)
   this.setState({
   id:nextProps.editTour.id,
   tour_name:nextProps.editTour.tour_name,start_point:nextProps.editTour.start_point, end_point:nextProps.editTour.end_point, start_lat_lng:nextProps.editTour.start_lat_lng,end_lat_lng:nextProps.editTour.end_lat_lng, distance:nextProps.editTour.distance, duration:nextProps.editTour.duration,total_time:nextProps.editTour.total_time,comment:nextProps.editTour.comment})
   }
   if(this.props.refresh===true){
   this.setState({
     open: true,
     close:false,
     allocateRefresh : false,
     tour_name:'',
     start_point:'',
     end_point:'',
     start_lat_lng:[{
       lat : '',
       lng:''
     }],
     end_lat_lng:[{
       lat : '',
       lng:''
     }],
     Tour_Name:'',
     Vehicle_data:'',
     Date_allocate:'',
     Time_allocate:'',
     id : null,
     modal: false,
     duration: '',
     distance:'',
     durations: '',
     stops:'',
     total_time:'',
     comment:'',
     editButton:true,
     createButton:false
   })
   }
   console.log("refresh",this.props.refresh)
  }

  handleSelect = (start_point) => {
    geocodeByAddress(start_point)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
      this.setState({start_lat_lng:[{lat:latLng.lat,lng:latLng.lng}]})
      this.calculateDistance()
      console.log('start', this.state.start_lat_lng)
      })
      .catch(error => console.error('Error', error));
  };

  handleSelectend = (end_point) => {
    geocodeByAddress(end_point)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
      this.setState({end_lat_lng:[{lat:latLng.lat,lng:latLng.lng}]})
      this.calculateDistance()
      console.log('end', this.state.end_lat_lng)
      })
      .catch(error => console.error('Error', error));
  };

  calculateDistance(){
    this.distanceService.getDistanceMatrix({
        origins: [this.state.start_lat_lng[0]],
        destinations: [this.state.end_lat_lng[0]],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
    }, (response, status) => {
        if (status !== "OK") {
          alert('Error was:' + status);
        }
        else {
          var distObject = response.rows[0].elements[0];
//          console.log("ddd",distObject);
          if(distObject.distance && distObject.duration){
          this.setState({distance: distObject.distance.text});
          this.setState({duration: distObject.duration.text});
          this.setState({durations: distObject.duration.value });
            if (this.state.durations > 14400 ){
            this.setState({show:true})
            }
           }
          else{
            alert("route not found")
          }
        }
      }
    )
  }

  handleSubmit = (e) => {
   e.preventDefault()
   this.setState({  tour_name: '', start_point: '', end_point: '',  start_lat_lng:[{ lat : '', lng:''}], end_lat_lng:[{lat : '',lng:''}],comment:'',distance:'', duration:'', total_time:''})
   console.log("tourrrr :",this.state)
   if(this.state.id === null || this.state.id ===undefined){
     axios
   .post('http://127.0.0.1:8000/tour/tourcreation/',this.state)
   .then(response => {
      this.setState({
      open: true,
     close:false,
     allocateRefresh : false,
     tour_name:'',
     start_point:'',
     end_point:'',
     start_lat_lng:[{
       lat : '',
       lng:''
     }],
     end_lat_lng:[{
       lat : '',
       lng:''
     }],
     Tour_Name:'',
     Vehicle_data:'',
     Date_allocate:'',
     Time_allocate:'',
     id : null,
     modal: false,
     duration: '',
     distance:'',
     durations: '',
     stops:'',
     total_time:'',
     comment:'',
     editButton:true,
     createButton:false
      })
      this.props.getData()
      alert('Tour Create Suceesfully');
    })
    .catch(error => {
        console.log(error)
        alert('Tour not Create Suceesfully');
    }
    )
   }else{
     axios
   .put(`${base_url}/tour/tourcreation/${this.state.id}/`,this.state)
   .then(response => {
      this.setState({
      open: true,
     close:false,
     allocateRefresh : false,
     tour_name:'',
     start_point:'',
     end_point:'',
     start_lat_lng:[{
       lat : '',
       lng:''
     }],
     end_lat_lng:[{
       lat : '',
       lng:''
     }],
     Tour_Name:'',
     Vehicle_data:'',
     Date_allocate:'',
     Time_allocate:'',
     id : null,
     modal: false,
     duration: '',
     distance:'',
     durations: '',
     stops:'',
     total_time:'',
     comment:'',
     editButton:true,
     createButton:false
      })
      this.props.getData()
      alert('Tour Edited Suceesfully');

    })
    .catch(error => {
        alert('Tour not Edited Suceesfully');
    }
    )
   }
//     document.getElementById("input_tour_form").reset();
   };

   deleteCreate(id) {
    console.log("delete id : ",id)
    axios
    .delete(`${base_url}/tour/tourcreation/${id}/`)
    .then(res => {
      this.props.getData()
       alert('Tour Deleted Suceesfully');
        console.log("resttt",res)

    })
    .catch(error => {
        console.log("delette",error)
        alert('Tour not delete Suceesfully');
    }
    )
   }

  cancelCreate = () => {
    this.setState({
     tour_name:'',
     start_point:'',
     end_point:'',
     start_lat_lng:[{
       lat : '',
       lng:''
     }],
     end_lat_lng:[{
       lat : '',
       lng:''
     }],
     duration:'',
     distance:'',
     total_time:'',
     comment:'',
    });
  }
    handlecommentChange = (cmt) => {
    this.setState({comment: cmt.target.value});
    }
    handleNameChange = (evt) => {
		this.setState({tour_name: evt.target.value});
	}
	handleStartChange= (start_point) => {
		this.setState({start_point});
	}
	handleStopChange= (e) => {
	console.log("stop",e.target.value)
		this.setState({stops: e.target.value});
	}
	handleEndChange= (end_point) => {
		this.setState({end_point});
	}

    handleAllocateSubmit = (e) => {
    e.preventDefault()
    axios
   .post('http://localhost:8000/tour/tourallocate/',this.state)
   .then(response => {
        alert('Tour Allocate Suceesfully');
    })
    .catch(error => {
       alert('Tour Not Allocate Suceesfully');
    }
    )
     document.getElementById("input_allocate_form").reset();
   };

    handleVehicleChange=(event) => {
        this.setState({Vehicle_data:event.target.value})
    }
    handleCreatedTourChange=(event) => {
        this.setState({Tour_Name:event.target.value})
    }
    handleDateChange=(event) => {
       this.setState({Date: event.target.value});
    }
    handleTimeChange=(event) => {
       this.setState({Time: event.target.value});
    }

    addstop(){
    const {durations,stops} =this.state
    this.setState({ show: this.state.stops !='' ? false:true})
    this.setState({ dishow: this.state.stops !='' ? false:true})
    let total_min= durations/60;
    let stopss = stops*30
    total_min = total_min + stopss
    var hours = (total_min / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    this.setState({
    total_time:` ${rhours} hours  ${rminutes} min`
    })
    }

  render() {
  var contentClass = this.props.isOpen ? "content open" : "content";
  const { open, close, distance, duration,durations, distObject } = this.state;
  return (
    <div  className={contentClass} >
     <div>
        <Modal show={this.state.show} >
          {/*<Modal.Header closeButton></Modal.Header>*/}
          <Modal.Body className="ReactModal__Body--open">
          <div className="container">
              <div className="row">
                <form style={{'width': '500px'}}id="input_tour_form" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-12">
                     <div className="row">
                       <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                        <label  className="labelname"> No. Of Stops <strong style={{'color': 'red'}}>*</strong></label>
                       </div>
                       <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                          <input type="number" min="1" value={this.state.stops} onChange={this.handleStopChange} placeholder="select" className="tour-form" />
                       </div>
                       { this.state.durations > 32400 && <div><h6>You Need to change your Driver</h6></div>}
                    </div>
                    </div>
                    </div>
                </form>
              </div>
          </div>
          </Modal.Body>
          <Modal.Footer className="py-1 d-flex justify-content-center">
              <div className="stops">
                <Button variant="outline-dark" onClick={() => this.addstop()}>Add Stop</Button>
              </div>
          </Modal.Footer>
        </Modal>
     </div>

      <div className="tour-screen">
        <div className="">

            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6">
                  <div className="tour-fo">
                  <form id="input_tour_form" onSubmit={this.handleSubmit} >
                    <div className="form-group ">
                      <div className="row">

                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Tour Name<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="text" value={this.state.tour_name} onChange={this.handleNameChange} name="tour_name" className="tour-form" placeholder="Enter Tour Name"/>
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">start Point <span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                            <PlacesAutocomplete
                              value={this.state.start_point}
                              onChange={this.handleStartChange}
                              onSelect={this.handleSelect}
                            >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                  <input
                                    {...getInputProps({ className : "tour-form", placeholder : "Start Point",
                                    })}/>
                                  <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                       const style = suggestion.active
                                        ? { backgroundColor: '#00538326'}
                                        : { backgroundColor: '#e8e8e8'};
                                      return (
                                        <div
                                          {...getSuggestionItemProps(suggestion, {
                                            style,
                                          })}
                                        >
                                        {suggestion.description}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                             </PlacesAutocomplete>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">End Point <span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                            <PlacesAutocomplete
                              value={this.state.end_point}
                              onChange={this.handleEndChange}
                              onSelect={this.handleSelectend}
                            >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                  <input
                                    {...getInputProps({ className : "tour-form", placeholder : "End Point",
                                    })}/>
                                  <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map(suggestion => {
                                     const style = suggestion.active
                                        ? { backgroundColor: '#00538326'}
                                        : { backgroundColor: '#e8e8e8'};
                                      return (
                                        <div
                                          {...getSuggestionItemProps(suggestion, {
                                            style,
                                          })}
                                        >
                                        {suggestion.description}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                             </PlacesAutocomplete>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Distance</label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <div className="calculate">
                            <center><p className="inform">Distance is {distance}</p></center>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Estimated Time</label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8 ">
                          {/*  <div className="calculate">
                               <input className type="text" value={this.state.tour_name} onChange={this.handleNameChange} name="tour_name" className="tour-form"/>
                          </div>*/}
                          <div className="calculate">
                            <center><p className="inform">Estimated Time is {duration}</p></center>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname"> Time with Stops</label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8 ">
                          {/*  <div className="calculate">
                               <input className type="text" value={this.state.tour_name} onChange={this.handleNameChange} name="tour_name" className="tour-form"/>
                          </div>*/}
                          <div className="calculate">
                            <center><p className="inform">Total Time is {this.state.total_time}</p></center>
                          </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Add Comment</label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <textarea style={{'minHeight': '95px'}} value={this.state.comment} onChange={this.handlecommentChange} name="comment" form="usrform" className="tour-form" placeholder="Enter Comment Here"></textarea>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                          <label  className="labelname"></label>
                        </div>
                        <div className="col-lg-8">
                            <div className="row">
                      {this.state.id !==null ?
                       <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                          <input type="submit" style={{'float': 'right'}} className=" add-tour" value="Edit Tour"/>
                        </div>:
                        <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                          <input type="submit" style={{'float': 'right'}} className=" add-tour" value="Create Tour"/>
                        </div>}
                        <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                           <input style={{'float': 'left', 'minWidth':'93px'}} type="button" onClick={this.cancelCreate}  className=" add-tour" value="Cancel"/>
                        </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  </div>
                </div>
                <div className="col-lg-6">
                <div className="tour-fo">
                 <TourMap
                  start_lat_lng={this.state.start_lat_lng[0]}
                  start_point={this.state.start_point}
                  end_point={this.state.end_point}
                  refresh={this.props.refresh}
                  distance={this.state.distance}
                  duration={this.state.duration}
                  end_lat_lng={this.state.end_lat_lng[0]}/>
                </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
}
export default Example;
