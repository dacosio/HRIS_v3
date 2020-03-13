import React, { Component } from "react";
import { Content, Row, Col, Box, SimpleTable } from "adminlte-2-react";
import axios from "axios";
import SalaryComponent from "../finance/salary.component";
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

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/employees/") //params todo
      .then(result => {
        console.log(result.data);
        result.data.forEach(res => {
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
            <LeaveRequestsComponent />
            <TimeRequestsComponent />
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

export default ProfileComponent;
