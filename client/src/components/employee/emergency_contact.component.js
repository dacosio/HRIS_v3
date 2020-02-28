import React, { Component } from 'react';
import { Col, Box, SimpleTable } from 'adminlte-2-react';
import axios from 'axios';

class EmergencyContactComponent extends Component {

  state = {
    records: [],
  }

    componentDidMount() {
      axios.get('http://localhost:8080/api/emergency') //params todo
      .then(response => {
        console.log(response.data)
        this.setState({records: response.data})
      })
      .catch(error => {
        console.error(error);
      })
    }

    
    columns = [
      {
        title: "First Name",
        data: 'first_name',
      },
     {
        title: "Last Name",
        data: 'last_name',
      },
      {
        title: "Address",
        data: 'address' ,
      },
      {
        title: "City",
        data: 'city' ,
      },
      {
        title: "State",
        data: 'state' ,
      },
      {
        title: 'Contact #',
        data: 'contact_no'
      }
    ]
 
    render() {
      return (
        <Col md={8}>
          <Box title="Emergency Contacts" type="warning" collapsable>
              <SimpleTable columns={this.columns}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
          </Box>
        </Col>
      );
    }
};



export default EmergencyContactComponent;