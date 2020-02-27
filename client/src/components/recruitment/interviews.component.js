import React, { Component } from 'react';
import moment from 'moment';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import TimePicker from 'rc-time-picker';
import DatePicker from "react-datepicker";
import axios from 'axios'


import 'rc-time-picker/assets/index.css';

class InterviewComponent extends Component {
 
  state = {
    date: new Date(),
    time: moment(),
    first_name: '',
    last_name: '',
    contact: '',
    department: 'Engineering',
    isDone: false //todo
    };
    
    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }


  handleSubmit = event => {
    event.preventDefault()
    console.log(this.state)    
    // axios.post('http://localhost:8080/api/time',this.state)
    // .then(response=> {
    //   console.log(response);
    // }).catch(error => {
    //   console.error(error);
    // })
  }

  footer = [
    <Button key="btnSubmit" type="success" pullRight text="Save" onClick={this.handleSubmit} />, 
  ];

  render() {
    return (
      <Content title="Interview" subTitle="Schedule" browserTitle="Interviews">
              
            <Box title="Applicant" type="primary" collapsable footer={this.footer}>
                <Row>
                    <Col md={2}>
                        <div className="form-group">
                            <label>Date</label>
                            <div>
                                <DatePicker name="date" selected={this.state.date} onChange={this.handleChange}/>
                            </div>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className="form-group">
                            <label>Time</label>
                            <div>
                            <TimePicker name="time" value={this.state.time} onChange={this.handleChange} />
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
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

          <Row>
          <Col xs={12}>
            <Box title="Scheduled" type="primary" collapsable>
            <div className="form-group">
                <label>Interviews Schedules will be appended here</label>
            </div>
            </Box>
          </Col>
        </Row>

    </Content>);
  }
}

export default InterviewComponent;