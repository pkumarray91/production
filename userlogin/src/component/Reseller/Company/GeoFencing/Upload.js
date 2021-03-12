import React, {useState} from 'react';
import './Upload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUpload} from '@fortawesome/free-solid-svg-icons';
import {Modal,Alert,Form } from 'react-bootstrap';
import CSVFileValidator from 'csv-file-validator'
import { geocodeByAddress,getLatLng,} from 'react-places-autocomplete';
export default function Upload(props) {
    const [show, setShow] = useState(false);
    const [fileData,setFileData] = useState([]);
    //const [latitude,setLatitude]=useState('');
    //const [longitude,setLongitude]=useState('')
    const handlePopup = () =>{
        setShow(true);
    }
    const [file, setFile] = React.useState("");
    const findLatLng = (data) => {

            if(data.latitude === '' && data.longitude === ''){
                    geocodeByAddress(data.location)
                    .then(results => getLatLng(results[0]))
                    .then(latLng => {
                    console.log('Success', latLng)

                        data['latitude'] = latLng.lat;
                        data['longitude'] = latLng.lng;
                        console.log("dataaaaa : ",data)
                           props.createGeofence(data)

                        })
             .catch(error => console.error('Error', error));
            }
            else
                 props.createGeofence(data)

    }
    const handleParse = (evt) => {
        evt.preventDefault();

        for(var i=0;i<fileData.length;i++){
            findLatLng(fileData[i]);
        }


    }
    const requiredError = (headerName, rowNumber, columnNumber) => {
        return `<div class="red">${headerName} is required in the <strong>${rowNumber} row</strong> / <strong>${columnNumber} column</strong></div>`
    }
    const validateError = (headerName, rowNumber, columnNumber) => {
        return `<div class="red">${headerName} is not valid in the <strong>${rowNumber} row</strong> / <strong>${columnNumber} column</strong></div>`
    }
    const uniqueError = (headerName) => {
        return `<div class="red">${headerName} is not unique</div>`
    }
    const isColorValid = function (fillColor) {
        const reqExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
        return reqExp.test(fillColor)
    }
    const isLatLngValid = function(location,Latitude,Longitude,rowNumber,columnNumber) {
    if (location === null && (Latitude === null && Longitude ===null)){
        return `<div class="red">Either Location or Latitude and Longitude are required in the <strong>${rowNumber} row</strong> / <strong>${columnNumber} column</strong></div>`

    }
    else if
            (location != null && (Latitude != null || Longitude != null)){
                return `<div class="red">Either enter Location or Latitude and Longitude are required in the <strong>${rowNumber} row</strong> / <strong>${columnNumber} column</strong></div>`
            }



}
const CSVConfig = {
    headers: [
        { name: 'name', inputName: 'name', required: true, requiredError },
        {name: 'location',inputName: 'location'},
        {name: 'latitude',inputName: 'latitude',optional:true},
        {name: 'longitude',inputName: 'longitude',optional:true},
        { name: 'fillColor', inputName: 'fillColor', required: true, requiredError, validate: isColorValid, validateError },
        { name: 'description' , inputName: 'description',optional : true},
         {name: 'c_radius',inputName: 'c_radius'},
        {name: 'c_lat',inputName: 'c_lat'},
        {name: 'c_lng',inputName: 'c_lng'},


    ]
}
function validateFile(event) {
    setFile(event.target.files[0]);
    CSVFileValidator(event.target.files[0], CSVConfig)
        .then(csvData => {
            csvData.inValidMessages.forEach(message => {
                document.getElementById('invalidMessages').insertAdjacentHTML('beforeend', message)
            })
        console.log(csvData.inValidMessages)
//          console.log(csvData.inValidMessages.length === 0)
        if (csvData.inValidMessages.length === 0){
            setFileData(csvData.data)
        }
        console.log("fileData : ",fileData)
        console.log(csvData.data)
        })
}
function FileUpload() {
return (
        <div className="row ">
            <div className="col-lg-10 col-md-6 ">
                <div className="uploadfilearea">{file.name }{/*, File type: {file.type}, File size: {file.size} bytes*/} </div>
            </div>
            <div className="col-lg-2 col-md-6 upload">
             <input class="file-upload-input" type='file' onChange={validateFile} accept=".csv" id="file" />
                {/*<input type="file" accept=".csv" id="file" onChange={validateFile}/><div style={{'color':'#fff0'}}>sample</div>*/}
            </div>
            <Alert variant="danger">
                <div id="invalidMessages"><Alert.Heading>Error will be Displayed here...</Alert.Heading></div>
            </Alert>
        </div>
    );
}
    return (
        <div>
            <div className="NewUpload" onClick={handlePopup}>
                <FontAwesomeIcon icon={faUpload}/> Upload
            </div>
            <Modal show={show} onHide={() => setShow(false)}  dialogClassName="modal-90w" centered id="popoverbasic"  className="popover_modal">
                <div className="head">
                    <Modal.Header closeButton ><div style={{'color':'white'}}> Upload Geo Fence</div></Modal.Header>
                </div>
                <Modal.Body className="show-grid">
                    <Form>
                        <p>Download sample file below</p>
                        <div className="row ">
                            <div className="col-lg-10 col-md-6 ">
                                <a className="uploadfilearea" href="/Template.csv" download>Template.csv</a>
                            </div>
                            <div className="col-lg-2 col-md-6 ">
                                <a className="download" href="/Template.csv" download  ><div style={{'color':'#fff0'}}>sample</div></a>
                            </div>
                        </div>
                        {/*File Browsing*/}
                        <p>Choose file to upload</p>
                        <FileUpload/> <br/>
                        <div className="container">
                            <div className="row ">
                                <div className="col-lg-6 col-md-6">
                                    <button type="submit" className="uploadsavecancel" onClick={handleParse}>Upload</button>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <button type="reset" className="uploadsavecancel" >Cancel</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}
