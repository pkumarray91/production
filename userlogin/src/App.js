import React from 'react';
import './App.css'
import Login  from './component/Login'
import Forget from './component/Forget'
import Resetpassword from './component/Resetpassword';
import Header  from './component/Reseller/Header'
import TabTrial from './component/Reseller/Company/TabTrial';
import Demo from './component/Demo';
import Demo1 from './component/Demo1';
import ProtectedRoute from './component/ProtectedRoute';
import SuperUserDisplay from './component/Superuser/SuperUserDisplay'
import ResellerDisplay from './component/Reseller/ResellerDisplay'
import SideDrawer from './component/Reseller/Company/LiveTracking/SideDrawer'
import TourSideDrawer from './component/Reseller/Company/TourPlanning/TourSideDrawer';
import GeoSideDrawer from './component/Reseller/Company/GeoFencing/GeoSideDrawer';
//import Fueldisplay from './component/Reseller/Company/fuelmanagement/Fueldisplay';

import {BrowserRouter as Router,Route, Switch,Redirect} from "react-router-dom";

function App() {
 const LoginContainer = () => (
          <div className="container">
            <Route path="/Login" component={Login} />
          </div>
        )

     const DefaultContainer = () => (
        <div>
          <Header/>
          <TabTrial/>
              <Route path="/LiveTracking" component={SideDrawer} />
              <Route path="/Demo" component={Demo} />
              <Route path="/GeoFencing" component={GeoSideDrawer} />
              <Route path="/TourPlanning" component={TourSideDrawer} />
        </div>
     )
  return (

          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/forget" component={Forget} />
              <Route path="/resetpassword" component={Resetpassword} />
              <Route path="/superuser" component={SuperUserDisplay}/>
              <Route path="/reseller" component={ResellerDisplay}/>
              <Route component={DefaultContainer}/>
            </Switch>
          </Router>
  );
}
export default App;

//import React from 'react'
//import { BrowserRouter, Switch, Route } from 'react-router-dom'
//import ProtectedRoute from './component/ProtectedRoute';
//import Layout from './Layout'
//import PropTypes from 'prop-types';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css'
//import Login  from './component/Login'
//import Forget  from './component/Forget'
//import Hello from './component/Hello'
//
//
//class App extends React.Component {
//
//    constructor(props){
//        super(props)
//    }
//
//    render(){
//
//      return(
//        <div className="App">
//
//          <BrowserRouter>
//            <Switch>
//              <Route exact path="/" component={Login} />
//              <Route path='/' component={(props) => <Layout {...props} /> } />
//
//
//            </Switch>
//          </BrowserRouter>
//
//        </div>
//      )
//   }
//
// }
//
// App.propTypes = {
//     match: PropTypes.any.isRequired,
//     history: PropTypes.func.isRequired
// }
//export default App;
