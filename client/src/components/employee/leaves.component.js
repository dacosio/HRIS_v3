import React, { Component } from 'react';
import { connect } from "react-redux";

import { Content, Row, Col, Box, Button, SimpleTable} from 'adminlte-2-react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import moment from 'moment';
 
import "react-datepicker/dist/react-datepicker.css";
 
class LeaveComponent extends Component {

  state = {
    from_date: new Date(),
    to_date: new Date(),
    reason: '',
    leave_type: '1',
    status: 0,
    created_by: 1, //todo
    records: []
  };

  constructor(props){
    super(props);
  }

  leaveStatus = ["Pending","Approved","Declined"];

  componentDidMount() {
      axios.get(`${process.env.REACT_APP_API_SERVER}/api/leaves/`,
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
   
  handleChangeFrom = date => {
    this.setState({
      from_date: date
    });
    // console.log(date);
    
  };

  handleChangeTo = date => {
    this.setState({
    to_date: date
    });
    // console.log(date)
  };

  leaveTypeChange = event => {
    this.setState({
      leave_type: event.target.value
    })
}

  handleReason = event => {
    this.setState({
      reason: event.target.value
    })
    // console.log(event.target.value);
    
  }

  handleSubmit = event => {
    axios.post(`${process.env.REACT_APP_API_SERVER}/api/leaves`,this.state,
    {
      headers: { Authorization: `Bearer ${this.props.token}` }
    }) //params todo
        .then(response=> {
          console.log(response.data[0]);
          let {records} = this.state;
          
          records.push(response.data[0])

          
          this.setState({
            records,
            reason: '',
          })
  })}

  footer = [
    <Button key="btnSubmitLeave" type="success" pullRight text="Submit" onClick={this.handleSubmit} />, 
  ];


  render() {
    return (
      <Content title="Leaves" subTitle="Requests" browserTitle="Leaves">
      <Row>
      <Col md={4}>
      <Row> 
        <Col xs={12}>
          <form>
            <Box  title="Leave Application" type="primary" name="leave_type" footer={this.footer}>
              <div className="form-group">
                  <label>Leave Type</label>
                  <div>
                    <select ref="leave_type" value= {this.state.leave_type} onChange={this.leaveTypeChange}>
                      <option value='1'>Vacation</option>
                      <option value='2'>Sick</option>
                      <option value='3'>Compassionate</option>
                      <option value='4'>Maternity</option>
                      <option value='5'>Paternity</option>
                    </select>
                  </div>
                </div>
              <div className="form-group">
                  <label>From</label>
                  <div>
                    <DatePicker ref="from_date"
                      selected={this.state.from_date}
                      onChange={this.handleChangeFrom}
                      name="from_date"
                    />
                  </div>
              </div>
              <div className="form-group">
                  <label>To</label>
                <div>
                <DatePicker
                      ref="to_date"
                      selected={this.state.to_date}
                      onChange={this.handleChangeTo}
                      name="to_date"
                    />
                </div>
              </div>
              
              <div className="form-group">
                  <label>Reason</label>
                  <textarea type="text" ref="reason" name="reason" value={this.state.reason} className="form-control" placeholder="Enter ..." onChange={this.handleReason} />
              </div>
          
              </Box>
          </form>
        </Col>
      </Row>
      </Col>
      
      <Col md={8}>
         
            <Box type="primary" collapsable title="Leave Requests">
                <table className="table table-head-fixed" id="EmployeesTable">
                    <thead>
                        <tr>
                            <th>Leave Type</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                          {this.state.records.map(leave => {
                              return  (<tr key={leave.id}>
                                          <td>{leave.leave_type==1?"Vacation": leave.leave_type ==2?"Sick": leave.leave_type==3?"Compassionate":leave.leave_type==4?"Maternity":"Paternity"}</td>
                                          <td>{moment(leave.from_date).format("YY/MMM/DD")}</td>
                                          <td>{moment(leave.to_date).format("YY/MMM/DD")}</td>
                                          <td>{leave.reason}</td>
                                          <td>{this.leaveStatus[leave.status]}</td>
                                         
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

export default connect(mapStateToProps)(LeaveComponent);