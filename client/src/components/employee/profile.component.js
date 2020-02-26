import React, { Component } from 'react';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import axios from 'axios';
import DependentsComponent from './dependents.component';
import EmergencyContactComponent from './emergency_contact.component';

class ProfileComponent extends Component {

  state = {
    employees: [],
    errorMsg: ''
  }

    componentDidMount() {
      axios.get('http://localhost:8080/api/employees/1') //params todo
      .then(response => {
        console.log(response.data)
        this.setState({employees: response.data})
      })
      .catch(error => {
        console.error(error);
        this.setState({errorMsg: 'Error retrieving data'})
      })
    }
 
    render() {
      const {employees, errorMsg} = this.state

      return (<Content title="Profile" subTitle="Employee Profile" browserTitle="Profile">
        <Row>
          <Col xs={12}>
            <Box title="Employee Details" type="primary" collapsable footer={<Button type="success" pullRight text="Save" />}>
                  Name
                  {
                    employees.length ?
                    employees.map(employee => <div key={employee.id}>{employee.first_name} {employee.last_name}</div>) :
                    null
                  }
                  {errorMsg ? <div>{errorMsg}</div> : null}
            </Box>
          </Col>
        </Row>
              
        <Row>
        <DependentsComponent/>
        <EmergencyContactComponent/>
        </Row>
      </Content>);
    }
}



export default ProfileComponent;