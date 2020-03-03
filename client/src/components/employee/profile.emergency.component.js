import React, { Component } from 'react';
import { Content, Row, Col, Box, SimpleTable } from 'adminlte-2-react';
import axios from 'axios';

export default class ProfileEmergencyComponent extends Component {

  state = {
    first_name: '',
    last_name:'',
    contact_no: '',
    records: []
  }



    componentDidMount() {
      axios.get('http://localhost:8080/api/emergency') //params todo
      .then(result => {
  
        this.setState({records: result.data})
      })
      .catch(error => {
        console.error(error);
      })
    }

    
   columns_ec = [
      {
        title: "First Name",
        data: 'first_name',
      },
    {
        title: "Last Name",
        data: 'last_name',
      },
      {
        title: "Contact Number",
        data: 'contact_no'
      }
  ];
 
    render() {

      return (
        <Row>
          <Col md={12}>
            <Box title="Emergency Contact Detail" type="info">
                <SimpleTable columns={this.columns_ec}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
            </Box>
         </Col>
        </Row>
      )}
}


