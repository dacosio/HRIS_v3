import React, { Component } from 'react';
import { Col, Box, SimpleTable,Button, Row } from 'adminlte-2-react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";

class DependentsComponent extends Component {

  state = {
    first_name: '',
    last_name: '',
    birthday: new Date(),
    relationship: '',
    contact_no: '',
    records : [],
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/dependents') //params todo
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

  handleBirthday = (date) => {
    this.setState({
      birthday : date
    })
    console.log(date);
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
  

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    axios.post('http://localhost:8080/api/dependents',this.state)
      .then(response=> {
        console.log(response);
      }).catch(error => {
        console.error(error);
      })
  }



  footer = [<Button key="btnSubmit" type="success" pullRight text="Submit" onClick={this.handleSubmit} />]

    render() {

      return (
        <Row>
        <Col md={6}>
          <Box title="Dependents" type="success" collapsable footer={this.footer}>
          <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" required value={this.state.first_name} name="first_name" placeholder="Enter ..." onChange={this.handleFirstName}/>
          </div>
          <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" required value={this.state.last_name} name="last_name" placeholder="Enter ..." onChange={this.handleLastName} />
          </div>
          <div className="form-group">
              <label>Birthday</label>
                  <div>
                    <DatePicker selected={this.state.birthday} required onChange={this.handleBirthday} name="birthday"/>
                  </div>
              </div>
          <div className="form-group">
              <label>Relationship</label>
              <input type="text" className="form-control" required value={this.state.relationship} name="relationship" placeholder="Enter ..." onChange={this.handleRelationship} />
          </div>
          <div className="form-group">
              <label>Contact Number</label>
              <input type="text" className="form-control" required value={this.state.contact_no} name="contact_no" placeholder="Enter ..." onChange={this.handleContact} />
          </div>
          </Box>
        </Col>
        
        <Col md={6}>
            {/* <Box title="Dependents" type="info" collapsable>
                <SimpleTable columns={this.columns}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
            </Box> */}

               
            <Box type="primary">
                <table className="table table-head-fixed text-nowrap" id="EmployeesTable">
                    <thead>
                        <tr>
                            <th>Dependent Name</th>
                            <th>Birthday</th>
                            <th>Relationship</th>
                            <th>Contact Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.records.map(dep => {return (<tr key={dep.id}>
                                <td>{dep.first_name} {dep.last_name}</td>
                                <td>{dep.birthday}</td>
                                <td>{dep.relationship}</td>
                                <td>{dep.contact_no}</td>
                                <td><Button type="warning" text="Edit"></Button></td>
                                <td><Button type="danger" text="Delete"></Button></td>
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



export default DependentsComponent;