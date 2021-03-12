 import React, { Component } from 'react'
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
import axios from 'axios'
import ReactDOM from 'react-dom';
import LiquidFillGauge from 'react-liquid-gauge';
import Table from 'react-bootstrap/Table'
import Viewchartmodal from './Viewchartmodal';



export default class Liquidgauge extends Component {
  state = {
        fueldata:[],
        percent : '',
//        value : 10
    };
    componentDidMount() {
        let data ;
       axios.get('http://127.0.0.1:8000/fuel/fueldata/')
            .then(res => {
            data = res.data;
           console.log("initial data : ",data)
            this.setState({
                fueldata : data
            });
            console.log("fueldata : ",this.state.fueldata)
           console.log("fuelleft 0 : ",this.state.fueldata[0].fuelleft[0]['Fuel_left'])
        })
        .catch(err => {})
    }
    startColor = '#1e526d';
    endColor = '#dc143c';

    render() {
        const radius = 100;
        const interpolate = interpolateRgb(this.startColor, this.endColor);
        const fillColor = interpolate(this.state.value / 100);
        const gradientStops = [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }
        ];

return (


<div>

    <div className="container-fluid " >
        <div className="row ">
         {this.state.fueldata.map((data,index) => (
            <div className=" col-lg-4 fuelbg" key={index}>
                <div className="row seperator">
                    <div className=" col-lg-6">
                        <strong>{data.Vehicle_id}</strong>
                    </div>
                    <div className=" col-lg-6">
                        <strong>FuelStatus</strong>
                    </div>

                </div>
                <div className="row">
                    <div className=" col-lg-6">
                        <LiquidFillGauge
                        style={{ margin: '0 auto' }}
                        width={radius * 2}
                        height={radius * 2}
                        value= {data.fuelleft[0]['Fuel_left']*100/data.Fuel_Capacity}
                        percent="%"
                        textSize={1}
                        textOffsetX={0}
                        textOffsetY={0}
                        textRenderer={(props) => {
                        const value = Math.round(props.value);
                        const radius = Math.min(props.height / 2, props.width / 2);
                        const textPixels = (props.textSize * radius / 2);
                        const valueStyle = {fontSize: textPixels};
                        const percentStyle = {fontSize: textPixels * 0.6};
                        return (
                        <tspan>
                        <tspan className="value" style={valueStyle}>{value}</tspan>
                        <tspan style={percentStyle}>{props.percent}</tspan>
                        </tspan>
                        );
                        }}
                        riseAnimation waveAnimation waveFrequency={2} waveAmplitude={1} gradient gradientStops={gradientStops}
                        circleStyle={{fill: fillColor}}
                        waveStyle={{fill: fillColor}}
                        textStyle={{ fill: color('#444').toString(), fontFamily: 'Arial'}}
                        waveTextStyle={{fill: color('#fff').toString(),fontFamily: 'Arial'}}
                        />
                    </div>
                    <div className=" col-lg-6">
                        <div  className="seperator">Location : Vadodara</div>

                        <div  className="seperator">Tank Capacity : {data.Fuel_Capacity} ltr</div>
                        <div  className="seperator">Fuel Level : {data.fuelleft[0]['Fuel_left']} ltr</div>
                        <div  className="seperator">Approx Fuel : {data.fuelleft[0]['Fuel_left']*100/data.Fuel_Capacity} %</div>
                    </div>

                   <Viewchartmodal vehicle={data.Vehicle_id}/>

                </div>

            </div>))}
        </div>
    </div>
</div>
        );
    }
}
