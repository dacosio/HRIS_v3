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
    isEdit: false,
    editRecords: {
      first_name: '',
      last_name: '',
      birthday: new Date(),
      relationship: '',
      contact_no: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:8080/api/dependents/') //params todo
      .then(result => {
        console.log(result.data)
        this.setState({
          records: result.data
        })
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
    axios.post('http://localhost:8080/api/dependents/',this.state) //todo
      .then(response=> {
        console.log(response.data[0])
        let {records} = this.state;
        records.push(response.data[0])
        
        this.setState({
          records,
          first_name: '',
          last_name: '',
          birthday: new Date(),
          relationship: '',
          contact_no: ''
        })
      })
      .catch(error => {
        console.error(error);
      })
  }

  handleClear = event => {
    this.setState({
      first_name: '',
      last_name: '',
      birthday: new Date(),
      relationship: '',
      contact_no: ''
    })
  }

  handleEdit = (first_name,last_name,birthday,relationship,contact_no) => {
    console.log(first_name,last_name,birthday,relationship,contact_no)
      this.setState({
        editRecords: {
          first_name,
          last_name,
          birthday,
          relationship,
          contact_no
        }
      })
      console.log(first_name)
    }
  

  // handleDelete = event => {
  //   console.log("delete")
  // }


  footer = [
    <Button key="btnSubmitDp1" type="success" pullRight text="Submit" onClick={this.handleSubmit} />,
    <Button key="btnSubmitDp2" type="warning" pullRight  text="Clear All" onClick={this.handleClear} />
  ]

    render() {

      return (
        <Row>
        <Col md={6}>
          <Box title="Dependents" type="success" collapsable footer={this.footer}>
            <div className="form-group">
                <label for="first_name_dep">First Name</label>
                <input type="text" id="first_name_dep" className="form-control" required value={this.state.first_name} name="first_name" placeholder="Enter ..." onChange={this.handleFirstName}/>
            </div>
            <div className="form-group">
                <label for="last_name_dep">Last Name</label>
                <input type="text" id="last_name_dep" className="form-control" required value={this.state.last_name} name="last_name" placeholder="Enter ..." onChange={this.handleLastName} />
            </div>
            <div className="form-group">
                <label for="birthday_dep">Birthday</label>
                  <div id="birthday_dep">
                    <DatePicker selected={this.state.birthday} required onChange={this.handleBirthday} name="birthday"/>
                  </div>
            </div>
            <div className="form-group">
                <label for="relationship_dep">Relationship</label>
                <input type="text" id="relationship_dep"className="form-control" required value={this.state.relationship} name="relationship" placeholder="Enter ..." onChange={this.handleRelationship} />
            </div>
            <div className="form-group">
                <label for="contact_no_dep">Contact Number</label>
                <input type="text" id="contact_no_dep"className="form-control" required value={this.state.contact_no} name="contact_no" placeholder="Enter ..." onChange={this.handleContact} />
            </div>
          </Box>
        </Col>
        
        <Col md={6}>
            <Box type="primary" collapsable title="Dependents">
                <table className="table table-head-fixed" id="EmployeesTable">
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
                          {this.state.records.map(dep => {
                              return  (<tr key={dep.id}>
                                          <td>{dep.first_name} {dep.last_name}</td>
                                          <td>{moment(dep.birthday).format("YYYY-MMM-DD")}</td>
                                          <td>{dep.relationship.charAt(0).toUpperCase() + dep.relationship.slice(1)}</td>
                                          <td>{dep.contact_no}</td>
                                          <td><Button type="warning" text="Edit" onClick={() => this.handleEdit(dep.first_name,dep.last_name,dep.birthday,dep.relationship,dep.contact_no)}></Button></td>
                                          <td><Button type="danger" text="Delete" onClick={this.handleDelete}></Button></td>
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