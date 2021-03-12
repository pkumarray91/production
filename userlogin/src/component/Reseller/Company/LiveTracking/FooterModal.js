import  React from "react";
import {Nav,Modal,Tab} from 'react-bootstrap';
import './FooterModal.css';


export default function FooterModel(props){

  return (
<div className="footer">
    <Modal
      {...props}
      size="lg"
      dialogClassName="modal-90w "
        aria-labelledby="example-custom-modal-styling-title"
      className="special_modal"
    >
     <Modal.Header  closeButton className="closer">
       </Modal.Header>

    <Tab.Container id="left-tabs-example" defaultActiveKey="VehicleStatus" >
    <div className="row ">
    <div className="col-lg-3 col-md-3 footerbg">
      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link eventKey="VehicleStatus"className="bg-sec1 "><img src = {process.env.PUBLIC_URL + '/Elements/Vehicle Status.svg' } alt="VehicleStatus" className="icon" /> Vehicle Status</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="DriverPerformance" className="bg-sec1 "><img src = {process.env.PUBLIC_URL + '/Elements/Driver Performance.svg' } alt="Driver Performance" className="icon" /> Driver Performance</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="JourneyHistory" className="bg-sec1 "><img src = {process.env.PUBLIC_URL + '/Elements/Journey History.svg' } alt="Journey History" className="icon" /> Journey History</Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
    <div className="col-lg-9 col-md-9 bg-footercontent ">
      <Tab.Content>
        <Tab.Pane eventKey="VehicleStatus"  id="vehiclestatus"  >
        <div className="container" >
          <div className="row ">
            <div className="col-lg-4 col-md-4">
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-4">
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-4">
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
        </Tab.Pane>
        <Tab.Pane eventKey="DriverPerformance">
        <div className="container" >
          <div className="row ">
            <div className="col-lg-4 col-md-4">
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-4">
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-4">
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
        </Tab.Pane>
        <Tab.Pane eventKey="JourneyHistory">
        <div className="container" >
          <div className="row ">
            <div className="col-lg-4 col-md-4 ">
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-4">
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-4 col-md-4">
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
                <div className="container" >
                    <div className="row seperatormodal spaces">
                        <div className="col-lg-6 col-md-6 text-left ">Vehicle Status</div>
                        <div className="col-lg-6 col-md-6 text-right"><strong>{props.vehicle_status} </strong> </div>
                    </div>
                </div>
            </div>
          </div>
      </div>
        </Tab.Pane>
      </Tab.Content>
    </div>
  </div>
</Tab.Container>
        </Modal>
        </div>
  );
}
