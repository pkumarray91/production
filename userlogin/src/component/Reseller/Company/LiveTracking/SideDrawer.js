import React, { Component } from "react";
import Content from "./Content";
import './../../../../css/SideBar.css';
import Sidebar from "./Sidebar";


class SideDrawer extends Component {
  state = {
    sidebarOpen: true
  };
  handleViewSidebar = () =>
    this.setState({ sidebarOpen: !this.state.sidebarOpen });

  render() {
    return (
        <div className="container-fluid">
        <div className="row">
        <div className="col-lg-2 hidden-sm ">
        <Sidebar
          isOpen={this.state.sidebarOpen}
          toggleSidebar={this.handleViewSidebar}
        />
        </div>
        <div className="mapp col-lg-10 col-sm-12 col-12">
        <Content isOpen={this.state.sidebarOpen} />
        </div>
      </div>
      </div>
    );
  }
}

export default SideDrawer;