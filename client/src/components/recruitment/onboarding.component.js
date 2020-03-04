import React, { Component } from 'react';
import moment from 'moment';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import TimePicker from 'rc-time-picker';
import DatePicker from "react-datepicker";
import axios from 'axios'


import 'rc-time-picker/assets/index.css';

class OnBoardingComponent extends Component {
 
  state = {
    startDate: new Date(),
    first_name: '',
    last_name: '',
    contact: '',
    department: 'Engineering',
    role: 'employee',
    isDone: false //todo
    };
    
    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
        console.log(e.target.value)
    }

    handleChangeDate = e => {
        this.setState({
            startDate: new Date()
        })
    }

   handleSubmit = event => {
   
  }

  footer = [
    <Button key="btnSubmitOnBoard" type="success" pullRight text="Save" onClick={this.handleSubmit} />, 
  ];

  render() {
    return (
      <Content title="Onboarding" subTitle="Schedule" browserTitle="On Boarding">
              
            <Box title="New Employee" type="primary" footer={this.footer}>
                <Row>
                    <Col lg={4}>
                        <div className="form-group">
                            <label>Date</label>
                            <div>
                                <DatePicker name="startDate" selected={this.state.startDate} onChange={this.handleChangeDate}/>
                            </div>
                        </div>
                    </Col>
                   
                    <Col lg={4}>
                    <div className="form-group">
                        <label>Department</label>
                            <div>
                                <select value= {this.state.department} name="department" onChange={this.handleChange}>
                                <option value='Engineering'>Engineering</option>
                                <option value='Human Resource Management'>Human Resource Management</option>
                                <option value='Marketing and Sales'>Marketing and Sales</option>
                                <option value='Accounting and Finance'>Accounting and Finance</option>
                                <option value='Purchasing and Logistics'>Purchasing and Logistics</option>
                                <option value='Operations'>Operations</option>
                                <option value='Information System'>Information System</option>
                                <option value='Software Development'>Software Development</option>
                                </select>
                            </div>
                     </div>
                    </Col>
                    <Col lg={4}>
                    <div className="form-group">
                        <label>Role</label>
                            <div>
                                <select value= {this.state.role} name="role" onChange={this.handleChange}>
                                <option value='employee'>Associate</option>
                                <option value='admin'>Administrator</option>
                                <option value='tl'>Team Leader</option>
                                </select>
                            </div>
                     </div>
                     </Col>
                </Row>
                
                <Row>
                    <Col md={4}>
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
                    <Col md={3}>
                        <div className="form-group">
                            <label>Contact</label>
                            <input type="text" name="contact" value={this.state.contact} onChange={this.handleChange} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                </Row>        
            </Box>

        </Content>);
  }
}

export default OnBoardingComponent;