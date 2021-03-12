import React, {Component} from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCar,  faThumbtack,faTruck,faMotorcycle} from '@fortawesome/free-solid-svg-icons';
//import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import L from "leaflet";
import FooterModal from './FooterModal'

class SideBar extends Component {

    constructor(props) {
    super(props);
    this.state = {
      paths: [],
      search : '',
      vehicle_status : '',
      modalShow : false,
      backdrop: false

       };
  }

  componentDidMount() {
        let data ;
       axios.get('http://localhost:8000/locationTracking/coordinates/')
       
            .then(res => {
           console.log( "res : ",res)
            data = res.data;
//             console.log("initial data : ",data)
            this.setState({
                paths : data
            });

//                       console.log("state paths : ",this.state.paths)
        })
        .catch(err => {})
    }
    updateSearch(event){
        this.setState({search : event.target.value})
    }
//    updateNumber(event){
//        this.setState({currentNumber : event.target.value});
//         this.setState({modalShow : true});
//    }
     updateDetails(status){
        this.setState({vehicle_status : status});
         this.setState({modalShow : true});
    }

  render() {
  let filtered = this.state.paths.filter(
  (path) => { return path.vehicle_number.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1 ||
                        path.speed.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
  }
);

    var sidebarClass = this.props.isOpen ? "sidebar open" : "sidebar";
    return (
      <div className={sidebarClass}>
      <button onClick={this.props.toggleSidebar} className="sidebar-toggle">
          <img src={this.props.isOpen ? process.env.PUBLIC_URL + '/Elements/left.svg' : process.env.PUBLIC_URL + '/Elements/right.svg'} alt="arrow" />

        </button>
        <div className=" v-list scrollareaht ">
                <form>
                     <input className="side-search" value={this.state.search} onChange={this.updateSearch.bind(this)} placeholder="Search for..."  />
                </form>
                <div className="breadcum">
                    <div className="">
                        <a href="">SAPAS ></a>
                        <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                        <a href="">Eastzone ></a>
                        <i className="fa fa-angle-double-right" aria-hidden="true"></i>
                        <a href="">Eastwestern</a>
                     </div>
                </div>
                {filtered.map((path, index) => (
                     <div key={index}>

                        <div className="row seperator side-details" onClick={() => this.updateDetails(path.vehicle_status)}>
                                <div className="col-lg-2 col-md-2 col-sm-2 " >
                                   <img src={process.env.PUBLIC_URL + '/Elements/'+path.icon+'.svg'} style={{'width':'24px'}}/>
                                </div>
                                <div className="col-lg-4 col-md-5 col-sm-5"  style={{'margin':'-1px'}}>
                                <p>{path.vehicle_number}</p>
                                </div>
                                {/*<div className="col-lg-1 col-md-1 col-sm-1 ">
                                   <FontAwesomeIcon icon={faThumbtack} size='1x' color='#005383'/>
                                </div>*/}
                                <div className="col-lg-6 col-md-3 col-sm-3 text text-right">
                                    <p>{path.speed}</p>
                                </div>
                        </div>


                     </div>
                ))}
                <FooterModal
                            show={this.state.modalShow}
                            onHide={() =>  this.setState({modalShow : false})}
                            vehicle_status={this.state.vehicle_status}
                            backdrop={this.state.backdrop}
                            paths={this.state.paths}
                          />

            </div>


      </div>
    );
  }
}

export default SideBar;