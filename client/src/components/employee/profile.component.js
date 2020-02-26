import React, { Component } from 'react';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import axios from 'axios';

class ProfileComponent extends Component {

  state = {
    employees: [],
    dependents: [],
    contacts: []
  }

    componentDidMount() {
      axios.get('http://localhost:8080/api/dependents/1') //params todo
      .then(response => {
        console.log(response.data)
        this.setState({dependents: response.data})
      })
      .catch(error => {
        console.error(error);
        
      })
    }
 
    render() {
      const {dependents} = this.state
      return (<Content title="Profile" subTitle="Employee Profile" browserTitle="Profile">
        <Row>
          <Col xs={12}>
            <Box title="Employee Details" type="primary" collapsable footer={<Button type="success" pullRight text="Save" />}>
              {
                dependents.length ?
                dependents.map(dependent => <div key={dependent.id}>{dependent.first_name} {dependent.last_name}</div>) :
                null
              }
            </Box>
          </Col>
        </Row>
              
        <Row>
        <Col md={6}>
                <Box title="Dependents" type="primary" collapsable>
                Name
                  {
                    dependents.length ?
                    dependents.map(dependent => <div key={dependent.id}>{dependent.first_name} {dependent.last_name}</div>) :
                    null
                  }
                </Box>
              </Col>

              <Col md={6}>
              <Box>
                Hello
              </Box>
              </Col>
        </Row>
      </Content>);
    }
}



export default ProfileComponent;