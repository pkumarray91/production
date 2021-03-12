import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFacebook, faInstagram, faGoogle} from '@fortawesome/free-brands-svg-icons';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import LoginService from '../service/PostData'


const loginService = new LoginService();

class Login extends React.Component {
    constructor(props) {
    super(props);
    this.state = {
    loggedIn: false,
      input: {},
      errors: {},


    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){

  const currentURL = window.location.href
  console.log("currentURL : ",currentURL)
  }
  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    if (event.target.name==="email")
      this.validateEmail();
    if (event.target.name==="pwd")
      this.validatePassword();
    this.setState({
      input
    });
  }

  handleSubmit(event) {
    event.preventDefault();
//     console.log('welcome to react')
     if(this.validatePassword() && this.validateEmail() && this.authenication()){
        let input = {};

        input["pwd"] = "";
        input["email"] = "";


        this.setState({input:input});


    }

//const logout = () => {
//    localStorage.removeItem('token');
//    localStorage.removeItem('expirationDate');
//    return {
//        type: actionTypes.AUTH_LOGOUT
//    };
//}
//
//const checkAuthTimeout = expirationTime => {
//    return dispatch => {
//        setTimeout(() => {
//            dispatch(logout());
//        }, expirationTime * 1000)
//    }
//}
//checkAuthTimeout(expirationTime){
//    return (
//         setTimeout(() => {
//            localStorage.removeItem('token');
//            localStorage.removeItem('expirationDate');
//        }, expirationTime * 1000)
//
//    )
//
//
//}



    loginService.login(
         {
          "email": this.state.input.email,
          "password":this.state.input.pwd ,
          "currentURL" :  window.location.href,
           "is_deleted":false,

      }
      )
      .then(res => {

            const token = res.data.auth_token;

//            const expirationDate = new Date(new Date().getTime() + 10 * 1000);
            localStorage.setItem('token', token);
            this.setState({
                islogged: true
            });
            if (localStorage.getItem('token')) {
//              this.props.history.push('/Hello')
                if (res.data.is_superuser){
                    window.location.href="/superuser"
                }

                else if(res.data.user_type === '1' ){
                    console.log("user_type : ",res.data.user_type)

                    window.location.href ='/reseller'

                }
                else if(res.data.user_type==='2') {
                    window.location.href='/LiveTracking'

                }

                else {
                    //window.location.href='/LiveTracking'
                     alert('please contact to your reseller for more details!!');
                }



            }
//            localStorage.setItem('expirationDate', expirationDate);
        })
       .catch(()=>{
         alert('please enter correct email and password');
      });
      }
//      let token = localStorage.getItem('JWT_Token')
//  const { exp } = jwtDecode(token)
//  const expirationTime = (exp * 1000) - 60000
//  if (Date.now() >= expirationTime) {
//    localStorage.clear();
//    history.push('/login');
//  }

//  authenication = () => {
//    const { state = {} } = this.props.location;
//    const { prevLocation } = state;
//
//    this.setState(
//      {
//        loggedIn: true,
//      },
//      () => {
//        this.props.history.push(prevLocation || "/Hello");
//      },
//    );
//  };
  validatePassword(){
      let input = this.state.input;
      let errors = {};
      let isValid = true;
      if (!input["pwd"]) {
        isValid = false;
        errors["pwd"] = "Please enter your Password.";
      }
     if (typeof input["pwd"] !== "undefined") {
      var pattern = new RegExp(/^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{7,}$/);
      if (!pattern.test(input["pwd"])) {
          isValid = false;

        }
     }
     this.setState({
        errors: errors
      });
      return isValid;
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
   const { state = {} } = this.props.location;
    const { error } = state;
      return(
        <div>< img src = {process.env.PUBLIC_URL + '/background.png' } alt="Background" className="bg" />
            <div  className="center" ><center><img src = {process.env.PUBLIC_URL + '/logo.svg' } alt="Logo" className="logo" /><br/></center>
                 <div>
                    <form>
                        <div class="form-group"> <label for="email"></label>
                        <input type="text" name="email" value={this.state.input.email}  onChange={this.handleChange} class="form-control" placeholder="Enter email"
                        id="email" />
                        <div className="text-danger">{this.state.errors.email}</div>
                        </div>
                        <div class="form-group">
                        <label for="pwd"></label>
                        <input type={isPasswordShown ? "text" : "password"} name="pwd" value={this.state.input.pwd}  onChange={this.handleChange} class="form-control" placeholder="Enter Password"
                        id="pwd"/>
                        <div className="eye" >

					   <FontAwesomeIcon icon={isPasswordShown ? faEyeSlash : faEye}  onClick={this.togglePasswordVisiblity}/>
					   </div>
                        <div className="text-danger">{this.state.errors.pwd}</div>
                        </div>
                            <input type="button" value="Login" onClick={this.handleSubmit} class="btn btn-primary" />
                    <div className="text  text-right"><a href="/forget"> Forgot password?</a></div>
                    <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-5 col-5 line"></div>
                    <div className="col-lg-2 col-md-2 col-sm-2 col-2"><h5 className="or1"> or</h5></div>
                    <div className="col-lg-5 col-md-5 col-sm-5 col-5 line"></div>
                    </div>
                    <div className="row social">
                    <div className="col-lg-4 col-md-4 col-sm-4 col-4"><a href="https://www.google.com"><FontAwesomeIcon icon={faGoogle} size='2x'/></a></div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-4"><a href="https://www.instagram.com/accounts/login"><FontAwesomeIcon icon={faInstagram} size='2x'/></a></div>
                    <div className="col-lg-4 col-md-4 col-sm-4 col-4"><a href="https://www.facebook.com/login.php"><FontAwesomeIcon icon={faFacebook} size='2x'/></a></div>
                    </div>
                    </form>
        </div>
        </div>
        </div>
        );
        }
        }
export default Login;



