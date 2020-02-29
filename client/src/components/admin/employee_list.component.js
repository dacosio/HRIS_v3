import React, { Component } from 'react';
import { Content, Row, Col, Box, SimpleTable } from 'adminlte-2-react';
import axios from 'axios';


class EmployeeListComponent extends Component {

  state = {
    // first_name: "",
    records: []
  }

    componentDidMount() {
      axios.get('http://localhost:8080/api/employees/employeeList') //params todo
      .then(result => {
        console.log(result.data)
        this.setState({records: result.data})
      })
      .catch(error => {
        console.error(error);
      })
    }

    
    columns = [
      {
        title: "ID",
        data: 'id',
      },
      {
        title: "Employee",
        data: "employee",
      },
      {
        title: "Contact #",
        data: "contact_no",
      },
      {
        title: "Position",
        data: 'position',
      },
      {
        title: "Department",
        data: 'department',
      },
      {
        title: "Emergency Contact",
        data: 'emergency_contact',
      },
      {
        title: "Emergency Contact #",
        data: 'ecnum',
      },
      {
        title: "Dependent",
        data: 'dependents'
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