import { connect } from "react-redux";
import React, { Component } from 'react';
import moment from 'moment';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import TimePicker from 'rc-time-picker';
import DatePicker from "react-datepicker";
import axios from 'axios';


import 'rc-time-picker/assets/index.css';

class InterviewComponent extends Component {


    state = {
        obj: {
            date: new Date(),
            time: moment(),
            first_name: '',
            last_name: '',
            contact_no: '',
            department_id: 1,
            isDone: false
        },
        records: [],
        editing: false
        }
 

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_API_SERVER}/api/applicants`,
        {
          headers: { Authorization: `Bearer ${this.props.token}` }
        }) //params todo
        .then(result => {
            
          this.setState({records: result.data})
        })
        .catch(error => {
          console.error(error);
        })
      }
    
   
    handleDepartment = (event) => {
    var obj = {...this.state.obj};
    obj.department_id = event.target.value;

    this.setState({obj});

    console.log(event.target.value);
    }

    handleFirstName = (event) => {
    var obj = {...this.state.obj};
    obj.first_name = event.target.value;

    this.setState({obj});

    console.log(event.target.value);
    }

    handleLastName = (event) => {
    var obj = {...this.state.obj};
    obj.last_name = event.target.value;

    this.setState({obj});

    console.log(event.target.value);
    }
    
    handleContact = (event) => {
    var obj = {...this.state.obj};
    obj.contact_no = event.target.value;

    this.setState({obj});

    console.log(event.target.value);
    }

    handleChangeDate = date => {
        var obj = {...this.state.obj};
        obj.date = date;
        
        this.setState({obj});
        console.log(date);
      };

    handleChangeTime = time => {
        var obj = {...this.state.obj};
        obj.time = time;
        
        this.setState({obj});
        console.log(time);
    };

    handleSubmit = event => {
        let obj = Object.assign({}, this.state.obj);
        obj.time = obj.time.format('HH:mm:ss');
        obj.date = moment(obj.date).format("YYYY-MM-DD")
        console.log(obj)
    
        axios.post(`${process.env.REACT_APP_API_SERVER}/api/applicants`,obj,
        {
          headers: { Authorization: `Bearer ${this.props.token}` }
        }) //params todo
        .then(response=> {
          console.log(response.data[0]);
          let {records} = this.state;
              
    
          this.setState({
            "records": records.concat(response.data[0]),
            obj: {
                date: new Date(),
                time: moment(),
                first_name: '',
                last_name: '',
                contact_no: '',
                department_id: 1,
                isDone: false
            }
          })
        })
        event.preventDefault();
    }


    handleClear = event => {
        this.setState({
                "obj" : {
                    date: new Date(),
                    time: moment(),
                    first_name: '',
                    last_name: '',
                    contact_no: '',
                    department_id: 1,
                    isDone: false
                }
        })
    }

    handleEdit = (id) => {
        console.log("edit", id)
        console.log(this.state.records)
        let app = this.state.records.find(app => app.id == id)
        console.log('app',app)
        console.log(app.time)
        this.setState({editing:true});
    
        var obj = this.state.obj;
        console.log('object',obj)
        console.log('object time',obj.time.format("HH:mm:ss"));
        obj.id = id;
        obj.date = new Date(moment(app.date).format("YYYY-MM-DD"));
        obj.time = moment(); 
        obj.first_name = app.first_name;
        obj.last_name = app.last_name;
        obj.contact_no = app.contact_no;
        obj.department_id = app.department_id;
        
        this.setState(obj);
      }


    updateApplicant = event => {
        console.log('state',this.state.records)
        console.log('records',this.state.id)
        console.log('time',this.state.time.format("HH:mm:ss"))

        let {obj} = this.state;
        obj.time = this.state.obj.time.format("HH:mm:ss");
        this.setState(obj);

<<<<<<< HEAD
<<<<<<< Updated upstream
        axios.put(`${process.env.REACT_APP_API_SERVER}/api/applicants/` + this.state.obj.id, this.state.obj,
=======
        axios.put(`${process.env.REACT_APP_API_SERVER}/api/applicants/` + this.state.id, this.state.obj,
>>>>>>> Stashed changes
=======
        axios.put(`${process.env.REACT_APP_API_SERVER}/api/applicants/` + this.state.obj.id, this.state.obj,
>>>>>>> master
            {
            headers: { Authorization: `Bearer ${this.props.token}` }
            }) //params todo
            .then(response => {
            console.log('updateDependent', response.data[0]);
            var updatedApplicant = response.data[0];

            var previousApplicants = this.state.records.filter(app => app.id != updatedApplicant.id);
            this.setState({"records": [...previousApplicants, updatedApplicant], "editing": false});

            console.log("Previous Applicant",previousApplicants,"Updated Applicant",updatedApplicant);
            })
            .catch(error => {
            console.error(error)
            })
            
        this.handleClear();
    }

    cancelEditing = (editing) => {
        this.setState({
          editing: false
        });
    
        this.handleClear();
      }

    handleDelete = (id) => {
        console.log("delete", id)
        axios.delete(`${process.env.REACT_APP_API_SERVER}/api/applicants/` + id,
        {
          headers: { Authorization: `Bearer ${this.props.token}` }
        }) //params todo
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

    footer_add = [
        <Button key="btnSubmitAddApp1" type="success" pullRight text="Submit" onClick={this.handleSubmit} margin="true"/>,
        <Button key="btnSubmitAddApp2" type="warning" pullRight  text="Clear All" onClick={this.handleClear} margin="true" />
    ];

    footer_edit = [
        <Button key="btnSubmitEditApp1" type="success" pullRight text="Save" onClick={this.updateApplicant} margin="true"/>,
        <Button key="btnSubmitEditApp2" type="warning" pullRight  text="Cancel" onClick={()=> this.cancelEditing(false)} margin="true"/>
    ];


  render() {
    return (
      <Content title="Interview" subTitle="Schedule" browserTitle="Interviews">
              
            {this.state.editing ? (
            <Box title="Editing Applicant" type="primary" collapsable footer={this.footer_edit}>
                <Row>
                    <Col md={2}>
                        <div className="form-group">
                            <label>Date</label>
                            <div>
                                <DatePicker name="date" selected={this.state.obj.date} onChange={this.handleChangeDate}/>
                            </div>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className="form-group">
                            <label>Time</label>
                            <div>
                            <TimePicker name="obj.time" value={this.state.obj.time} onChange={this.handleChangeTime} />
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="form-group">
                            <label>Department</label>
                            <div>
                                <select value= {this.state.obj.department_id} name="obj.department_id" onChange={this.handleDepartment}>
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
                            <input type="text" name="first_name" value={this.state.obj.first_name} onChange={this.handleFirstName} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="last_name" value={this.state.obj.last_name} onChange={this.handleLastName} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="form-group">
                            <label>Contact</label>
                            <input type="text" name="contact_no" value={this.state.obj.contact_no} onChange={this.handleContact} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                </Row>        
            </Box>
        ): <Box title="Add Applicant" type="primary" collapsable footer={this.footer_add}>
                <Row>
                    <Col md={2}>
                        <div className="form-group">
                            <label>Date</label>
                            <div>
                                <DatePicker name="date" selected={this.state.obj.date} onChange={this.handleChangeDate}/>
                            </div>
                        </div>
                    </Col>
                    <Col md={2}>
                        <div className="form-group">
                            <label>Time</label>
                            <div>
                            <TimePicker name="obj.time" value={this.state.obj.time} onChange={this.handleChangeTime} />
                            </div>
                        </div>
                    </Col>
                    <Col md={8}>
                        <div className="form-group">
                            <label>Department</label>
                            <div>
                                <select value= {this.state.obj.department_id} name="obj.department_id" onChange={this.handleDepartment}>
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
                            <input type="text" name="first_name" value={this.state.obj.first_name} onChange={this.handleFirstName} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input type="text" name="last_name" value={this.state.obj.last_name} onChange={this.handleLastName} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                    <Col md={3}>
                        <div className="form-group">
                            <label>Contact</label>
                            <input type="text" name="contact_no" value={this.state.obj.contact_no} onChange={this.handleContact} className="form-control" placeholder="Enter ..." />
                        </div>
                    </Col>
                </Row>        
            </Box>}
            
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
                                            <td>{applicant.department}</td>
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
const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token,
    userData: JSON.parse(state.auth.userData)
  });
  
  export default connect(mapStateToProps)(InterviewComponent);