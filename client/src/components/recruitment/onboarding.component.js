import React, { Component } from 'react';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import DatePicker from "react-datepicker";
import axios from 'axios'


import 'rc-time-picker/assets/index.css';

class OnBoardingComponent extends Component {
 
  state = {
    department_id: 1,
    role_id: 3,
    supervisor_id: 1, //todo
    position: '',
    gender: 'Male',
    first_name: '',
    last_name: '',
    contact_no: '',
    birthday: new Date(),
    address: '',
    city: '',
    state: '',
    zip_code: '',
    email: '',
    supervisor: null,
    date_hired: new Date(),
    records: [],
    password: '',
    confirm_password: ''

    };
    
    componentDidMount() {
        axios.get('http://localhost:8080/api/employees')
            .then(result => {
            
                let supervisor = result.data.filter(result => result.role_id ==2)
                console.log(supervisor)
                this.setState({records: supervisor})
            })
            .catch(error => {
                console.error(error);
              })

    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(e.target.value)
    }

    handleChangeBirthday = date => {
        this.setState({
            birthday: date
        })
        console.log(date)
    }

    handleDateHired = date => {
        this.setState({
            date_hired: date
        })
        console.log(date)
    }

    handleSubmit = event => {
        axios.post('http://localhost:8080/api/employees',this.state)
            .then(response=> {
              console.log(response.data);
            //   alert(response.data)
              this.setState({
                    role_id: 3,
                    supervisor_id: 1, //todo
                    position: '',
                    gender: 'Male',
                    first_name: '',
                    last_name: '',
                    contact_no: '',
                    birthday: new Date(),
                    address: '',
                    city: '',
                    state: '',
                    zip_code: '',
                    email: '',
                    supervisor: null,
                    date_hired: new Date(),
                    records: [],
                    password: '',
                    confirm_password: ''
              })
      })}

  handleClear = event => {
      this.setState({
        department_id: 1,
        role_id: 3,
        supervisor_id: 1, //todo
        position: '',
        gender: 'Male',
        first_name: '',
        last_name: '',
        contact_no: '',
        birthday: new Date(),
        address: '',
        city: '',
        state: '',
        zip_code: '',
        email: '',
        supervisor: null,
        date_hired: new Date(),
        records: [],
        password: '',
        confirm_password: ''
      })
  }

  footer = [
    <Button key="btnSubmitOnBoard" type="success" pullRight text="Save" onClick={this.handleSubmit} margin="true" />, 
    <Button key="btnSubmitClear" type="warning" pullRight  text="Clear All" onClick={this.handleClear} margin="true" />
  ];

  render() {
    return (
      <Content title="Onboarding" browserTitle="On Boarding">
              
            <Box title="New Employee" type="primary" footer={this.footer}>
                <Row>
                    <Col md={3}>
                    <div className="form-group">
                        <label>Department</label>
                            <div>
                                <select value= {this.state.department_id} name="department_id" onChange={this.handleChange}>
                                <option value='1'>Engineering</option>
                                <option value='2'>Human Resource Management</option>
                                <option value='3'>Marketing and Sales</option>
                                <option value='4'>Accounting and Finance</option>
                                <option value='5'>Purchasing and Logistics</option>
                                <option value='6'>Operations</option>
                                <option value='7'>Information System</option>
                                <option value='8'>Software Development</option>
                                </select>
                            </div>
                     </div>
                    </Col>
                    <Col md={2}>
                        <div className="form-group">
                            <label>Role</label>
                                <div>
                                    <select value= {this.state.role_id} name="role_id" onChange={this.handleChange}>
                                    <option value='3'>Associate</option>
                                    <option value='1'>Administrator</option>
                                    <option value='2'>Team Leader</option>
                                    </select>
                                </div>
                        </div>
                    </Col>
                    <Col md={2}>
                    <div className="form-group">
                        <label>Supervisor</label>
                            <div>
                                <select value= {this.state.supervisor_id} name="supervisor_id" onChange={this.handleChange}>
                                {this.state.records.map(supervisor => {
                                        return ( <option>{supervisor.first_name} {supervisor.last_name}</option>)
                                })}
                                </select>
                            </div>
                     </div>
                     </Col>
                </Row>
                
                <Row>
                    <Col md={3}>
                        <div className="form-group">
                            <label>Start Date</label>
                                <div>
                                    <DatePicker ref="date_hired"
                                    selected={this.state.date_hired}
                                    onChange={this.handleDateHired}
                                    name="date_hired"
                                    />
                                </div>
                        </div>
                     </Col>
                    <Col md={3}>
                        <div className="form-group">
                            <label>Position Title</label>
                            <input type="text" name="position" value={this.state.position} onChange={this.handleChange} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={3}>
                        <div className="form-group">
                            <label>Designation</label>
                                <div>
                                    <select value= {this.state.gender} name="gender" onChange={this.handleChange}>
                                    <option value='Male'>Mr.</option>
                                    <option value='Female'>Ms.</option>
                                    </select>
                                </div>
                        </div>
                     </Col>
                    <Col md={2}>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input type="text" name="contact_no" value={this.state.contact_no} onChange={this.handleChange} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                </Row>
                <Row>
                     <Col md={3}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                    
                </Row>

                <Row>
                    <Col md={12}>
                        <div className="form-group">
                            <label>Birthday</label>
                            <div>
                                <DatePicker name="birthday" selected={this.state.birthday} onChange={this.handleChangeBirthday}/>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <div className="form-group">
                            <label>Address</label>
                            <input type="text" name="address" value={this.state.address} onChange={this.handleChange} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="form-group">
                            <label>City</label>
                            <input type="text" name="city" value={this.state.city} onChange={this.handleChange} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <div className="form-group">
                            <label>State</label>
                            <input type="text" name="state" value={this.state.state} onChange={this.handleChange} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="form-group">
                            <label>Zip Code</label>
                            <input type="number" name="zip_code" value={this.state.zip_code} onChange={this.handleChange} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                </Row>
                <Row><Col md={3}>
                        <div className="form-group">
                            <label>User Name</label>
                            <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" placeholder="email" />
                        </div>
                    </Col>
                
                    <Col md={3}>
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} className="form-control" placeholder="password" />
                        </div>
                    </Col>
                </Row>
                <Row>  
                    <Col md={3}>
                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirm_password" value={this.state.confirm_password} onChange={this.handleChange} className="form-control" placeholder="confirm password" />
                        </div>
                    </Col>
                </Row>
            </Box>

        </Content>);
  }
}

export default OnBoardingComponent;
