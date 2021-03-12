import React, {Component} from 'react';

import LoginService from '../service/PostData'
import {Redirect, history} from 'react-router-dom'


const forgetService = new LoginService();

class Forget extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
      input: {},
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    if (event.target.name=="email")
      this.validateEmail();

    this.setState({
      input
    });
  }
  handleSubmit(event) {
    event.preventDefault();
     console.log('welcome to react')
     if(this.validateEmail()){
        let input = {};

        input["email"] = "";
        this.setState({input:input});
    }
    forgetService.forgetpassword(
         {
          "email": this.state.input.email,

      }
      )
      .then((result)=>{
        console.log(result)
       alert('please check your mail for change new password and follow the instruction.')
        window.location.href="/"


      })
      .catch(()=>{
         alert('please enter correct email and password');
      });
  }

  validateEmail(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;
      if (!input["email"]) {
        isValid = false;
        errors["email"] = "Please enter your email Address.";
      }
      if (typeof input["email"] !== "undefined") {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(input["email"])) {
          isValid = false;
          errors["email"] = "Please enter valid email address.";
        }
      }
      this.setState({
        errors: errors
      });
      return isValid;
  }


  state = {
    isPasswordShown: false
  };
  togglePasswordVisiblity = () => {
    const { isPasswordShown } = this.state;
    this.setState({ isPasswordShown: !isPasswordShown });
    }
   render()
   { const { isPasswordShown } = this.state;
      return(
        <div>< img src = {process.env.PUBLIC_URL + '/background.png' } alt="Background" className="bg" />
            <div  className="center" ><center><img src = {process.env.PUBLIC_URL + '/logo.svg' } alt="Logo" className="logo" /><br/></center>
                 <div>
                    <form className='container'>
                    <h5 style={{'color':'#fff'}}>Forgot Your Password? Please Enter Your Email Id</h5>
                        <div className="form-group"> <label htmlFor="email"></label>

                        <input type="text" name="email" value={this.state.input.email}  onChange={this.handleChange} className="form-control" placeholder="Enter email"
                        id="email" />
                        <div className="text-danger">{this.state.errors.email}</div>
                        </div>
                        <input type="button" value="submit" onClick={this.handleSubmit} class="btn btn-primary" />
                        </form>
        </div>
        </div>
        </div>
        );
        }
        }
export default Forget