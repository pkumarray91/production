import React from 'react'
import {Route, Redirect } from 'react-router-dom'


//class ProtectedRoute extends React.Component {
//
//    render() {
//        const Component = this.props.component;
//        const isAuthenticated = localStorage.getItem('token');
//
//        return isAuthenticated ? (
//            <Component />
//        ) : (
//            <Redirect to={{ pathname: '/' }} />
//        );
//    }
//}

const ProtectedRoute = ({component : Component,...rest}) =>(
    <Route
    {...rest}

    component = {(props) => (
        localStorage.getItem("token") ? (
        <Component {...props}/>

        ) :
        <Redirect to={{ pathname: '/' }} />
 )}
 />

)

export default ProtectedRoute;