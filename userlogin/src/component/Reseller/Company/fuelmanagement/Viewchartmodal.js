import React, {Component,useState,useRef,useCallback,useEffect} from 'react';
import '../fuelmanagement/viewchart.css';
import { Graph } from "react-d3-graph";
import LineChart from './charts/LineChart';
//import chartDisplay from './chartDisplay';
import axios from 'axios';
import { Button, Row, Col, Container,Modal,Form } from 'react-bootstrap';

function Upload(props) {
    const [show, setShow] = useState(false);
    const handlePopup = () =>{
        setShow(true);
    }


const [vehicle,setVehicle]=useState(props.vehicle)
const [data, setData] = useState([]);
//const [from_date,setFromDate] = useState('')
//const [to_date,setToDate] = useState('')
//
//const handleFromDate = (e) => {
//
//    setFromDate(e.target.value)
//
//}
//
//const handleToDate = (e) => {
//
//    setToDate(e.target.value)
//
//}

const submit = e => {

    let from_date = e.target[0].value;
    let to_date = e.target[1].value;
    let data = {
      vehicle : vehicle,
      from_date,
      to_date
    };
    console.log("submit data : ",data)
    console.log("from_date : ",from_date)
    axios
      .post("http://127.0.0.1:8000/fuel/chart/",data)
      .then(res => {
        console.log("res : ", res);
         var result = res.data;
        const chartData=[];
        result.map((r,i) => {
            const value = r.Fuel_left
            chartData.push({
                 label: r.date,
                 value,
                 tooltipContent: `<b>DATE: </b>${r.date}<br><b>FuelLeft: </b>${value}`,

        })

    })
    setData(chartData);
     console.log("chartData submit : ",chartData)

      })
      .catch(err => alert(err));
  };
  useEffect(() => {

   regenerateData();
  }, []);

  function regenerateData() {
//  axios
//      .post("http://127.0.0.1:8000/fuel/chartkeya/",data)
//      .then(res => {
//        console.log("res : ", res);
//
//      })
//      .catch(err => alert(err));

     axios.get("http://127.0.0.1:8000/fuel/name/").then(res =>

   {
   var result = res.data;
//   console.log("result : ",result)
    const chartData=[];
    result.map((r,i) => {
        const value = r.value
        chartData.push({
             label: r.name,
             value,
             tooltipContent: `<b>DATE: </b>${r.name}<br><b>FuelLeft: </b>${value}`,

        })

    })
    setData(chartData);
     console.log("chartData : ",chartData)
    }

   )
//   console.log("vehicle : ",vehicle)
}



  return (
    <div>
        <button type="submit" className="viewchartbutton" onClick={handlePopup}>View Chart</button>
          <Modal show={show} onHide={() => setShow(false)}  dialogClassName="modal-90w" centered  className="popover_modal">
                <div className="head">
                    <Modal.Header closeButton ><div style={{'color':'white'}}>Vehicle Number: {vehicle}</div></Modal.Header>
                </div>
            <Modal.Body className="show-grid">
          
          <form onSubmit={e => {e.preventDefault();
                                    submit(e);
                                }}
            >
                    <div class="container-fluid fuelhead">
                        <div className="row">
                            <div className="col-lg-4">
                                <label for="fromdate" style={{'padding-right':'10px'}} >From-Date</label>
                                <input type="date" id="fromdate"   name="from_date" className="date"/>
                            </div>
                            <div className="col-lg-4" >
                               <label for="todate" style={{'padding-right':'10px'}}>To-Date</label>
                                <input type="date" id="todate" name="to_date" className="date"/>
                            </div>
                            <div className="col-lg-2">
                                <button type="submit" className="fuelbutton">Submit</button>
                            </div>                            <div className="col-lg-2">
                                <button type="clear" className="fuelbutton">Cancel</button>
                            </div>
                        </div>
                    </div>
               
         </form>
         <div>

                <LineChart
                    svgProps={{
                      margin: { top: 80, bottom: 80, left: 80, right: 80 },
                      width: 600,
                      height: 400,
                    }}
                    axisProps={{
                      xLabel: 'Date-wise-fuel-consumption->',
                      yLabel: 'Fuel-consumption in liter->',
                    }}
                    data={data}
                    strokeWidth={4}
                  />
         </div>

            </Modal.Body>
        </Modal>
    </div>
  );
}
export default Upload;