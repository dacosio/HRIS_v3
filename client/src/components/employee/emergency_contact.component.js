import React, { Component } from 'react';
import { Col, Box } from 'adminlte-2-react';
import axios from 'axios';

class EmergencyContactComponent extends Component {

  state = {
    emergency_contacts: [],
    errorMsg: ''
  }

    componentDidMount() {
      axios.get('http://localhost:8080/api/emergencys/1') //params todo
      .then(response => {
        console.log(response.data)
        this.setState({emergency_contacts: response.data})
      })
      .catch(error => {
        console.error(error);
        this.setState({errorMsg: 'Error retrieving data'})
      })
    }
 
    render() {
      const {emergency_contacts, errorMsg} = this.state

      return (
       
        <Col md={6}>
            <Box title="Emergency Contact" type="primary" collapsable>
                Name
                  {
                    emergency_contacts.length ?
                    emergency_contacts.map(emergency_contact => <div key={emergency_contact.id}>{emergency_contact.first_name} {emergency_contact.last_name}</div>) :
                    null
                  }
                  {errorMsg ? <div>{errorMsg}</div> : null}
            </Box>
        </Col>
      );
    }
}



export default EmergencyContactComponent;