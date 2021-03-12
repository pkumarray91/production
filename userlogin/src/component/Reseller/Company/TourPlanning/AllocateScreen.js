/* global google */
import React, {Component,useState} from 'react';
import {Button, Collapse} from 'react-bootstrap';
import './Map.css';
import './StopsModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCar, faThumbtack,faTruck,faMotorcycle} from '@fortawesome/free-solid-svg-icons';
import { IconContext } from 'react-icons';
import {faUpload,faPlus,faEye,faTrash,faEdit} from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table'
import TourMap from './TourMap';
import AllocateMap from './AllocateMap';
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
            Date_allocate:'',
            Time_allocate:'',
            id : null,
            modal: false,
            duration: '',
            distance: '',
            stops:'',
            total_hours:'',
            total_minutes:'',
            is_deleted: 'false',
            a_comment:'',
		};
   this.distanceService = new google.maps.DistanceMatrixService();
   this.handleAllocateSubmit =this.handleAllocateSubmit.bind(this);
 }

   componentWillReceiveProps(nextProps,prevProps) {
   console.log("next",nextProps, prevProps)
   if (nextProps.editTour!=null){
   console.log("Tourdata",nextProps.editTour.tour_name)
   this.setState({
   id:nextProps.editTour.id,
   tour_name:nextProps.editTour.tour_name,start_point:nextProps.editTour.start_point, end_point:nextProps.editTour.end_point, start_lat_lng:nextProps.editTour.start_lat_lng,end_lat_lng:nextProps.editTour.end_lat_lng})
   }
    if (nextProps.editAllocate!=null){
   console.log("Allocatedata",nextProps.editAllocate.Tour_Name)
   this.setState({
   id:nextProps.editAllocate.id,
   Tour_Name: nextProps.editAllocate.Tour_Name,Date_allocate:nextProps.editAllocate.Date_allocate, Time_allocate: nextProps.editAllocate.Time_allocate, tour_allocate_name: nextProps.editAllocate.tour_allocate_name})
   }
   if(this.props.refresh===true){
   this.setState({
     open: true,
     close:false,
     allocateRefresh : false,
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
//     Tour_Name:'',
     Vehicle_data:'',
     Date_allocate:'',
     Time_allocate:'',
     id : null,
     modal: false,
     duration: '',
     distance:'',
     durations: '',
     tour_allocate_name:'',
     a_comment:'',
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

  cancelAllocate = () => {
    this.setState({
     Tour_Name:'',
     tour_allocate_name:'',
     Vehicle_data:'',
     Date_allocate:'',
     Time_allocate:'',
     a_comment:'',
    });
  }


    handleAllocateSubmit = (e) => {
    e.preventDefault()
       this.setState({ Tour_Name:'',tour_allocate_name:'', tour_name: '', a_comment:'', Vehicle_data: '',Date_allocate: '', Time_allocate:'', start_lat_lng:[{ lat : '', lng:''}], end_lat_lng:[{lat : '',lng:''}],comment:'',distance:'', duration:'', total_time:''})
    let Tour_Name = e.target[1].value
    let data = {
    Tour_Name,
    Vehicle_data:this.state.Vehicle_data,
    Date_allocate:this.state.Date_allocate,
    Time_allocate:this.state.Time_allocate,
    is_deleted : false,
    tour_allocate_name: this.state.tour_allocate_name,
    a_comment: this.state.a_comment,
    id: this.state.id
    }
    console.log("allocateScreen state : ",data)
    if(this.state.id === null || this.state.id ===undefined){
     axios
   .post('http://localhost:8000/tour/tourallocate/',data)
   .then(response =>
    {
      this.setState({
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
            Date_allocate:'',
            Time_allocate:'',
            id : null,
            modal: false,
            duration: '',
            distance: '',
            stops:'',
            total_hours:'',
            total_minutes:'',
            is_deleted: 'false',
            a_comment:'',
      }
      )
      this.props.getAllocateTour()
      alert('Tour Allocate Suceesfully');

    }
    )
    .catch(error => {
        console.log(error)
        alert('Tour not Allocate Suceesfully');
    }
    )
   }
   else{
     axios
   .put(`${base_url}/tour/tourallocate/${this.state.id}/`,this.state)
   .then(response => {
        this.setState({
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
            Date_allocate:'',
            Time_allocate:'',
            id : null,
            modal: false,
            duration: '',
            distance: '',
            stops:'',
            total_hours:'',
            total_minutes:'',
            is_deleted: 'false',
            a_comment:'',
      }
      )

        alert('Tour Edited Suceesfully');
        this.props.getAllocateTour()
    })
    .catch(error => {
        alert('Tour not Edited Suceesfully');
    }
    )
   }
     document.getElementById("input_allocate_form").reset();
   };

   editAllocate = (tourData) => {
    console.log("tourdatatgfg",tourData)
    this.setState({
    tour_allocate_name:tourData.tour_allocate_name,
    Tour_Name:tourData.Tour_Name,
    Date_allocate:tourData.Date_allocate,
    Time_allocate: tourData.Time_allocate,
    Vehicle_data:tourData.Vehicle_data,
    a_comment:tourData.a_comment,
    id:tourData.id
    })
  }

   deleteAllocate(id) {
    console.log("delete id : ",id)
    axios
    .delete(`${base_url}/tour/tourallocate/${id}/`)
    .then(res => {
        this.props.getAllocateTour()
       alert('Tour Deleted Suceesfully');
       console.log("resttt",res)
    })
    .catch(error => {
        console.log("delette",error)
        alert('Tour not delete Suceesfully');
    }
    )
   }

    handleAllocateNameChange=(event) => {
        this.setState({tour_allocate_name:event.target.value})
    }
    handleVehicleChange=(event) => {
        this.setState({Vehicle_data:event.target.value})
    }
    handleCreatedTourChange=(event) => {
        this.setState({Tour_Name:event.target.value})
    }
    handleDateChange=(event) => {
       this.setState({Date_allocate: event.target.value});
    }
    handleTimeChange=(event) => {
       this.setState({Time_allocate: event.target.value});
    }
    handleCommentChange=(event) => {
        this.setState({a_comment:event.target.value})
    }
    handleCreatedTourChange=(event) => {
        this.setState({Tour_Name:event.target.value})
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
      <div className="tour-screen">
       <div className="collapase-box">
            <div className="container-fluid">
              <div className="row">
                <div className="col-lg-6">
                  <div className="allocate-fo">
                    <form id="input_allocate_form" onSubmit={this.handleAllocateSubmit} >
                      <div className="form-group">
                        <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                            <label  className="labelname">Allocate Tour Name <span style={{'color':'red'}}>*</span></label>
                          </div>
                          <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                            <input type="text" onChange={this.handleAllocateNameChange} name = "tour_allocate_name" value={this.state.tour_allocate_name}  className="tour-form" />
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                            <label  className="labelname">Tour Name <span style={{'color':'red'}}>*</span></label>
                          </div>

                          <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                            <select value={this.props.allocate_tour.id}  name="Tour_Name" className="tour-form ar" >
                              {
                                  <option  style={{'display':'none'}} value={this.props.allocate_tour.id}>{this.props.allocate_tour.tour_name}</option>
                              }
                          </select>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                            <label  className="labelname">Vehicle <span style={{'color':'red'}}>*</span></label>
                          </div>
                          <div className="col-lg-8 col-md-8 col-sm-8 col-8">

                            <select name="Vehicle" value={this.state.Vehicle_data} className="tour-form" onChange={this.handleVehicleChange} placeholder="select">
                                <option>Select Vehicle</option>
                                {
                                    this.props.tourVehicle.map((tour,i) =>
                                    (<option key={i} value={tour.vehicle_number}>{tour.vehicle_number}</option>))
                                }
                            </select>
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                            <label  className="labelname">Schedule Tour On <span style={{'color':'red'}}>*</span></label>
                          </div>
                          <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                            <input type="date" onChange={this.handleDateChange} value={this.state.Date_allocate}name="Tourdate" className="tour-form" />
                          </div>
                         <div className="col-lg-3 col-md-3 col-sm-3 col-3">
                            <input type="time" onChange={this.handleTimeChange} value={this.state.Time_allocate} name="Tourdate" className="tour-form" />
                          </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                          <label className="labelname">Add Comment</label>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                          <textarea style={{'minHeight': '70px'}} onChange={this.handleCommentChange} value={this.state.a_comment} name="comment" form="usrform" className="tour-form" placeholder="Enter Comment Here"></textarea>
                        </div>
                          <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                            <label  className="labelname"></label>
                          </div>
                          <div className="col-lg-8">
                            <div className="row">
                              {this.state.id !==null ?<div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                <input  style={{'float': 'right', 'minWidth': '71px'}} type="submit" className=" add-tour " value="Edit"/>
                              </div>:
                               <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                <input  style={{'float': 'right', 'minWidth': '71px'}} type="submit" className=" add-tour " value="Save"/>
                              </div>}
                              <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                                <input type="button" onClick={this.cancelAllocate}  className=" add-tour" value="Cancel"/>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  </div>
                <div className="col-lg-6">
                  <div className="allocate-fo">
                     <AllocateMap
                      start_lat_lng={this.props.allocate_tour.start_lat_lng[0]}
                      start_point={this.state.start_point}
                      end_point={this.state.end_point}
                      refresh={this.props.refresh}
                      distance={this.props.allocate_tour.distance}
                      duration={this.props.allocate_tour.duration}
                      end_lat_lng={this.props.allocate_tour.end_lat_lng[0]}/>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="allocate-table">
                  <Table bsPrefix  hover size="sm" className="allocate-tbl">
                  <thead style={{backgroundColor: "#dfddde"}} >
                    <tr>
                     <th className="allocate-head">Allocate Tour Name</th>
                      <th className="allocate-head">Tour Name</th>
                      <th className="allocate-head"> Vehicle</th>
                      <th className="allocate-head">Scheduled On</th>
                      <th className="allocate-head">Edit</th>
                      <th className="allocate-head">Delete</th>
                    </tr>
                  </thead>
                  {
                       this.props.tourAllocate.map((tour) =>(
                  <tbody >
                    <tr className="allocate-r">

                    <td className="allocate-head">{tour.tour_allocate_name}</td>
                    <td className="allocate-head">{tour.Tour_Name}</td>
                      <td className="allocate-head">{tour.Vehicle_data}</td>
                      <td className="allocate-head">{tour.Date_allocate} {tour.Time_allocate}</td>
                      <td className="allocate-head" onClick={()=>{this.editAllocate(tour)}}><center><FontAwesomeIcon icon={faEdit}/></center></td>
                      <td className="allocate-head" onClick={()=>{if(window.confirm('Are you sure to delete this Allocated Tour?')){this.deleteAllocate(tour.id);}}} ><center><FontAwesomeIcon icon={faTrash}/></center></td>
                    </tr>
                  </tbody>))}
                  </Table>
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
