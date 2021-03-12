import React, {Component} from 'react';
import ResellerScreen from './ResellerScreen';
import ResellerSideBar from './ResellerSideBar';
import LoginService from '../../service/PostData';
//import '../../css/SideBar.css'
import axios from 'axios'
const base_url ='http://140.238.84.255:8000'
const service = new LoginService();

class ResellerSideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      companyData : [],
      resellerUserData:[],
      deviceData : [],
      vehicleData : [],
      vehicleNumbers :[],
      fuelsensors : [],
      fuelcalibration :[],

      };
      this.company = React.createRef();
  }

getCompany(){
    service.displayCompany(window.location.protocol + "//" + window.location.host + "/")
         .then(res => {
            var data = res.data;
            console.log("company data : ",data)
//            console.log("urlll :", this.state.url)
            this.setState({companyData:data});
           console.log("company data state: ",this.state.companyData)
        })
    .catch(err => {});
}
getResellerUser(){
    service.displayResellerUser(window.location.protocol + "//" + window.location.host + "/")
         .then(res => {
            var data = res.data;
            console.log("reseller user data : ",data)
//            console.log("urlll :", window.location.protocol + "//" + window.location.host + "/")
            this.setState({resellerUserData :data});
           console.log("reseller user state: ",this.state.resellerUserData)
        })
    .catch(err => {});
}

getfuelcalibration(){
    service.displayfuelcalibration(window.location.protocol + "//" + window.location.host + "/")
         .then(res => {
            var data = res.data;
            console.log("fuelcalibration data : ",data)
//            console.log("urlll :", window.location.protocol + "//" + window.location.host + "/")
            this.setState({fuelcalibration :data});
           console.log("fuelcalibration state: ",this.state.fuelcalibration)
        })
    .catch(err => {});
}

getDeviceData(){
    service.displayDevice(window.location.protocol + "//" + window.location.host + "/")
         .then(res => {
            var data = res.data;
            console.log("device data : ",data)
            this.setState({deviceData:data});
           console.log("device data state: ",this.state.deviceData)
           var deviceList = []
           var fuelsensors = []

           for(var i=0;i<data.length;i++){
                if (data[i].available == "Yes" && data[i].device_type == "tracking device"){
                    deviceList.push({
                        key : data[i].device_id,
                        label : data[i].device_name
                })
                }
               else if (data[i].available == "Yes" && data[i].device_type == "fuel sensor"){
                   fuelsensors.push(data[i])
                }


           }
           this.setState({deviceList})
           this.setState({fuelsensors})


//          console.log("deviceList : ",this.state.deviceList)
//            console.log("fuelsensors : ",this.state.fuelsensors)

        })
    .catch(err => {});
}
getVehicleNumber(){
  service.displayVehicle_number(window.location.protocol + "//" + window.location.host )
       .then(res => {
          var data = res.data;
          console.log("all Vehicle numbers  : ",data)
          this.setState({vehicleNumbers:data});
         console.log("all Vehicle data state: ",this.state.vehicleNumbers)
      })
  .catch(err => {});
}

 componentDidMount(){
    this.getCompany();
    this.getResellerUser();
    this.getDeviceData();
    this.getVehicleNumber();
    this.getfuelcalibration();
   }

 editCompany = (data) => {
   const _this=this
    this.company.current.setState({id : data.id,company_name : data.company_name,first_name : data.first_name,last_name : data.last_name,email:data.email,
    contact : data.contact_number})
    _this.getCompany()
 }

 deleteCompany(id) {
    console.log("delete id : ",id)
    const _this= this
    axios
    .delete(`${base_url}/sapasuser/Company/${id}/`)
    .then(res => {
       _this.getCompany()
       alert('Company Deleted successfully');
       console.log("resttt",res)
    })
    .catch(error => {
        console.log("delette",error)

    }
    )
   }

   handleViewSidebar = () =>
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
   render() {
    return(
        <React.Fragment>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2">
                <ResellerSideBar
                  isOpen={this.state.sidebarOpen}
                  toggleSidebar={this.handleViewSidebar}
                  companyData={this.state.companyData}
                  getCompany={this.getCompany}
                  editCompany ={this.editCompany}
                  deviceData = {this.state.deviceData}
                  deviceList = {this.state.deviceList}
                  deleteCompany ={this.deleteCompany}
                />
              </div>
              <div className="col-lg-10">
                <ResellerScreen
                isOpen={this.state.sidebarOpen}
                ref = {this.company}
                is_edit = {this.state.is_edit}
                resellerUserData={this.state.resellerUserData}
                deviceData = {this.state.deviceData}
                handleisEdit = {this.handleisEdit}
                refresh={()=>this.getCompany()}
                refreshReseller={()=>this.getResellerUser()}
                refreshDevice={()=>this.getDeviceData()}
                fuelsensors = {this.state.fuelsensors}
                vehicleNumbers = {this.state.vehicleNumbers}
                fuelcalibration={this.state.fuelcalibration}


                />
              </div>
            </div>
          </div>
        </React.Fragment>
    )
  }
}

export default ResellerSideDrawer;
