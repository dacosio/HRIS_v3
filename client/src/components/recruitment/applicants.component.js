import React, { Component } from 'react';
import moment from 'moment';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import TimePicker from 'rc-time-picker';
import DatePicker from "react-datepicker";
import axios from 'axios';


import 'rc-time-picker/assets/index.css';

class InterviewComponent extends Component {
 
  state = {
    date: new Date(),
    time: moment(),
    first_name: '',
    last_name: '',
    contact_no: '',
    department_id: 1,
    isDone: false,
    records: []
    };

    componentDidMount() {
        axios.get('http://localhost:8080/api/applicants') //params todo
        .then(result => {
            
            console.log(result)
            result.data.forEach(res=> {
                switch (res.department_id) {
                case 1:
                    res.department_id = 'Engineering'
                    break;
                case 2:
                    res.department_id = 'Human Resource Management'
                    break;
                case 3:
                    res.department_id = 'Marketing and Sales'
                    break;
                case 4:
                    res.department_id = 'Accounting and Finance'
                    break;
                case 5:
                    res.department_id = 'Purchasing and Logistics'
                    break;
                case 6:
                    res.department_id = 'Information System'
                    break;
                case 7:
                    res.department_id = 'Software Development'
                    break;
                }
            })
          
          this.setState({records: result.data})
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

    handleChangeDate = date => {
        this.setState({'date': date});
        console.log(date)
      };

    handleChangeTime = time => {
        this.setState({time: time});
        console.log(time)
    };

    handleSubmit = event => {
        let obj = Object.assign({}, this.state);
        obj.time = obj.time.format('HH:mm:ss');
        obj.date = moment(obj.date).format("YYYY-MM-DD")
    
        axios.post('http://localhost:8080/api/applicants',obj)
        .then(response=> {
          console.log(response.data[0]);
          let {records} = this.state;
              
          records.push(response.data[0])
    
          this.setState({
            records,
            date: new Date(),
            time: moment(),
            first_name: '',
            last_name: '',
            contact_no: '',
            department_id: 1,
            isDone: false
          })
        })}


    handleClear = event => {
        this.setState({
                date: new Date(),
                time: moment(),
                first_name: '',
                last_name: '',
                contact_no: '',
                department_id: 1,
                isDone: false
        })
    }

    handleDelete = (id) => {
        console.log("delete", id)
        axios.delete('http://localhost:8080/api/applicants/' + id)
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

  footer = [
    <Button key="btnSubmitInt" type="success" pullRight text="Save" onClick={this.handleSubmit} margin="true" />, 
    <Button key="btnSubmitCancelInt" type="warning" pullRight text="Clear" onClick={this.handleClear} margin="true" />, 
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
                                <DatePicker name="date" selected={this.state.date} onChange={this.handleChangeDate}/>
                            </div>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className="form-group">
                            <label>Time</label>
                            <div>
                            <TimePicker name="time" value={this.state.time} onChange={this.handleChangeTime} />
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
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
                            <input type="text" name="contact_no" value={this.state.contact_no} onChange={this.handleChange} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                </Row>        
            </Box>

          <Row>
          

          <Col md={12}>
            <Box type="primary" collapsable title="Dependents">
                <table className="table table-head-fixed" id="EmployeesTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Applicant</th>
                            <th>Department</th>
                            <th>Contact</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                          {this.state.records.map(applicant => {
                              return  (<tr key={applicant.id}>
                                          <td>{moment(applicant.date).format("YYYY-MM-DD")}</td>
                                          <td>{applicant.time}</td>
                                          <td>{applicant.first_name.charAt(0).toUpperCase() + applicant.first_name.slice(1)} {applicant.last_name.charAt(0).toUpperCase() + applicant.last_name.slice(1)}</td>
                                          <td>{applicant.department_id}</td>
                                          <td>{applicant.contact_no}</td>
                                          <td>{applicant.isDone? 'Done' : 'Scheduled'}</td>
                                          <td><Button type="warning" text="Edit" onClick={() => this.handleEdit(applicant.id)}></Button></td>
                                          <td><Button type="danger" text="Delete" onClick={() => this.handleDelete(applicant.id)}></Button></td>
                                      </tr>);
                                  })}
                    </tbody>
                </table>
            </Box>
        </Col>

        </Row>

    </Content>);
  }
}

export default InterviewComponent;