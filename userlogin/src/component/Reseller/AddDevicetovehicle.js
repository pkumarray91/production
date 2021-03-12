import React, {useState} from 'react';
import './group.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import {Modal,Alert,Form,Table} from 'react-bootstrap';
import LoginService from '../../service/PostData';
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
const registerService = new LoginService();
const base_url ='http://140.238.84.255:8000'
const service = new LoginService();
class VehicleAllocate extends React.Component {
  constructor(props, context) {
    super(props, context);
     this.state = {
      show: false,
      vehicle_id:null,
      add_device:null,
      vehicleNumbers : [],
      vehicleData:[],
      add_notes : null
      };
  }

 cancelButton()  {
    this.setState({
       vehicle_id : '',
       add_device : '',
       add_notes: '',

    });
  }

  getVehicleNumber(){
    service.displayVehicle_number(this.props.company_id)
         .then(res => {
            var data = res.data;
            console.log("Vehicle numbers  : ",data)
            this.setState({vehicleNumbers:data});
           console.log("Vehicle data state: ",this.state.vehicleNumbers)
        })
    .catch(err => {});
  }

  getVehicleData(){
    service.displayAllocate(this.props.company_id)
         .then(res => {
            var data = res.data;
            console.log("Vehicle data  : ",data)
            this.setState({vehicleData:data});
           console.log("Vehicle data state: ",this.state.vehicleData)
        })
    .catch(err => {});
  }

  editAllocate = (vehicle) =>{
  this.setState({id: vehicle.device_id,add_notes:vehicle.add_notes})
  }

  componentDidMount(){
    this.getVehicleNumber();
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

  handleVehicleAllocationDeviceSubmit = (event) => {
    event.preventDefault();
    this.setState({  add_device: '', vehicle_id: '', add_notes: ''})
    const _this = this
    console.log("submit :",this.state)
    let data = {
        id : this.state.id,
        vehicle_id : this.state.vehicle_id,
        add_device : this.state.add_device,
        add_notes : this.state.add_notes,
        company_id : this.props.company_id,
  }
    console.log("vehicle data : ",data)
    if (this.state.id === null || this.state.id === undefined){
    service.allocateDevice(data)
    .then(function (response) {
        _this.getVehicleData()
        alert("Device Allocation Done Sucessfully")
        console.log(response);
    })
  }
  else {
    service.updateAllocate(data)
    .then(function (response) {
    alert("Device Allocation update Sucessfully")
    console.log(response);
  })
  }
}
  render() {
  const{ show } = this.state;
  const buttonText = this.state.id?'Update':'Create'
    return (
        <div>
            <h6 style={{'fontSize': '12px'}}onClick={this.handlePopup}>Allocate Device</h6>
            <Modal show={show} onHide={() =>this.setState({show:false })}  dialogClassName="modal-90w" centered id="popoverbasic"  className="popover_modal">
                <div className="head">
                    <Modal.Header closeButton ><div style={{'color':'white'}}>Allocate Device</div></Modal.Header>
                </div>
                <Modal.Body className="show-grid">
                    <form id="input_tour_form" onSubmit={this.handleVehicleAllocationDeviceSubmit}>
               <div className="form-group ">
                      <div className="row">
               <div className="col-lg-4 col-md-3 col-sm-4 col-4">
                          <label className="labelname">vehicle Number<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-8 col-md-9 col-sm-8 col-8">
                            <select name="vehicle_id" value={this.state.vehicle_id} className="tour-form" onChange={this.handleChange} placeholder="select">
                                   <option>Select Vehicle</option>
                                   {
                                         this.state.vehicleNumbers.map((vehicle,i) =>
                                         (<option key={i} value={vehicle.vehicle_id}>{vehicle.vehicle_number}</option>))
                                   }
                            </select>
                         </div>
                  <div className="col-lg-4 col-md-3 col-sm-4 col-4">
                     <label  className="labelname">Add Device<span style={{'color':'red'}}>*</span></label>
                  </div>
                        <div className="col-lg-8 col-md-9 col-sm-8 col-8">
                            <DropdownMultiselect name="add_device" value={this.state.add_device} className="tour-form" placeholder="select" handleOnChange={(selected) => {
                                  this.setState({add_device:selected});
                                }}
                                options={this.props.deviceList}
                            />
                        </div>
                        <div className="col-lg-4 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Add Notes</label>
                        </div>
                        <div className="col-lg-8 col-md-9 col-sm-8 col-8">
                          <textarea style={{'minHeight': '65px'}} name="add_notes" value={this.state.add_notes} form="usrform" className="tour-form" placeholder="Add Comment Here" onChange={this.handleChange}></textarea>
                        </div>
                         <div className="col-lg-4">
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                          <button type="submit" style={{'float': 'right'}} className="uploadsavecancel">{buttonText}</button>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-6">
                           <input style={{'float': 'left', 'minWidth':'93px'}} type="button"  className="uploadsavecancel"  onClick={()=>this.cancelButton()}   value="Cancel"/>
                        </div>
                     </div>
                     </div>
                    </form>
                <div className="col-lg-12">
                    <div className="allocate-table">
                    <Table bsPrefix  hover size="sm" className="allocate-tbl">
                    <thead style={{backgroundColor: "#dfddde"}} >
                      <tr>
                       <th className="allocate-head">Vehicle Number</th>
                        <th className="allocate-head">Device</th>
                        <th className="allocate-head">Edit</th>
                      </tr>
                    </thead>
                        <tbody >
                          {this.state.vehicleData.map((vehicle) => (
                          <tr className="allocate-r">
                          <td className="allocate-head">{vehicle.vehicle_number}</td>
                            <td className="allocate-head">{vehicle.device_name}</td>
                           <td className="allocate-head" ><center><FontAwesomeIcon icon={faEdit} onClick={() => this.editAllocate(vehicle)} /></center></td>
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
export default VehicleAllocate;
