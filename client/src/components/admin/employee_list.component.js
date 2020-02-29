import React, { Component } from 'react';
import { Content, Row, Col, Box, SimpleTable, Button } from 'adminlte-2-react';
import axios from 'axios';


class EmployeeListComponent extends Component {

  state = {
    // first_name: "",
    records: []
  }

    componentDidMount() {
      axios.get('http://localhost:8080/api/employees') //params todo
      .then(result => {
        
        result.data.forEach(emp => {
          emp.properties = <Button key="btnProperties" type="info" text="Properties" onClick={this.showEmployeeDetails(emp.id)}/>
        });
        this.setState({records: result.data});

        console.log(this.state.records);
      })
      .catch(error => {
        console.error(error);
      })
    }

    showEmployeeDetails = id => {
      console.log("selected employee", id);
    };

    columns = [
      {
        title: "ID",
        data: 'id',
      },
      {
        title: "First Name",
        data: "first_name",
      },
      {
        title: "Last Name",
        data: "last_name",
      },
      {
        title: "Contact #",
        data: "contact_no",
      },
      {
        title: "Action",
        data: 'properties',
      }
  ];
 
    render() {

      return (<Content title="Employee Lists" subTitle="Employee Lists" browserTitle="Employee Lists">
        <Row>
          <Col md={12}>
            <Box title="Employee List" type="primary" collapsable>
                <SimpleTable columns={this.columns}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
            </Box>
         </Col>
        </Row>
      </Content>);
    }
}



export default EmployeeListComponent;