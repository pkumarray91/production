import React, { Component } from 'react';
import axios from 'axios';
import '../fuelmanagement/Fueldisplay.css'
export default class Fuelchartlogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            company:'',
            group:'',
            vehicle_no:'',
            from_date:'',
            to_date:''
        }
    }
    changeHandler=e=>{
        this.setState({[e.target.name]:e.target.value})
        }

submitHandler=e=>{
        e.preventDefault()
        console.log(this.state)    //you can all user input data in debugar console

        axios.post('',this.state).
        then(response=>{
        console.log(response)
        })
        .catch(error=>{
        console.log(error)
        })
        }

    render() {

        const {company,group,vehicle_no,from_date,to_date}=this.state
        return (<form>
<div class="container-fluid fuelhead">
  <div className="row">
    <div className="col-lg-3">
      <label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
      <select className="fueldropdown" id="inlineFormCustomSelect">
      <option selected>Company</option>
        {
           this.props.options.map((fuel,i) =>
           (<option key={i} value={fuel.company}>{fuel.company}</option>))
        }

      </select>
    </div>
    <div className="col-lg-3">
      <label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
      <select className="fueldropdown" id="inlineFormCustomSelect">
        <option selected>Group</option>
        {
           this.props.options.map((fuel,i) =>
           (<option key={i} value={fuel.group}>{fuel.group}</option>))
        }
      </select>
    </div>
    <div className="col-lg-3">
      <label className="mr-sm-2 sr-only" for="inlineFormCustomSelect">Preference</label>
      <select className="fueldropdown" id="inlineFormCustomSelect">
        <option selected>Subgroup</option>
        {
           this.props.options.map((fuel,i) =>
           (<option key={i} value={fuel.subgroup}>{fuel.subgroup}</option>))
        }
      </select>
    </div>
    <div className="col-lg-1">
      <button type="submit" className="fuelbutton">Submit</button>
    </div>
    <div className="col-lg-1">
      <button type="clear" className="fuelbutton">Cancel</button>
    </div>
    <div className="col-lg-1">
      <button type="reset" className="fuelbutton">View Suspected</button>
    </div>
  </div>
</div>
</form>
        )
    }
}


