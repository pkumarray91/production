import React, {useState} from 'react';
import './group.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus,faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import {Modal,Alert,Form,Table } from 'react-bootstrap';
import axios from 'axios'
import LoginService from '../../service/PostData';

const service = new LoginService()

const base_url ='http://140.238.84.255:8000'
class CompanyUser extends React.Component {
  constructor(props, context) {
    super(props, context);
	  this.state = {
		show: false,
		first_name : null,
		last_name : null,
		email : null,
		password : null,
		contact : null,
		companyUserData : [],
		is_edit : false
		};
  }

  getCompanyUser(){
        service.displayCompanyUser(this.props.company_id)
          .then(res => {
            var data = res.data;
            console.log("company user data : ",data)
            this.setState({companyUserData:data});
           console.log("company user data state: ",this.state.companyUserData)
        })
    .catch(err => {});
  }

  componentDidMount(){
    this.getCompanyUser()
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

    editCompanyUser = (data) => {
        this.setState({is_edit : true,id : data.id,first_name : data.first_name,last_name:data.last_name,email : data.email,contact : data.contact_number,category_type:data.category_type})
    }

  handleCompanyUserFormSubmit = (event) => {
    event.preventDefault();
    const _this=this
   this.setState({  first_name: '', last_name: '',  email: '', password: '', confirm_password: '', contact: '',  category_type : ''})
    console.log("submit :",this.state)
    let data = {
        id : this.state.id,
        first_name : this.state.first_name,
	    last_name : this.state.last_name,
		email : this.state.email,
		password : this.state.password,
		contact_number : this.state.contact,
		user_type : '2',
		company : this.props.company_id,
		category_type:this.state.category_type,
		url :  window.location.protocol + "//" + window.location.host + "/"
    }
    console.log("user data : ",data)
//    service.registerCompanyUser(data)
//    .then(function (response) {
//    console.log(response);
//  })
    if(this.state.id === null || this.state.id === undefined){
        service.registerCompanyUser(data)
        .then(function (response) {
        _this.getCompanyUser()
          alert("Company user Register  done successfully")
        console.log(response);
      })  .catch(error => {
         alert("Company user Register not done successfully")
        console.log(error)
    }
    )
    }
    else {
        service.updateCompanyUser(data)
         .then(function (response) {
         _this.getCompanyUser()
         alert("Company user Update  done successfully")
        console.log(response);
      })  .catch(error => {
         alert("Company user Update not done successfully")
        console.log(error)

    }
    )
    }
}

   deleteCompanyUser(id) {
    console.log("delete id : ",id)
    const _this= this
    axios
    .delete(`${base_url}/sapasuser/CompanyUser/${id}/`)
    .then(res => {
        _this.getCompanyUser()
       alert('CompanyUser Deleted Suceesfully');
       console.log("resttt",res)
    })
    .catch(error => {
        console.log("delette",error)
        alert('CompanyUser not delete Suceesfully');
    }
    )
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
    });
  }

  render() {
  const{ show } = this.state;
  const buttonText = this.state.is_edit ?'Update':'Create'
    return (
        <div>
            <h6 style={{'fontSize': '12px'}} onClick={this.handlePopup}>Add User</h6>
            <Modal show={show} onHide={() =>this.setState({show:false })}  dialogClassName="modal-90w" centered id="popoverbasic"  className="popover_modal">
                <div className="head">
                    <Modal.Header closeButton ><div style={{'color':'white'}}> Add Company User</div></Modal.Header>
                </div>
                <Modal.Body className="show-grid">
                    <form id="input_tour_form" onSubmit={this.handleCompanyUserFormSubmit}>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname" >First Name<span style={{'color':'red'}}>*</span></label>
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
                          <input type="password"  name="cpassword" className="tour-form" placeholder="Enter Confirm Password" onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Contact No.<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="text"  name="contact" className="tour-form" placeholder="Enter Contact No." value={this.state.contact} onChange={this.handleChange}/>
                        </div>
                       { /*<div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Description</label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <textarea style={{'minHeight': '65px'}} name="descriptions" form="usrform" className="tour-form" placeholder="Add Comment Here"></textarea>
                        </div>*/}
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Category Type<span style={{'color':'red'}}>*</span></label>
                        </div>
                         <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                            <select name="category_type" value={this.state.category_type} className="tour-form"  placeholder="select" onChange={this.handleChange}>
                                <option>-----select-----</option>
                                <option value="2">Sales</option>
                                <option value="3">Marketing</option>
                            </select>
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
                           <input style={{'float': 'left', 'minWidth':'93px'}} type="button"  className="uploadsavecancel" onClick={()=>this.cancelButton()} value="Cancel"/>
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
                       <th className="allocate-head">First Name</th>
                        <th className="allocate-head">Last Name</th>
                        <th className="allocate-head">Email</th>
                        <th className="allocate-head">Contact No.</th>
                        <th className="allocate-head">Edit</th>
                        <th className="allocate-head">Delete</th>
                      </tr>
                    </thead>
                    {
                         this.state.companyUserData.map((data,index) =>(

                        <tbody >
                          <tr className="allocate-r">
                          <td className="allocate-head">{data.first_name}</td>
                          <td className="allocate-head">{data.last_name}</td>
                          <td className="allocate-head">{data.email}</td>
                          <td className="allocate-head">{data.contact_number}</td>
                            <td className="allocate-head" ><center><FontAwesomeIcon icon={faEdit} onClick={() => this.editCompanyUser(data)}/></center></td>
                            <td className="allocate-head" ><center><FontAwesomeIcon icon={faTrash} onClick={() =>{if(window.confirm('Are you sure to delete this company user?')){this.deleteCompanyUser(data.id)}}}/></center></td>
                          </tr>
                        </tbody>
                        ))}
                        </Table>
                    </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
    }
}
export default CompanyUser;
