import React, {Component} from 'react';
import TourSideDrawer from './TourSideDrawer'
class TourDisplay extends Component {
  constructor(props) {
    super(props);
    }
    render() {
        return(
            <div>
                <TourSideDrawer/>
            </div>
        )
      }
    }
export default TourDisplay;