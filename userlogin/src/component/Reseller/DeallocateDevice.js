import React, {useState} from 'react';
import './group.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit,faTrash} from '@fortawesome/free-solid-svg-icons';
import {Modal,Alert,Form,Table} from 'react-bootstrap';
import LoginService from '../../service/PostData';
const registerService = new LoginService();
const base_url ='http://140.238.84.255:8000'
const service = new LoginService();
class Deallocate extends React.Component {
  constructor(props, context) {
    super(props, context);
     this.state = {
      show: false,
       allocateData : [],
      showTogglePopup: false
      };
      this.handleClick = this.handleClick.bind(this);
  }
  getAllocateData(){
    service.Deallocate(this.props.company_id)
     .then(res => {
            var data = res.data;
            console.log("Allocate data  : ",data)
            this.setState({allocateData:data});
           console.log("Allocate data state: ",this.state.allocateData)
        })
    .catch(err => {});
  }
componentDidMount(){
    this.getAllocateData();
   }
  handlePopup = () =>{
    this.setState({
      show:true,
    });
    document.getElementById('popover-basic').style.display='none'
  }
  handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({[name]: value});
  }
   handleClick(device_id) {
    var result = window.confirm('Are you sure You Want to deallocate this Device ?')
       if(result === true){
//         console.log("okkkkkk")
           this.setState({showTogglePopup: true,device_id:device_id})
   }
   else
        console.log("Cancel")
   }
   handleDeallocateToggleSubmit(e,device_id) {
            const _this = this
         let add_notes =  e.target[0].value
         let data={
               device_id : device_id,
              add_notes
         }
         console.log("add notes data",data)
         service.DeallocateDevice(data)
            .then(function (response) {
            _this.getAllocateData();
            console.log(response);
          })
          this.setState({showTogglePopup : false})
   }
  render() {
  const{ show } = this.state;
    return (
        <div>
        <Modal show={this.state.showTogglePopup} onHide={() =>this.setState({showTogglePopup:false })}  dialogClassName="modal-90w" centered id="popoverbasic"  className="popover_modal">
                <div className="head">
                    <Modal.Header closeButton ><div style={{'color':'white'}}>Deallocate Device</div></Modal.Header>
                </div>
                <Modal.Body className="show-grid">
                    <form id="add_notes_form" onSubmit={e => {e.preventDefault();
                                   this.handleDeallocateToggleSubmit(e,this.state.device_id);
                                }}>
                    <div className="col-lg-12">
                     <div className="col-lg-4 col-md-4 col-sm-4 col-4">
                        <label  className="labelname"> Add Notes <strong style={{'color': 'red'}}>*</strong></label>
                       </div>
                       <div className="col-lg-8 col-md-8 col-sm-8 col-8">
                          <input type="text" name="add_notes" placeholder="Type Here why You are deallocating this device" className="tour-form" required/>
                       </div>
                       <div className="col-lg-6 col-md-8 col-sm-8 col-8">
                          <button type="submit" style={{'float': 'right'}} className=" add-tour">save</button>
                        </div>
                    </div>
                  </form>
                </Modal.Body>
            </Modal>
            <h6 style={{'fontSize': '12px'}}onClick={this.handlePopup}>Deallocate Device</h6>
            <Modal show={show} onHide={() =>this.setState({show:false })}  dialogClassName="modal-90w" centered id="popoverbasic"  className="popover_modal">
                <div className="head">
                    <Modal.Header closeButton ><div style={{'color':'white'}}>Deallocate Device</div></Modal.Header>
                </div>
                <Modal.Body className="show-grid">
                    <form id="input_tour_form" onSubmit={this.handleVehicleAllocationSubmit}>
                    <div className="col-lg-12">
                    <div className="allocate-table">
                   <Table bsPrefix  hover size="sm" className="allocate-tbl">
                    <thead style={{backgroundColor: "#dfddde"}} >
                      <tr>
                       <th className="allocate-head">VehicleNo</th>
                        <th className="allocate-head">Device</th>
                        <th className="allocate-head">Allocated Date Time</th>
                       <th className="allocate-head">Allocate</th>
                      </tr>
                    </thead>
                       <tbody >
                        {this.state.allocateData.map((data,index) => (
                          <tr className="allocate-r">
                            <td className="allocate-head">{data.vehicle_number}</td>
                            <td className="allocate-head">{data.device_name}</td>
                            <td className="allocate-head">{data.allocated_DateTime}</td>
                             <th className="allocate-head">
                              <div style={{'margin':'7px'}}>
                                <button type="button" className="uploadsavecancel" onClick={()=>this.handleClick(data.device_id)}>Deallocate</button>
                              </div>
                            </th>
                          </tr>
                          ))}
                        </tbody>
                    </Table>
                    </div>
                    </div>
                  </form>
                </Modal.Body>
            </Modal>
        </div>
    );
    }
}
export default Deallocate;
