import React, { Component } from 'react'
import ReactSpeedometer from "react-d3-speedometer"
import axios from 'axios'
import Liquidgauge from "./Liquidgauge";
import Fuelheader from "./Fuelheader";
import '../fuelmanagement/Fueldisplay.css'
export default class Speedometer extends Component {
    state={
       paths:[],
       options:[],


    }
    componentDidMount() {
        let data ;
       axios.get('http://127.0.0.1:8000/fuel/speedometer/')
            .then(res => {
            data = res.data;
           console.log("initial data : ",data)
            this.setState({
                paths : data
            });
     console.log("state paths : ",this.state.paths[0].fuelleft)
        })
        .catch(err => {})
        axios.get('http://127.0.0.1:8000/fuel/speedometeroption/')
         .then(res => {
        var data = res.data;
       this.setState({options:data});
   })
   .catch(err => {})
  }



    render() {
    const{options}=this.state
        return (
        <div className="fuelscreen">
            <Fuelheader
            options={options}
            />
            <Liquidgauge/>
        </div>
    )}}
