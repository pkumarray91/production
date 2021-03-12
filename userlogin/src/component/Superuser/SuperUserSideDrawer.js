import React, {Component} from 'react';
import SuperUserScreen from './SuperUserScreen';
import SuperUserSideBar from './SuperUserSideBar';
import SuperUserHeader from './SuperUserHeader';
import LoginService from '../../service/PostData';
//import '../../css/SideBar.css'
import './superuserscreen.css'
import axios from 'axios'
const base_url ='http://140.238.84.255:8000'

const service = new LoginService();

class SuperUserSideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      resellerData : [],
      is_edit : false,
    };
     this.UserScreen = React.createRef();
  }

   getReseller(){
        service.displayReseller()
         .then(res => {
            var data = res.data;
         console.log("reseller data : ",data)
            this.setState({resellerData:data});
         console.log("reseller data state: ",this.state.resellerData)
        })
    .catch(err => {});
   }

   componentDidMount(){
    this.getReseller();
   }

   createReseller = (data) =>{
   const _this=this
       service.registerReseller(data)
  .then((response)=> {
    _this.getReseller()
    console.log(response);
  })
   }

    updateReseller = (data) => {
       const _this=this
        service.updateReseller(data)
    .then(response => {
    _this.getReseller()
    console.log(response,"____________________________");
    })
    }

   editReseller =(data) =>{
   const _this=this
    this.setState({is_edit : true})
    this.UserScreen.current.setState({id:data.id,first_name:data.first_name,last_name:data.last_name,company_name : data.company_name,url : data.user_url,email : data.email,contact_number:data.contact_number})
   _this.getReseller()
   }

   handleViewSidebar = () =>
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
   render() {
    return(
        <React.Fragment>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2">

                <SuperUserSideBar
                  isOpen={this.state.sidebarOpen}
                  toggleSidebar={this.handleViewSidebar}
                  resellerData = {this.state.resellerData}
                  editReseller={this.editReseller}
                  resetForm={()=>this.refreshForm()}
                  refresh={()=>this.getReseller()}
                />

              </div>
              <div className="col-lg-8">
                <SuperUserScreen
                isOpen={this.state.sidebarOpen}
                createReseller = {this.createReseller}
                updateReseller ={this.updateReseller}
                is_edit={this.state.is_edit}
                ref ={this.UserScreen}
                refresh={()=>this.getReseller()}
                />
              </div>

            </div>
          </div>
        </React.Fragment>
    )
  }
}

export default SuperUserSideDrawer;
