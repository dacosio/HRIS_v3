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
        // console.log(response.data[0]);
        let {records} = this.state;
        records.push(response.data[0])
        
        this.setState({
          records,
          first_name: '',
          last_name: '',
          relationship: '',
          contact_no: '',
          address: '',
          city: '',
          state: '',
          zip_code: ''
        })
      }).catch(error => {
        console.error(error);
      })
  }

  handleClear = event => {
    this.setState({
      first_name: '',
      last_name: '',
      relationship: '',
      contact_no: '',
      address: '',
      city: '',
      state: '',
      zip_code: ''
    })
  }

  handleDelete = (id) => {
    console.log("delete", id)
    axios.delete('http://localhost:8080/api/emergency/' + id)
            .then(response => {
              const newRecords = this.state.records.filter(res => {
                return res.id != id
              })

            this.setState({
              records: [...newRecords]
            })
              
            })
            .catch((error) => {
                console.error(error);
            })
  }
    


  footer = [<Button key="btnSubmitEc" type="success" pullRight text="Submit" onClick={this.handleSubmit} />,
  <Button key="btnSubmitEc2" type="warning" pullRight  text="Clear All" onClick={this.handleClear} />]

 
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
       
          <Box type="primary" collapsable title="Emergency Contacts">
                <table className="table table-head-fixed" id="EmployeesTable">
                    <thead>
                        <tr>
                            <th>Emergency Contact Name</th>
                            <th>Relationship</th>
                            <th>Contact Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                          {this.state.records.map(ec => {
                              return  (<tr key={ec.id}>
                                          <td>{ec.first_name.charAt(0).toUpperCase()+ ec.first_name.slice(1)} {ec.last_name.charAt(0).toUpperCase()+ ec.last_name.slice(1)}</td>
                                          <td>{ec.relationship.charAt(0).toUpperCase() + ec.relationship.slice(1)}</td>
                                          <td>{ec.contact_no}</td>
                                          <td><Button type="warning" text="Edit" onClick={() => this.handleEdit(ec.id)}></Button></td>
                                          <td><Button type="danger" text="Delete" onClick={() => this.handleDelete(ec.id)}></Button></td>
                                      </tr>);
                                  })}
                    </tbody>
                </table>
            </Box>
      </Col>
      </Row>

      );
    }
}



export default EmergencyContactComponent;