import React from 'react';
import LoginService from '../service/PostData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faInfoCircle,faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {OverlayTrigger,Tooltip,Button} from 'react-bootstrap';
const resetService= new LoginService();
class Reset extends React.Component {
    constructor() {
    super();
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

    this.setState({
      input
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('token');
    console.log(myParam)

    if(this.validate()){
        console.log(this.state);

        let input = {};

        input["password"] = "";
        input["confirm_password"] = "";
        this.setState({input:input});

       resetService.resetpassword(
         {
          "password": this.state.input.password,
          "token":myParam ,

      }
      )
      .then((result)=>{
        console.log(result)
        alert('your new password successfully created so you can login in system')

        window.location.href="/"

      })
      .catch(()=>{
         alert('please enter correct email and password');
      });
        alert('Resetpassword is submited');
    }
  }

  validate(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;



      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your password.";
      }

      if (!input["confirm_password"]) {
        isValid = false;
        errors["confirm_password"] = "Please enter your confirm password.";
      }

      if (typeof input["password"] !== "undefined" && typeof input["confirm_password"] !== "undefined") {

        if (input["password"] != input["confirm_password"]) {
          isValid = false;
          errors["password"] = "Passwords don't match.";
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
   render() {
   { const { isPasswordShown } = this.state;
    return (
       <div className="container-fluid bg">
       <div  className="center" ><center><img src = {process.env.PUBLIC_URL + '/logo.svg' } alt="Logo" className="logo" /><br/></center>
       <h5 style={{'color':'#fff'}}>Provide below details to change/reset password</h5>
        <form onSubmit={this.handleSubmit}>
       <div className="form-group">
            <label htmlFor="password" className="text-capitalize font-weight-bold"  style={{'color':'#fff'}}>  </label>
            <input
              type="password"
              name="password"
              value={this.state.input.password}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Enter password"
              id="password" />

              <div className="text-danger">{this.state.errors.password}</div>
          </div>

   <div className="form-group">
  <label htmlFor="password" className="text-capitalize font-weight-bold" style={{'color':'#fff'}}></label>
            <input
              type={isPasswordShown ? "text" : "password"}
              name="confirm_password"
              value={this.state.input.confirm_password}
              onChange={this.handleChange}
              className="form-control"
              placeholder="Re-Enter password"
              id="confirm_password" />
              <div className="resetpwd" >
					   <FontAwesomeIcon icon={isPasswordShown ? faEyeSlash : faEye}  onClick={this.togglePasswordVisiblity}/>
					   </div>
			    <div >
                            {['top'].map((placement) => (
                            <OverlayTrigger
                                key={placement}
                                placement={placement}
                                overlay={
                                <Tooltip id={`tooltip-${placement}`}>
                                Password should contain atleast 1 Capital character 1 Special character and 1 Number.
                                </Tooltip>
                                }>
                                <div className="info"> <FontAwesomeIcon icon={faInfoCircle}/></div>
                            </OverlayTrigger>
                            ))}
                        </div>
              <div className="text-danger">{this.state.errors.confirm_password}</div>
          </div>

          <input type="submit" value="Reset" className="btn btn-primary"/>
           <div className="text  text-center"><a href="/"> Cancel</a></div>
        </form>
        </div>
      </div>
    );
  }
  }
}

export default Reset;