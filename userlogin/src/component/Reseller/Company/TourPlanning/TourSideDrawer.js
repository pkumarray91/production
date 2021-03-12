import React, {Component} from 'react';
import TourScreen from './TourScreen';
import TourSideBar from './TourSideBar';
import AllocateScreen from './AllocateScreen';
import '../../../../css/SideBar.css'
import axios from 'axios'
const base_url ='http://140.238.84.255:8000'

class TourSideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: true,
      tourData : [],
      tourVehicle : [],
      tourAllocate : [],
      editTour :null,
      editAllocate : null,
      refresh : false,
      AllocateScreen : false,
      id:null,
      allocate_tour :{},
    };
  }

  getData(){
      axios.get('http://140.238.84.255:8000/tour/tourcreation/')
      .then(res => {
        var data = res.data;
       this.setState({tourData:data});
   })
   .catch(err => {})
  }

  getAllocateTour(){
      axios.get('http://140.238.84.255:8000/tour/tourallocate/')
      .then(res => {
        var data = res.data;
       this.setState({tourAllocate:data});
   })
   .catch(err => {})
  }

   deleteCreate(id) {
    console.log("delete id : ",id)
    axios
    .delete(`${base_url}/tour/tourcreation/${id}/`)
    .then(res => {
       alert('Tour Deleted Suceesfully');
       console.log("resttt",res)
    })
    .catch(error => {
        console.log("delette",error)
        alert('Tour not delete Suceesfully');
    }
    )
   }

   getTourVehicle(){
      axios.get('http://140.238.84.255:8000/locationTracking/coordinates/')
      .then(res => {
        var data = res.data;
       this.setState({tourVehicle:data});
   })
   .catch(err => {})
  }

   componentDidMount() {
    this.getData()
    this.getTourVehicle()
    this.getAllocateTour()
   }

    refreshForm(){
    const This=this
    this.setState({ refresh: true});
    setTimeout(function(){ This.setState({refresh: false })}, 100);
    }

    openAllocateTour = (tour) => {
        this.setState({AllocateScreen : true,allocate_tour : tour})
         console.log("allocate tour : ",this.state.allocate_tour)
    }

   handleViewSidebar = () =>
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
   render() {
    return(
        <React.Fragment>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2">
                <TourSideBar
                  openAllocateTour= {this.openAllocateTour}
                  openCreateTour= {()=> this.setState({TourScreen:true})}
                  openCreateTour= {()=> this.setState({AllocateScreen:false})}
                  isOpen={this.state.sidebarOpen}
                  toggleSidebar={this.handleViewSidebar}
                  tourData={this.state.tourData}
                  editAllocate={(tour)=>{this.setState({ editAllocate:tour})}}
                  editAllocate={this.state.editAllocate}
                  resetForm={()=>this.refreshForm()}
                  editTour={(tour)=>{this.setState({ AllocateScreen:false,editTour:tour})}}
                  deleteCreate={(id) =>{this.deleteCreate(id)}}
                />
              </div>
              <div className="col-lg-10">
                {this.state.AllocateScreen ?<AllocateScreen
                 isOpen={this.state.sidebarOpen}
                 tourData={this.state.tourData}
                 tourVehicle={this.state.tourVehicle}
                 tourAllocate={this.state.tourAllocate}
                 editTour={this.state.editTour}
                 editAllocate={(tour)=>{this.setState({ editAllocate:tour})}}
                 editAllocate={this.state.editAllocate}
                 refresh={this.state.refresh}
                 getData={this.getData}
                 getAllocateTour={()=>{this.getAllocateTour()}}
                 tour_allocate_name={this.state.tour_allocate_name}
                 allocate_tour = {this.state.allocate_tour}
                />:<TourScreen  isOpen={this.state.sidebarOpen}
                 tourData={this.state.tourData}
                 tourVehicle={this.state.tourVehicle}
                 tourAllocate={this.state.tourAllocate}
                 editTour={this.state.editTour}
                 editButton={this.state.editButton}
                 refresh={this.state.refresh}
                 getData={()=>{this.getData()}}

                />}
              </div>
            </div>
          </div>
        </React.Fragment>
    )
  }
}

export default TourSideDrawer;
