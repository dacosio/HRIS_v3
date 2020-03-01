import React, { Component } from 'react';
import { Col, Box, SimpleTable,Button, Row} from 'adminlte-2-react';
import axios from 'axios';

class EmergencyContactComponent extends Component {

  state = {
    first_name: '',
    last_name: '',
    relationship: '',
    contact_no: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    records : [],
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/emergency') //params todo
    .then(result => {
      console.log(result.data)
      this.setState({records: result.data})
    })
    .catch(error => {
      console.error(error);
    })
  }
  
  handleFirstName = (event) => {
    this.setState({
      first_name : event.target.value
    })
    console.log(event.target.value);
  }

  handleLastName = (event) => {
    this.setState({
      last_name : event.target.value
    })
    console.log(event.target.value);
  }

  handleRelationship = (event) => {
    this.setState({
      relationship : event.target.value
    })
    console.log(event.target.value);

  }
  
  handleContact = (event) => {
    this.setState({
      contact_no : event.target.value
    })
    console.log(event.target.value);
  }
  
  handleAddress = (event) => {
    this.setState({
      address : event.target.value
    })
    console.log(event.target.value);
  }
  
  handleCity = (event) => {
    this.setState({
      city : event.target.value
    })
    console.log(event.target.value);
  }

  handleState = (event) => {
    this.setState({
      state : event.target.value
    })
    console.log(event.target.value);
  }

  handleZipCode = (event) => {
    this.setState({
      zip_code : event.target.value
    })
    console.log(event.target.value);
  }
  

  handleSubmit = event => {
    axios.post('http://localhost:8080/api/emergency',this.state)
      .then(response=> {
        console.log(response);
      }).catch(error => {
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
        title: "Relationship",
        data: 'relationship',
      },
      {
        title: 'Contact #',
        data: 'contact_no'
      }
  ];

  footer = [<Button key="btnSubmit" type="success" pullRight text="Submit" onClick={this.handleSubmit} />]

 
    render() {

      return (
        <Row>
        <Col md={6}>
          <Box title="Emergency Contact" type="success" collapsable footer={this.footer}>
          <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" required name="first_name" value={this.state.first_name} placeholder="Enter ..." onChange={this.handleFirstName}/>
          </div>
          <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" required name="last_name" value={this.state.last_name} placeholder="Enter ..." onChange={this.handleLastName} />
          </div>
          <div className="form-group">
              <label>Relationship</label>
              <input type="text" className="form-control" required name="relationship" value={this.state.relationship} placeholder="Enter ..." onChange={this.handleRelationship} />
          </div>
          <div className="form-group">
              <label>Contact Number</label>
              <input type="text" className="form-control" required name="contact_no" value={this.state.contact_no} placeholder="Enter ..." onChange={this.handleContact} />
          </div>
          <div className="form-group">
              <label>Address</label>
              <input type="text" className="form-control" required name="address" value={this.state.address} placeholder="Enter ..." onChange={this.handleAddress} />
          </div>
          <div className="form-group">
              <label>City</label>
              <input type="text" className="form-control" required name="city" value={this.state.city} placeholder="Enter ..." onChange={this.handleCity} />
          </div>
          <div className="form-group">
              <label>State</label>
              <input type="text" className="form-control" required name="state" value={this.state.state} placeholder="Enter ..." onChange={this.handleState} />
          </div>
          <div className="form-group">
              <label>Zip Code</label>
              <input type="number" className="form-control" name="zip_code" value={this.state.zip_code} placeholder="Enter ..." onChange={this.handleZipCode} />
          </div>
          </Box>
        </Col>
      
      <Col md={6}>
          <Box title="Emergency Contact" type="info" collapsable>
              <SimpleTable columns={this.columns}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
          </Box>
      </Col>
      </Row>

      );
    }
}



export default EmergencyContactComponent;