import React, {Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCar,  faThumbtack,faTruck,faMotorcycle} from '@fortawesome/free-solid-svg-icons';
import { IconContext } from 'react-icons';
import {faUpload,faPlus,faEye,faTrash, faEllipsisV} from '@fortawesome/free-solid-svg-icons';
import { Button, Popover, Overlay,OverlayTrigger } from 'react-bootstrap';
import './superuserSidebar.css'
import './superuserscreen.css'

const base_url ='http://140.238.84.255:8000'

class SuperUserSideBar extends Component {
  constructor(props) {
    super(props);
     this.state = {
     isShown: false
    };
}

   deleteResellerUser(reseller_id) {
    console.log("delete id : ",reseller_id)
    axios
    .delete(`${base_url}/sapasuser/Reseller/${reseller_id}/`)
    .then(res => {
    this.props.refresh()
       alert('Reseller Deleted Suceesfully');
       console.log("resttt",res)
    })
    .catch(error => {
        console.log("delette",error)
        alert('Reseller not delete Suceesfully');
    }
    )
   }

popover = (data) => (
<Popover
    onMouseOver={() =>this.setState({isShown:true })}
    onMouseLeave={() =>this.setState({isShown:false }) } style={{'margin': '-20px 0px'}}>
      <Popover.Content>
        <div className="container">
          <div className="row optionspopup">
            <div className="col-lg-12 col-md-12" >
              <h6 style={{'fontSize': '12px'}} onClick={() => this.props.editReseller(data)}>Edit Reseller</h6>
            </div>
          </div>
          <div className="row ">
            <div className="col-lg-12 col-md-12">
            <h6 style={{'fontSize': '12px'}} onClick={() =>{if(window.confirm('Are you sure to delete this Reseller?')){ this.deleteResellerUser(data.id);}}}>Delete Reseller</h6>
            </div>
          </div>
        </div>
      </Popover.Content>
    </Popover>
);

  render() {

    var sidebarClass = this.props.isOpen ? "superusersidebar open" : "superusersidebar";
    return (
      <div className={sidebarClass} style={{'min-height':'93vh'}} >
        <div onClick={this.props.toggleSidebar} className="sidebar-toggle">
          <img src={this.props.isOpen ? process.env.PUBLIC_URL + '/Elements/left.svg' : process.env.PUBLIC_URL + '/Elements/right.svg'} alt="arrow" />
        </div>
        <div className="v-list ">
            <form>
                <input className="side-search" placeholder="Search for..."  />
            </form>
            <div className="breadcum">
              <div className="">
                <a href="">SAPAS &gt;</a>
                  <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                <a href="">Eastzone &gt;</a>
                  <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                <a href="">Eastwestern</a>
              </div>
            </div>
            <div className="collapase-box" >
             <div className="row">
                <div className="col-md-12" style={{'cursor':'pointer'}} >
                    <p className="new">Create Reseller</p>
                </div>
             </div>
            </div>
            <div className="scrollarea">
                {this.props.resellerData.map((data,index) =>(
                <div key={index}>
                    <div className="row seperator side-details">
                        <div className="col-lg-9" onClick = {() => window.location.href =data.user_url + 'reseller' }> {/*data.user_url + 'reseller'*/}
                           <p>{data.first_name+' '+data.last_name}</p>
                        </div>
                        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={this.popover(data)}>
                        <div className="col-lg-2" >
                        <FontAwesomeIcon icon={faEllipsisV}/>
                        </div></OverlayTrigger>
                    </div>
                </div>
                ))}
           </div>
        </div>
      </div>
    );
  }
}
export default SuperUserSideBar;
