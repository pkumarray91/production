/* global google */
import React, {Component,useState} from 'react';
import {Button, Collapse} from 'react-bootstrap';
import './superuserscreen.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCar,  faThumbtack,faTruck,faMotorcycle} from '@fortawesome/free-solid-svg-icons';
import { IconContext } from 'react-icons';
import Table from 'react-bootstrap/Table'
import LoginService from '../../service/PostData';
import {Nav,Row,Col,Modal,Tab,TabContainer} from 'react-bootstrap';
import axios from 'axios';

const registerResellerService = new LoginService();

//----Simple form validation---------------------------
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};

class SuperUserScreen extends React.Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
        first_name : null,
        last_name : null,
        company_name : null,
        url : null,
        email : null,
        password : null,
        confirm_password : null,
        contact_number : null,
        errors : {
            first_name : '',
            last_name : '',
            company_name : '',
            email : '',
            password : '',
            confirm_password : ''

        }
    }
 }


   handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    switch (name) {
      case 'first_name':
        errors.first_name =
          value.length < 3
            ? 'First Name must be at least 3 characters long!'
            : '';
        break;

      case 'last_name':
        errors.last_name =
          value.length < 3
            ? 'Last Name must be at least 3 characters long!'
            : '';
        break;
      case 'company_name':
        errors.company_name =
          value.length < 5
            ? 'Company Name must be at least 3 characters long!'
            : '';
        break;
      case 'email':
        errors.email =
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password':
        errors.password =
          value.length < 8
            ? 'Password must be at least 8 characters long!'
            : '';
        break;

      case 'confirm_password' :
             errors.confirm_password =
              (this.state.password !== this.state.confirm_password) && ( value.length < 8)
                    ? "Password don't match"
                    : '';
             break;

      default:
        break;
    }
    this.setState({errors, [name]: value});
 }

  handleRegisterFormSubmit = (event) =>{
    event.preventDefault();
    this.setState({  first_name: '', last_name: '', company_name: '',  email: '', password: '', confirm_password: '', contact_number: '', url:''})
    if(validateForm(this.state.errors)) {
      console.info('Valid Form')
       console.log("submit : ",this.state)
        let data = {
            id : this.state.id,
            first_name : this.state.first_name,
            last_name : this.state.last_name,
            company_name : this.state.company_name,
            url : this.state.url,
            email : this.state.email,
            password : this.state.password,
            user_type : '1',
            category_type : '1',
            contact_number : this.state.contact_number

        };
        console.log("dataaaa :",data)
      if (this.state.id === null || this.state.id ===undefined){
             alert("Reseller register  done successfully")
            this.props.createReseller(data);
        }
        else
             alert("Reseller update  done successfully")
            this.props.updateReseller(data);
    }
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
            contact_number : '',
        });
    }


  render() {
  var contentClass = this.props.isOpen ? "superusercontent open" : "superusercontent";
   const buttonText = this.props.is_edit ? 'Update': 'Create Reseller';
  const {errors} = this.state;
  const {data} = this.props;
  return (
    <div  className={contentClass} >
      <div className="super-screen">
        <div className="">
            <div className="container-fluid">
              <div className="row">
              <div className="col-lg-2"></div>
                <div className="col-lg-8">
                 <div className="fo">
                  <form id="input_reseller_form" onSubmit={this.handleRegisterFormSubmit}>
                    <div className="form-group ">
                      <div className="row">
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
                          <label className="labelname">Company Name <span style={{'color':'red'}}>*</span></label>
                        </div>
                         <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="text"  name="company_name" className="tour-form" placeholder="Enter Company Name" value={this.state.company_name} onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">URL<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="text"  name="url" className="tour-form" placeholder="Enter Reseller URL" value={this.state.url} onChange={this.handleChange}/>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Email ID<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="email"  name="email" className="tour-form" placeholder="Enter Reseller Email ID" value={this.state.email} onChange={this.handleChange}/>

                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Password<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="password"  name="password" className="tour-form" placeholder="Enter Reseller Password" onChange={this.handleChange}/>
                           {errors.password.length > 0 &&
                                <span className='error'>{errors.password}</span>}
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Confirm Password<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="password"  name="confirm password" className="tour-form" placeholder="Enter Confirm Password" onChange={this.handleChange}/>
                           {errors.confirm_password.length > 0 &&
                            <span className='error'>{errors.confirm_password}</span>}
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label  className="labelname">Contact No.<span style={{'color':'red'}}>*</span></label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <input type="text"  name="contact_number" className="tour-form" placeholder="Enter Contact No." value= {this.state.contact_number} onChange={this.handleChange}/>
                        </div>

                       <div className="col-lg-3 col-md-3 col-sm-4 col-4">
                          <label className="labelname">Address</label>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-8">
                          <textarea style={{'minHeight': '95px'}} name="address" form="usrform" className="tour-form" placeholder="Enter Reseller Address Here"></textarea>
                        </div>
                        <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                          <label  className="labelname"></label>
                        </div>
                        <div className="col-lg-8">
                            <div className="row">
                        <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                           <button type="submit" className="uploadsavecancel">{buttonText}</button>
                        </div>
                        <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                           <input style={{'float': 'left', 'minWidth':'63px'}} type="button"  className="uploadsavecancel"  onClick={()=>this.cancelButton()}   value="Cancel"/>
                        </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  </div>
                </div>
                <div className="col-lg-2"></div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
}
export default SuperUserScreen;