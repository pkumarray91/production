//import React, {Component,useState,useRef,useCallback,useEffect} from 'react';
//import LineChart from './charts/LineChart';
//import axios from 'axios';
//import '../fuelmanagement/viewchart.css';
//
//export default function chartDisplay(props){
//const [data, setData] = useState([]);
//useEffect(() => {
//
//   regenerateData();
//  }, []);
//
//  function regenerateData() {
////  axios
////      .post("http://127.0.0.1:8000/fuel/chartkeya/",data)
////      .then(res => {
////        console.log("res : ", res);
////
////      })
////      .catch(err => alert(err));
//
//     axios.get("http://127.0.0.1:8000/fuel/name/").then(res =>
//
//   {
//   var result = res.data;
//    const chartData=[];
//    result.map((r,i) => {
//        const value = r.value
//        chartData.push({
//             label: r.name,
//             value,
//             tooltipContent: `<b>DATE: </b>${r.name}<br><b>FuelLeft: </b>${value}`,
//
//        })
//
//    })
//    setData(chartData);
//     console.log("chartData : ",chartData)
//    }
//
//   )
////   console.log("vehicle : ",vehicle)
//}
//
//return(
//<div>
//     <LineChart
//                    svgProps={{
//                      margin: { top: 80, bottom: 80, left: 80, right: 80 },
//                      width: 600,
//                      height: 400,
//                    }}
//                    axisProps={{
//                      xLabel: 'Date-wise-fuel-consumption->',
//                      yLabel: 'Fuel-consumption in liter->',
//                    }}
//                    data={data}
//                    strokeWidth={4}
//                  />
//
//</div>
//)
//
//}
