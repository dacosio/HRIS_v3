import React, { Component } from 'react';
import { connect } from "react-redux";

import { Content, Row, Col, Box, SimpleTable } from "adminlte-2-react";
import axios from "axios";
import ProfileDependentComponent from "./profile.dependent.component";
import ProfileEmergencyComponent from "./profile.emergency.component";
import LeaveRequestsComponent from "./profile.leave.requests.component";
import TimeRequestsComponent from "./profile.time.requests.component";


class ProfileComponent extends Component {
  state = {
    first_name: "",
    last_name: "",
    position: "",
    department_id: "",
    address: "",
    city: "",
    state: "",
    contact_no: "",
    records: []
  };

  constructor(props){
    super(props);
  }


    componentDidMount() {
      axios.get(`${process.env.REACT_APP_API_SERVER}/api/employees/${this.props.userData.id}`,
      {
        headers: { Authorization: `Bearer ${this.props.token}` }
      }) //params todo
      .then(result => {
        //console.log(result.data);
        result.data.forEach(res => {
          // res.first_name = res.first_name + " " + res.last_name;
          switch (res.department_id) {
            case 1:
              res.department_id = "Engineering";
              break;
            case 2:
              res.department_id = "Human Resource Management";
              break;
            case 3:
              res.department_id = "Marketing and Sales";
              break;
            case 4:
              res.department_id = "Accounting and Finance";
              break;
            case 5:
              res.department_id = "Purchasing and Logistics";
              break;
            case 6:
              res.department_id = "Information System";
              break;
            case 7:
              res.department_id = "Software Development";
              break;
          }
        });
        this.setState({ records: result.data });
        console.log(result.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  columns_profile = [
    {
      title: "First Name",
      data: "first_name"
    },
    {
      title: "Last Name",
      data: "last_name"
    },
    {
      title: "Department",
      data: "department_id"
    },
    {
      title: "Address",
      data: "address"
    },
    {
      title: "City",
      data: "city"
    },
    {
      title: "State",
      data: "state"
    },
    {
      title: "Contact #",
      data: "contact_no"
    }
  ];

  render() {
    return (
      <Content
        title="Profile"
        subTitle="Employee Profile"
        browserTitle="Profile"
      >
        <Row>
          <Col md={12}>
            {(this.props.userData.role_id < 3) && <LeaveRequestsComponent />}
            {(this.props.userData.role_id < 3) && <TimeRequestsComponent />}
            <Box title="Employee Detail" type="primary" collapsable>
              <SimpleTable
                columns={this.columns_profile}
                data={this.state.records}
                responsive="true"
                striped="true"
                hover="true"
                border="true"
              ></SimpleTable>
            </Box>
            <ProfileDependentComponent />
            <ProfileEmergencyComponent />
          </Col>
        </Row>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  userData: JSON.parse(state.auth.userData)
});

export default connect(mapStateToProps)(ProfileComponent);
