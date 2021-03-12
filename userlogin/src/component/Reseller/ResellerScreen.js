/* global google */
import React, {Component,useState} from 'react';
import {Button, Collapse} from 'react-bootstrap';
import './resellerscreen.css';
//import './SideBar.css';
import {faUpload,faPlus,faEye,faTrash, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCar,  faThumbtack,faTruck,faMotorcycle,faEdit} from '@fortawesome/free-solid-svg-icons';
import { IconContext } from 'react-icons';
import Table from 'react-bootstrap/Table'
import {Nav,Row,Col,Modal,Tab,TabContainer,Tabs,Alert} from 'react-bootstrap';
//import axios from 'axios'
import CSVFileValidator from 'csv-file-validator'
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";
import axios, { CancelToken, isCancel } from "axios";
import { ProgressBar } from "react-bootstrap";
import LoginService from '../../service/PostData';

const service = new LoginService();
const base_url ='http://140.238.84.255:8000'

const requiredError = (headerName, rowNumber, columnNumber) => {
        return `<div class="red">${headerName} is required in the <strong>${rowNumber} row</strong> / <strong>${columnNumber} column</strong></div>`
    }
const validateError = (headerName, rowNumber, columnNumber) => {
        return `<div class="red">${headerName} is not valid in the <strong>${rowNumber} row</strong> / <strong>${columnNumber} column</strong></div>`
    }
const uniqueError = (headerName) => {
        return `<div class="red">${headerName} is not unique</div>`
    }
const isValueValid = function (value) {
        const reqExp = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/
        return reqExp.test(value)
    }
const CSVConfig = {
    headers: [
        { name: 'From (Volt)', inputName: 'from_volt', required: true, requiredError,validate: isValueValid, validateError },
        {name: 'Upto (Volt)',inputName: 'to_volt', required: true, requiredError,validate: isValueValid, validateError },
        {name: 'Start Fuel',inputName: 'from_fuel', required: true, requiredError ,validate: isValueValid, validateError },
        { name: 'Stop Fuel' , inputName: 'to_fuel', required: true, requiredError ,validate: isValueValid, validateError}
    ]
}
class ResellerScreen extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			company_name : null,
			first_name : null,
			last_name : null,
			email : null,
			password : null,
			contact : null,
			address:null,
			category_type : null,
			gst: null,
			descriptions: null,
			R_first_name : null,
			R_last_name : null,
			R_email : null,
			R_contact : null,
			device_type : 'tracking device',
            device_name : '',
            GSM_number : '',
            ICCID_number : '',
            IMEI_number : '',
            vehicleDevice : [],
			sensor_id : '',
			tank_capacity : '',
			device : '',
			file : '',
			fileData : [],
			uploadPercentage:0,
			csvErrors:[]

		};
    }


handleDeviceTypeChange = (event) => {
     event.preventDefault();
     this.setState({device_type : event.target.value})
//     console.log("device type:",this.state.device_type)
    if ((this.state.device_type === 'tracking device' || this.state.device_type === 'fuel sensor') && (this.state.GSM_number !== '' || this.state.ICCID_number !== '' || this.state.IMEI_number !== '')){
        this.setState({GSM_number : '',ICCID_number : '',IMEI_number : ''})
    }
}

  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    this.setState({[name]: value});
  }
handleVehicleChange = (event) => {
    event.preventDefault();
     this.setState({vehicle_id : event.target.value})
     service.getVehicleDevice(event.target.value)
     .then(res => {
          var data = res.data;
          console.log("Vehicle Device  : ",data)
          this.setState({vehicleDevice:data});
         console.log("Vehicle Device data state: ",this.state.vehicleDevice)
      })
  .catch(err => {});

}
  handleRegisterFormSubmit = (event) => {
    event.preventDefault();
    const _this=this
    this.setState({company_name:'', first_name: '', last_name: '',  email: '', password: '', confirm_password: '', contact: '', gst: '', address: ''})
    console.log("submit :",this.state)
    let data = {
        id : this.state.id,
        name : this.state.company_name,
        first_name : this.state.first_name,
        last_name : this.state.last_name,
		email : this.state.email,
		password : this.state.password,
		contact_number : this.state.contact,
		address : this.state.address,
		gst: this.state.gst,
		user_type : '2',
        category_type : '1',
        url :  window.location.protocol + "//" + window.location.host + "/"
    }
    console.log("company data : ",data)
    if(this.state.id === null || this.state.id === undefined){
        service.registerCompany(data)
        .then(function (response) {
        _this.props.refresh()
        alert("Company Register  done successfully")
        console.log(response);
         })
         .catch(error => {
            alert("Company Register not done successfully")
            console.log(error)
         })
    }
    else{
        service.updateCompany(data)
        .then(function (response) {

        _this.props.refresh()

        alert("Company update done successfully")
        console.log(response);
        })
        .catch(error => {
        alert("Company update not done successfully")
        console.log(error)
        }
        )
        this.setState({id:null})
    }
}


  handleRegisterResellerUserFormSubmit = (event) => {
    event.preventDefault();
    this.setState({ category_type:'', descriptions:'', R_first_name: '', R_last_name: '',  R_email: '', password: '', confirm_password: '', R_contact: '',  address: ''})
    const _this = this
    console.log("submit :",this.state)
    let data = {
        id : this.state.id,
        first_name : this.state.R_first_name,
	    last_name : this.state.R_last_name,
			email : this.state.R_email,
			password : this.state.password,
			contact_number : this.state.R_contact,
			user_type : '1',
			category_type : this.state.category_type,
			url :  window.location.protocol + "//" + window.location.host + "/"

    }
    console.log("Reseller User : ",data)
     if (this.state.id === null || this.state.id ===undefined){
            service.registerResellerUser(data)
             .then(function (response) {
             _this.props.refreshReseller()
             alert("Reseller user Register done successfully")
                console.log(response);
              })  .catch(error => {
         alert("Reseller user Register not done successfully")
        console.log(error)
    }
    )
        }
    else
          {
            service.updateResellerUser(data)
              .then(function (response) {
              _this.props.refreshReseller()
               alert("Reseller user update done successfully")
                console.log(response);
              }).catch(error => {
                alert("Reseller user update not done successfully")
                console.log(error)
                }
                )
                this.setState({id : null})
          }
  }

   deleteResellerUser(id) {
    console.log("delete id : ",id)
    const _this= this
    axios
    .delete(`${base_url}/sapasuser/ResellerUserRegister/${id}/`)
    .then(res => {
        _this.props.refreshReseller()
       alert('ResellerUser Deleted successfully');
       console.log("resttt",res)
    })
    .catch(error => {
        console.log("delette",error)
        alert('ResellerUser not delete successfully');
    }
    )
   }

    editResellerUser = (reseller) => {
     const _this= this

    this.setState({id : reseller.id,R_first_name:reseller.first_name,R_last_name:reseller.last_name,R_email : reseller.email,R_contact:reseller.contact_number,category_type : reseller.category_type})
       _this.props.refreshReseller()

    }

  cancelButton()  {
    this.setState({
        first_name : '',
        last_name : '',
        company_name : '',
        url : '',
        email : '',
        password : '',
        confirm_password : '',
        contact : '',
        gst:'',
        category_type : '',
        address:'',
        R_first_name : '',
        R_last_name : '',
        R_email : '',
        R_contact : '',
        device_name:'',
        GSM_number:'',
        ICCID_number:'',
        IMEI_number:'',


    });
  }

 handleDeviceFormSubmit = (event) => {
    event.preventDefault();
    this.setState({ device_name:'', ICCID_number:'', GSM_number: '', MEI_number: ''})
    const _this = this
    console.log("submit :",this.state)
    let data = {
            device_id : this.state.device_id,
            device_name : this.state.device_name,
            device_type : this.state.device_type,
	        GSM_number : this.state.GSM_number,
			ICCID_number : this.state.ICCID_number,
			IMEI_number : this.state.IMEI_number,
			url : window.location.protocol + "//" + window.location.host + "/"
    }
    console.log("Device : ",data)

   if (this.state.device_id === null || this.state.device_id ===undefined){
            service.registerDevice(data)
              .then(res => {
              _this.props.refreshDevice()
                 alert('Device Register Done successfully');
                console.log("resttt",res)
                 })
        }
    else
          {
            service.updateDevice(data)
              .then(function (response) {
              _this.props.refreshDevice()
                alert("Device Update done successfully");
                console.log(response);
              })

              this.setState({device_id:null})

          }
}

  deleteDevice(device_id) {
  const _this = this
    console.log("delete id : ",device_id)
    axios
    .delete(`${base_url}/sapasuser/DeviceRegister/${device_id}/`)
    .then(res => {
     _this.props.refreshDevice()
       alert('Device Deleted successfully');
       console.log("resttt",res)
    })
    .catch(error => {
        console.log("delette",error)
        alert('Device not delete successfully');
    }
    )
   }


    editDeviceData = (device) => {
    const _this = this

    this.setState({device_id : device.device_id,device_name:device.device_name,GSM_number:device.GSM_number,ICCID_number : device.ICCID_number,IMEI_number:device.IMEI_number,device_type:device.device_type})
    _this.props.refreshDevice()
    }

validateFile = (event) => {
    var file = event.target.files[0]
    console.log("in file:",file)
   this.setState({file : event.target.files[0]});
//   console.log("state file :",this.state.file)
    console.log(event.target.files[0])
    CSVFileValidator(event.target.files[0], CSVConfig)
        .then(csvData => {
            csvData.inValidMessages.forEach(message => {
                document.getElementById('invalidCalibrationError').insertAdjacentHTML('beforeend', message)
            })
//        console.log(csvData.inValidMessages)
//          console.log(csvData.inValidMessages.length === 0)
        if (csvData.inValidMessages.length === 0){
            this.setState({fileData : csvData.data})
        }
        console.log("fileData : ",this.state.fileData)
//        console.log(csvData.data)
        })
}

parseFile = (fileData,device,sensor_id) => {
       for(var i=0;i<fileData.length;i++){
            fileData[i]["device"] =device
            fileData[i]["sensor_id"] =sensor_id
//            console.log("fileData send : ",fileData[i])

       }
}


handleFuelCalibrationFormSubmit = (event) => {
 event.preventDefault();
    let file = new FormData();
    file.append("file", this.fileInput.files[0]);
//    console.log("file progress : ",file)
     let fueldata = {
      id : this.state.id,
      vehicle_id : this.state.vehicle_id,
      tank_capacity : this.state.tank_capacity,
       sensor_id : this.state.sensor_id,
       device : this.state.device,
//       file : this.state.file
  }
     const options = {
            onUploadProgress: progressEvent => {
                const { loaded, total } = progressEvent;

                let percent = Math.floor((loaded * 100) / total);
                console.log( `${loaded}kb of ${total}kb | ${percent}%` );
                if (percent < 100) {
                    this.setState({uploadPercentage : percent});
                }
            }
        };
         service.audit(file,options)
             .then(res => {
                console.log(res);
                this.setState({uploadPercentage : 100});

                setTimeout(() => {
                    this.setState({uploadPercentage : 0})
                }, 1000);
                return res.status
            })
            .then(status => {
//                    console.log("status received : ",status)
                    if(status === 200){
                             service.registerFuelCalibration(fueldata)
                              .then(res =>{
                                    return res
                              })
                              .then(fuelCalibrationRes =>{
                                    console.log("fuelCali :",fuelCalibrationRes)
                                    if(fuelCalibrationRes.status === 200){
                                        for(var i=0;i<this.state.fileData.length;i++){
                                                this.state.fileData[i]["fuelmgmt_id"] =fuelCalibrationRes.data["fuelmgmt_id"]
//                                                console.log("fileData send : ",this.state.fileData[i])
                                                service.registerFuelCalibrationData(this.state.fileData[i])
                                                .then(res =>{
//                                                   console.log("fuel data:",res)
                                                    if(i === this.state.fileData.length )
                                                        console.log(i +' '+res.data['message'])
                                                })

                                        }
                                    }
                              })
                    }

            })
//            .then(res => {
//                console.log(res);
//            })
            .catch(err => {
                console.log(err);


            });

//  event.preventDefault();
////  this.setState({ vehicle_id:'', sensor_id:'', device: '', fuel_capacity:''})
////  const _this = this
//  console.log("submit :",this.state)
//  let data = {
//      id : this.state.id,
//      vehicle_id : this.state.vehicle_id,
//      tank_capacity : this.state.tank_capacity,
//       sensor_id : this.state.sensor_id,
//       device : this.state.device,
////       file : this.state.file
//  }
//
//  let file = new FormData();
//   file.append('file',this.state.file)
////  Promise.all([
////	fetch('https://jsonplaceholder.typicode.com/posts'),
////	fetch('https://jsonplaceholder.typicode.com/users')
////]).then(function (responses) {
////	// Get a JSON object from each of the responses
////	return Promise.all(responses.map(function (response) {
////		return response.json();
////	}));
////}).then(function (data) {
////	// Log the data to the console
////	// You would do something with both sets of data here
////	console.log(data);
////}).catch(function (error) {
////	// if there's an error, log it
////	console.log(error);
////});
//  console.log("Fuel Calibration : ",data)
//   if (this.state.id === null || this.state.id ===undefined){
//        Promise.all([service.registerFuelCalibration(data),
//                      service.audit(file),
//                      this.parseFile(this.state.fileData,this.state.device,this.state.sensor_id)
//
//                ])
//           .then(function (responses) {
////           _this.props.refreshReseller()
//           return Promise.all(responses.map(function (response) {
//            		return response.data;
//            	}));
//           alert("Fuel Calibration Registered successfully!")
////              console.log(response);
//            })
////            .then(function (data) {
////            	// Log the data to the console
////            	// You would do something with both sets of data here
////            	console.log(data);
////            })
//            .catch(error => {
//                    alert("Fuel Calibration Registration failed!")
//                         console.log(error)
//  }
//  )
// }
//  else
//        {
//          service.updateFuelCalibration(data)
//            .then(function (response) {
////            _this.props.refreshReseller()
//             alert("Fuel Calibration Updated successfully!")
//              console.log(response);
//            }).catch(error => {
//              alert("Fuel Calibration update failed!")
//              console.log(error)
//              }
//              )
//              this.setState({id : null})
//        }
}

cancelFuelCalibration = () => {
    if (this.cancelFileUpload.current)
            this.cancelFileUpload.current("User has canceled the file upload.");
}


  render() {
   var contentClass = this.props.isOpen ? "content open" : "content";
  const buttonText = this.props.is_edit ? "Update" : "Create"
   const {uploadPercentage} = this.state;
   const {csvErrors} = this.state;
  return (
    <div  className={contentClass} >
      <div className="reseller-screen">
        <div className="" >
            <div className="container-fluid">
            <div className="col-lg-12">
              <div className="row">
              <div className="col-lg-2">
              </div>
                <div className="col-lg-8">
                <Tabs defaultActiveKey="AddCompany" id="uncontrolled-tab-example">
                  <Tab eventKey="AddCompany" title="Create Company">
                    <div className="fo">
                  <form id="input_company_form" onSubmit={this.handleRegisterFormSubmit}>
                    <div className="form-group ">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Company Name <span style={{'color':'red'}}>*</span></label>
                        </div>
                         <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="text"  name="company_name" className="tour-form" placeholder="Enter Company Name" value={this.state.company_name} onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">First Name<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="text"  name="first_name" className="tour-form" placeholder="Enter First Name" value={this.state.first_name} onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Last Name<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="text"  name="last_name" className="tour-form" placeholder="Enter Last Name" value={this.state.last_name} onChange={this.handleChange}/>
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">GST No.<span style={{'color':'red'}}>*</span></label>
                        </div>
                         <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="text"  name="gst" className="tour-form" placeholder="Enter Your Company GST No." value={this.state.gst} onChange={this.handleChange}/>
                        </div>

                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Email ID<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="email"  name="email" className="tour-form" placeholder="Enter User Email ID" value={this.state.email} onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Password<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="password"  name="password" className="tour-form" placeholder="Enter Password" onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Confirm Password<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="password"  name="confirm_password" className="tour-form" placeholder="Enter Confirm Password" onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Contact No.<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="text"  name="contact" className="tour-form" placeholder="Enter Contact No." value={this.state.contact} onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Address</label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <textarea style={{'minHeight': '65px'}} name="address" form="usrform" className="tour-form" placeholder="Enter Reseller Address Here" value={this.state.address} onChange={this.handleChange}></textarea>
                        </div>

                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                          <label  className="labelname"></label>
                        </div>
                        <div className="col-lg-8">
                            <div className="row">
                       <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                          <button type="submit" style={{'float': 'right'}} className="uploadsavecancel">{buttonText}</button>
                        </div>
                        <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                           <input style={{'float': 'left', 'minWidth':'93px'}} type="button" onClick={()=>this.cancelButton()}  className="uploadsavecancel" value="Cancel"/>
                        </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  </div>
                  </Tab>
                  <Tab eventKey="reselleruser" title=" Create Reseller User">
                     <div className="fo">
                     <form id="input_tour_form"  onSubmit={this.handleRegisterResellerUserFormSubmit}>
                    <div className="form-group ">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">First Name<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="text"  name="R_first_name" value={this.state.R_first_name} className="tour-form" placeholder="Enter First Name" onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Last Name<span style={{'color':'red'}}>*</span></label>
                        </div>

                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="text"  name="R_last_name" value={this.state.R_last_name} className="tour-form" placeholder="Enter Last Name" onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Category Type<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                            <select name="category_type" value={this.state.category_type} className="tour-form"  placeholder="select" onChange={this.handleChange}>
                                <option>----select----</option>
                                <option value="2">Sales</option>
                                <option value="3">Marketing</option>
                            </select>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Email ID<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="email"  name="R_email" value={this.state.R_email} className="tour-form" placeholder="Enter User Email ID" onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Password<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="password"  name="password" className="tour-form" placeholder="Enter Password" onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Confirm Password<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="password"  name="confirm_password" className="tour-form" placeholder="Enter Confirm Password" onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Contact No.<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="text"  name="R_contact" value={this.state.R_contact} className="tour-form" placeholder="Enter Contact No." onChange={this.handleChange}/>
                        </div>
                       { /*<div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Description</label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <textarea style={{'minHeight': '65px'}} name="descriptions" value={this.state.descriptions} form="usrform" className="tour-form" placeholder="Add Comment Here" onChange={this.handleChange}></textarea>
                        </div>*/}
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                          <label  className="labelname"></label>
                        </div>
                        <div className="col-lg-8">
                            <div className="row">
                        <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                          <button type="submit" style={{'float': 'right'}} className="uploadsavecancel">{buttonText}</button>
                        </div>
                        <div className="col-lg-6 col-md-8 col-sm-8 col-8">
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
                     <th className="allocate-head">Name</th>
                      <th className="allocate-head">Email Id</th>
                      <th className="allocate-head"> Contact No.</th>
                      <th className="allocate-head">Edit</th>
                      <th className="allocate-head">Delete</th>
                    </tr>
                  </thead>
                      <tbody >

                      {this.props.resellerUserData.map((reseller) => (
                        <tr className="allocate-r">

                        <td className="allocate-head">{reseller.first_name + reseller.last_name}</td>
                        <td className="allocate-head">{reseller.email}</td>
                          <td className="allocate-head">{reseller.contact_number}</td>
                          <td className="allocate-head" ><center><FontAwesomeIcon icon={faEdit} onClick={() => this.editResellerUser(reseller)}/></center></td>
                          <td className="allocate-head" ><center><FontAwesomeIcon icon={faTrash} onClick={()=> {if(window.confirm('Are you sure to delete this Reseller user?')){this.deleteResellerUser(reseller.id)}}}/></center></td>
                        </tr>
                        ))}
                      </tbody>
                  </Table>
                    </div>
                    </div>
                  </div>
                  </Tab>
<Tab eventKey="device" title="Add Device" >
    <div className="fo">
        <Tabs defaultActiveKey="Add Device Detail" id="uncontrolled-tab-example">
            <Tab eventKey="Add Device Detail" title="Enter Device Detail">
               <form id="input_tour_form" onSubmit={this.handleDeviceFormSubmit}>
                    <div className="form-group ">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                              <label className="labelname">Device Name<span style={{'color':'red'}}>*</span></label>
                            </div>
                             <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                              <input type="text"  name="device_name" className="tour-form" placeholder="Enter Device Name" value={this.state.device_name || ''} onChange={this.handleChange}/>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                              <label className="labelname">Device Type<span style={{'color':'red'}}>*</span></label>
                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                                <select name="device_type" value={this.state.device_type} className="tour-form"  placeholder="select" onChange={this.handleDeviceTypeChange}>
                                    <option value="tracking device">Tracking Device</option>
                                    <option value="fuel sensor">Fuel Sensor</option>
                                    <option value="temperature sensor">Temperature Sensor</option>
                                </select>
                            </div>
                             <div className="container">
                            {this.state.device_type === 'tracking device' ?
                            <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                              <label className="labelname">GSM No (SIM Card Number)<span style={{'color':'red'}}>*</span></label>
                            </div>
                             <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                              <input type="text"  name="GSM_number" className="tour-form" placeholder="Enter GSM No (SIM Card Number)" value={this.state.GSM_number || ''} onChange={this.handleChange} required/>
                            </div>
                            <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                              <label className="labelname">ICCID No<span style={{'color':'red'}}>*</span></label>
                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                              <input type="text"  name="ICCID_number" className="tour-form" placeholder="Enter ICCID No" value={this.state.ICCID_number || ''} onChange={this.handleChange} required/>
                            </div>
                             <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                                  <label className="labelname">IMEI No<span style={{'color':'red'}}>*</span></label>
                                </div>
                                 <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                                  <input type="text"  name="IMEI_number" className="tour-form" placeholder="Enter IMEI No" value={this.state.IMEI_number || ''} onChange={this.handleChange} required/>
                                </div>
                            </div>
                            :
                            <div className="row">
                                <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                                  <label className="labelname">IMEI No<span style={{'color':'red'}}>*</span></label>
                                </div>
                                 <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                                  <input type="text"  name="IMEI_number" className="tour-form" placeholder="Enter IMEI No" value={this.state.IMEI_number} onChange={this.handleChange} required/>
                                </div>
                            </div>
                            }</div>
                            <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                  <label  className="labelname"></label>
                                </div>
                            <div className="col-lg-8">
                                <div className="row">
                                   <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                                      <button type="submit" style={{'float': 'right'}} className="uploadsavecancel">{buttonText}</button>
                                    </div>
                                    <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                                      <input style={{'float': 'left', 'minWidth':'93px'}} type="button"  className="uploadsavecancel"  onClick={()=>this.cancelButton()}   value="Cancel"/>
                                    </div>
                                 </div>
                            </div>
                      </div>
                    </div>
                </form>
</Tab>
                                <Tab eventKey="Or" title="or" disabled></Tab>
                                <Tab eventKey="Add Device CSV" title="Upload Device CSV">
                                    <form id="input_tour_form">
                                        <div className="form-group ">
                                            <p></p>
                                            <div className="row">
                                                <div className="col-lg-3 col-md-6 text-right" >
                                                    <p>Download sample file below</p>
                                                </div>
                                                <div className="col-lg-8 col-md-6 " >
                                                    <a className="uploadfilearea" href="/DeviceTemplate.csv" download>Device Template.csv</a>
                                                </div>
                                                <div className="col-lg-1 col-md-6 upload">
                                                   <a className="download" href="/DeviceTemplate.csv" download  >
                                                       <div style={{'color':'#fff0'}}>sample</div></a></div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-3 col-md-6 text-right" >
                                                       <p>Upload CSV file below</p>
                                                    </div>
                                                    <div className="col-lg-8 col-md-6 " >
                                                        <div className="uploadfilearea">{/*, File type: {file.type}, File size: {file.size} bytes*/} </div>
                                                    </div>
                                                    <div className="col-lg-1 col-md-6 upload">
                                                        <input className="file-upload-input" type='file' accept=".csv" id="file" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                 <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                                                      <label  className="labelname"></label>
                                                 </div>
                                                <div className="col-lg-8">
                                                    <div className="row">
                                                       <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                                                          <input type="submit" style={{'float': 'right'}} className="uploadsavecancel" value="Add Device"/>
                                                       </div>
                                                       <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                                                           <input style={{'float': 'left', 'minWidth':'93px'}} type="button" onClick={this.cancelButton}  className="uploadsavecancel" value="Cancel"/>
                                                       </div>
                                                    </div>
                                                </div>
                                                <Alert variant="danger">
                                                    <div id="invalidMessages"><Alert.Heading>Error will be Displayed here...</Alert.Heading></div>
                                                </Alert>
                                            </div>
                                    </form>
                                </Tab>
                            </Tabs>
                            <div className="col-lg-12">
                                <div className="allocate-table">
                                    <Table bsPrefix  hover size="sm" className="allocate-tbl">
                                        <thead style={{backgroundColor: "#dfddde"}} >
                                            <tr>
                                                <th className="allocate-head">Device Name</th>
                                                <th className="allocate-head">GSM No.</th>
                                                <th className="allocate-head"> ICCID No</th>
                                                <th className="allocate-head">IMEI No</th>
                                                 <th className="allocate-head">Device Type</th>
                                                <th className="allocate-head">Edit</th>
                                                <th className="allocate-head">Delete</th>
                                            </tr>
                                        </thead>
                                  <tbody >
                                      {this.props.deviceData.map((device) => (
                                        <tr className="allocate-r">
                                         <td className="allocate-head">{device.device_name}</td>
                                         <td className="allocate-head">{device.GSM_number}</td>
                                          <td className="allocate-head">{device.ICCID_number}</td>
                                          <td className="allocate-head">{device.IMEI_number}</td>
                                          <td className="allocate-head">{device.device_type}</td>
                                          <td className="allocate-head" ><center><FontAwesomeIcon icon={faEdit} onClick={() => this.editDeviceData(device)}/></center></td>
                                          {device.available === "Yes" ?
                                          <td className="allocate-head" ><center><FontAwesomeIcon icon={faTrash} onClick={() =>{if(window.confirm('Are you sure to delete this device?')){ this.deleteDevice(device.device_id)}}}/></center></td>:
                                            <td align="center">Cannot Delete</td>
                                          }
                                        </tr> ))}
                                      </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </Tab>

                                <Tab eventKey="fuelmanagement" title="Add Fuel Calibration">
                       <div className="fo">
                       <form id="input_tour_form"  onSubmit={this.handleFuelCalibrationFormSubmit}>
                      <div className="form-group ">
                        <div className="row">
                          <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                            <label className="labelname">Choose Vehicle<span style={{'color':'red'}}>*</span></label>
                          </div>
                          <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                              <select name="vehicle_id" value={this.state.vehicle_id} className="tour-form" onChange={this.handleVehicleChange} placeholder="select">
                                     <option>Select Vehicle</option>
                                     {
                                           this.props.vehicleNumbers.map((vehicle,i) =>
                                           (<option key={i} value={vehicle.vehicle_id}>{vehicle.vehicle_number}</option>))
                                     }
                              </select>
                           </div>
                           <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                                <label className="labelname">Tank Capacity<span style={{'color':'red'}}>*</span></label>
                           </div>
                           <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                                <input type="text"  name="tank_capacity" className="tour-form" placeholder="Enter Tank Capacity" value={this.state.tank_capacity} onChange={this.handleChange} required/>
                           </div>
                          <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                            <label className="labelname">Choose Sensor(s)<span style={{'color':'red'}}>*</span></label>
                          </div>
                          <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                            <select name="sensor_id" value={this.state.sensor_id} className="tour-form" onChange={this.handleChange} placeholder="select">
                                    <option>Select Sensor</option>
                                     {
                                           this.props.fuelsensors.map((device,i) =>
                                           (<option key={i} value={device.device_id}>{device.device_name}</option>))
                                     }
                            </select>
                             {/* <DropdownMultiselect name="sensor" value={this.state.sensor} className="tour-form" placeholder="select" handleOnChange={(selected) => {
                                      this.setState({sensor:selected});
                                    }}
                                    options={this.props.fuelsensors}
                               />*/}

                           </div>
                           <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                            <label className="labelname">Choose Device<span style={{'color':'red'}}>*</span></label>
                          </div>
                          <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                              <select name="device" value={this.state.device} className="tour-form" onChange={this.handleChange} placeholder="select">
                                     <option>Select Device</option>
                                     {
                                           this.state.vehicleDevice.map((device,i) =>
                                           (<option key={i} value={device.device_id}>{device.device_name}</option>))
                                     }
                              </select>
                          </div>
                           <div className="col-lg-3 col-md-6 text-right" >
                                <p>Download sample file below</p>
                            </div>
                            <div className="col-lg-8 col-md-6 " >
                                <a className="uploadfilearea" href="/FuelCalibrationTemplate.csv" download>Fuel Calibration Template.csv</a>
                            </div>
                            <div className="col-lg-1 col-md-6 upload">
                               <a className="download" href="/FuelCalibrationTemplate.csv" download  >
                                   <div style={{'color':'#fff0'}}>sample</div></a></div>
                            <div className="col-lg-3 col-md-6 text-right" >
                                   <p>Upload CSV file below</p>
                                </div>
                                <div className="col-lg-8 col-md-6 " >
                                    <div className="uploadfilearea">{this.state.file.name}</div>
                                </div>
                                <div className="col-lg-1 col-md-6 upload">
                                 <input type="file" id="file" accept=".csv" onChange={this.validateFile} ref={fileInput => (this.fileInput = fileInput)}/><div style={{'color':'#fff0'}}>sample</div>
                                </div>
                                <ProgressBar  style={{'width':'90%'}}>
                                 { uploadPercentage > 0 && <ProgressBar now={uploadPercentage} label={`${uploadPercentage}%`} /> }
                                </ProgressBar>
                                 <Alert variant="danger">
                                            <div id="invalidCalibrationError"><Alert.Heading>Error will be Displayed here...</Alert.Heading></div>
                                 </Alert>
                           <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                            <label  className="labelname"></label>
                          </div>
                          <div className="col-lg-8">
                              <div className="row">
                                  <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                                    <button type="submit" style={{'float' : 'right'}} className="uploadsavecancel" disabled={csvErrors.length > 0} onClick={this.handleFuelCalibrationFormSubmit}>{buttonText}</button>
                                  </div>
                                  <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                                     <input style={{'float': 'left', 'minWidth':'93px'}} type="button"  className="uploadsavecancel"  onClick={()=>this.cancelFuelCalibration()}   value="Cancel"/>
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
                       <th className="allocate-head">Vehicle</th>
                        <th className="allocate-head">Sensor</th>
                        <th className="allocate-head"> Device</th>
                        <th className="allocate-head">CSV filename</th>
                        <th className="allocate-head">Edit</th>
                        <th className="allocate-head">Delete</th>
                      </tr>
                    </thead>
                        <tbody >
                         {this.props.fuelcalibration.map((fueldata) => (
                          <tr className="allocate-r">
                          <td className="allocate-head">{fueldata.vehicle}</td>
                          <td className="allocate-head">{fueldata.sensor}</td>
                            <td className="allocate-head">{fueldata.device_name}</td>
                            <td className="allocate-head"></td>
                            <td className="allocate-head" ><center><FontAwesomeIcon icon={faEdit} /></center></td>
                            <td className="allocate-head" ><center><FontAwesomeIcon icon={faTrash}/></center></td>
                          </tr>
                          ))}
                        </tbody>
                    </Table>
                      </div>
                      </div>
                    </div>
                    </Tab>
              </Tabs>
                </div>
                <div className="col-lg-2"></div>
              </div></div>
            </div>
        </div>
      </div>
    </div>
  );
}
}
export default ResellerScreen;
