import React, {useState} from 'react';
import './group.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import {Modal,Alert,Form,Table} from 'react-bootstrap';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import LoginService from '../../service/PostData';
import axios from 'axios'
const registerService = new LoginService();
const base_url ='http://140.238.84.255:8000'

const service = new LoginService();

class CompanyVehicle extends React.Component {
  constructor(props, context) {
    super(props, context);
	  this.state = {
		show: false,
		vehicle_number : null,
		vehicle_icons : "Truck",
		vehicle_marker : "TruckMarker",
		add_device : null,
		description : null,
        vehicleData : [],
		};
  }

 cancelButton()  {
    this.setState({
       vehicle_id : '',
       vehicle_number : '',
       vehicle_icons: '',
       vehicle_marker : '',
       description : '',
    });
  }
getVehicleData(){
    service.displayVehicleData(this.props.company_id)
         .then(res => {
            var data = res.data;
            console.log("Vehicle data  : ",data)
            this.setState({vehicleData:data});
           console.log("Vehicle data state: ",this.state.vehicleData)
        })
    .catch(err => {});
}

 componentDidMount(){
    this.getVehicleData();

  }

  handlePopup = () =>{
    this.setState({
      show:true,
    });
    document.getElementById('popover-basic').style.display='none'
  }

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  handleCompanyVehicleFormSubmit = (event) => {
    event.preventDefault();
    this.setState({  vehicle_number: '', vehicle_icons: '', vehicle_marker: '', description: ''})
    const _this = this
    console.log("submit :",this.state)
    let data = {
        vehicle_id:this.state.vehicle_id,
        vehicle_number : this.state.vehicle_number,
	    vehicle_icons : this.state.vehicle_icons,
		vehicle_marker : this.state.vehicle_marker,
		description : this.state.description,
		company_id : this.props.company_id,
		url :  window.location.protocol + "//" + window.location.host + "/"
  }
    console.log("vehicle data : ",data)
//    registerService.registerCompanyVehicle(data)
//    .then(function (response) {
//    alert('Company Vehicle register done successfully');
//    console.log(response);
//  })
  if (this.state.vehicle_id === null || this.state.vehicle_id ===undefined){
            service.registerCompanyVehicle(data)
             .then(function (response) {
             _this.getVehicleData()
               alert('company vehicle register done successfully');
                console.log(response);
              })
        }
    else
          {
            service.updateCompanyVehicle(data)
              .then(function (response) {
              _this.getVehicleData()
                alert('company vehicle Update done successfully');
                console.log(response);
              })
              this.setState({company_id:null})

          }
}
    editcompanyvehicle = (vehicle) => {
        const _this = this
        this.setState({vehicle_id :vehicle.vehicle_id,vehicle_number:vehicle.vehicle_number,vehicle_icons:vehicle.vehicle_icons,vehicle_marker:vehicle.vehicle_marker,description:vehicle.description})
        _this.getVehicleData()
    }

    deleteAllocateVehicle(vehicle_id) {
    console.log("delete id : ",vehicle_id)
    axios
    .delete(`${base_url}/sapasuser/CompanyVehicleRegister/${vehicle_id}/`)
    .then(res => {
            console.log("resttt",res)
            alert(res.data['message'])
    })
    .catch(error => {
        console.log("delette",error)

    }
    )
   }


  render() {
  const buttonText = this.state.vehicle_id ? "Update" : "Create"
  const{ show } = this.state;
    return (
        <div>
            <h6 style={{'fontSize': '12px'}}onClick={this.handlePopup}>Add Vehicle</h6>
            <Modal show={show} onHide={() =>this.setState({show:false })}  dialogClassName="modal-90w" centered id="popoverbasic"  className="popover_modal">
                <div className="head">
                    <Modal.Header closeButton ><div style={{'color':'white'}}> Add Company Vehicle</div></Modal.Header>
                </div>
                <Modal.Body className="show-grid">
                    <form id="input_tour_form" onSubmit={this.handleCompanyVehicleFormSubmit}>
                    <div className="form-group ">
                      <div className="row">
                        <div className="col-lg-4 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Vehicle No.<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-8 col-md-9 col-sm-8 col-8">
                          <input type="text"  name="vehicle_number" value={this.state.vehicle_number} className="tour-form" placeholder="Enter Vehicle" onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-4 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Vehicle icons<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-8 col-md-9 col-sm-8 col-8">
                            <select name="vehicle_icons" value={this.state.vehicle_icons} className="tour-form"  placeholder="select" onChange={this.handleChange}>
                                <option value="Truck">Truck</option>
                                <option value="Bike">Bike</option>
                                <option value="Car">Car</option>
                                <option value="LargeTruck">LargeTruck</option>
                                <option value="Rikshaw">Rikshaw</option>
                                <option value="Scooter">Scooter</option>
                            </select>
                         </div>
                        <div className="col-lg-4 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Vehicle Marker<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-8 col-md-9 col-sm-8 col-8">
                            <select name="vehicle_marker" value={this.state.vehicle_marker} className="tour-form"  placeholder="select" onChange={this.handleChange}>
                                <option value="TruckMarker">TruckMarker</option>
                                <option value="BikeMarker">BikeMarker</option>
                                <option value="CarMarker">CarMarker</option>
                                <option value="LargeTruckMarker">LargeTruckMarker</option>
                                <option value="RikshawMarker">RikshawMarker</option>
                                <option value="ScooterMarker">ScooterMarker</option>
                            </select>
                         </div>
{/*                        <div className="col-lg-4 col-md-3 col-sm-4 col-4">
                            <label  className="labelname">Add Device</label>
                          </div>
                          <div className="col-lg-8 col-md-9 col-sm-8 col-8">
                                <DropdownMultiselect name="add_device" value={this.state.add_device} className="tour-form" placeholder="select" handleOnChange={(selected) => {
                                      this.setState({add_device:selected});
                                    }}
                                    options={this.props.deviceList}
                                />

                          </div> */}
                        <div className="col-lg-4 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Description</label>
                        </div>
                        <div className="col-lg-8 col-md-9 col-sm-8 col-8">
                          <textarea style={{'minHeight': '65px'}} name="description" value={this.state.description} form="usrform" className="tour-form" placeholder="Add Comment Here"></textarea>
                        </div>
                        <div className="col-lg-3">
                        </div>
                        <div className="col-lg-9">
                            <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <button type="submit" style={{'float': 'right'}} className="uploadsavecancel">{buttonText}</button>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                         <input style={{'float': 'left', 'minWidth':'93px'}} type="button"  className="uploadsavecancel"  onClick={()=>this.cancelButton()}   value="Cancel"/>
                        </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="col-lg-12">
                    <div className="allocate-table">
                    <Table bsPrefix  hover size="sm" className="allocate-tbl">
                    <thead style={{backgroundColor: "#dfddde"}} >

                      <tr>
                       <th className="allocate-head">vehicleNo</th>
                       <th className="allocate-head">vehicle_icons</th>
                       <th className="allocate-head">vehicle_marker</th>
                       <th className="allocate-head">Description</th>
                       {/* <th className="allocate-head">Device</th> */}
                        <th className="allocate-head">Edit</th>
                        <th className="allocate-head">Delete</th>
                      </tr>
                    </thead>
                        <tbody >
                        {this.state.vehicleData.map((vehicle) => (
                          <tr className="allocate-r">
                          <td className="allocate-head">{vehicle.vehicle_number}</td>
                          <td className="allocate-head">{vehicle.vehicle_icons}</td>
                          <td className="allocate-head">{vehicle.vehicle_marker}</td>
                          <td className="allocate-head">{vehicle.description}</td>
                           <td className="allocate-head" ><center><FontAwesomeIcon icon={faEdit} onClick={() => this.editcompanyvehicle(vehicle)} /></center></td>
                            <td className="allocate-head" ><center><FontAwesomeIcon icon={faTrash}  onClick={()=> {if(window.confirm('Are you sure to delete this Vehicle?')){this.deleteAllocateVehicle(vehicle.vehicle_id)}}}/></center></td>
                          </tr>
                          ))}
                        </tbody>
                    </Table>
                    </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
    }
}
export default CompanyVehicle;
