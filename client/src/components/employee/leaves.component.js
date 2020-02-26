import React, { Component } from 'react';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import DatePicker from "react-datepicker";
 
import "react-datepicker/dist/react-datepicker.css";
 
class LeaveComponent extends Component {

  state = {
    from_date: new Date(),
    to_date: new Date(),
    reason: '',
    leave_type: '1',
    created_by: 1 //todo
  };
   
  handleChangeFrom = date => {
    this.setState({
      from_date: date
    });
    console.log(date);
    
  };

  handleChangeTo = date => {
    this.setState({
    to_date: date
    });
    console.log(date)
  };

  leaveTypeChange = event => {
    this.setState({
      leave_type: event.target.value
    })
    console.log(event.target.value);
  }

  handleReason = event => {
    this.setState({
      reason: event.target.value
    })
    console.log(event.target.value);
    
  }

  handleSubmit = event => {
    alert(`${this.state.reason}`)
    event.preventDefault();
  }

  footer = [
    <Button key="btnSubmit" type="success" pullRight text="Submit" onClick={this.handleSubmit} />, 
  ];

  render() {
    return (
      <Content title="Leaves" subTitle="Requests" browserTitle="Leaves">
      <Row>
      <Col md={6}>
      <Row> 
        <Col xs={12}>
          <form>
            <Box title="Leave Application" type="primary" collapsable footer={this.footer}>
              <div className="form-group">
                  <label>Leave Type</label>
                  <div>
                    <select value= {this.state.leave_type} onChange={this.leaveTypeChange}>
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
                    <DatePicker
                      selected={this.state.from_date}
                      onChange={this.handleChangeFrom}
                    />
                  </div>
              </div>
              <div className="form-group">
                  <label>To</label>
                <div>
                <DatePicker
                      selected={this.state.to_date}
                      onChange={this.handleChangeTo}
                    />
                </div>
              </div>
              
              <div className="form-group">
                  <label>Reason</label>
                  <textarea type="text" value={this.state.reason} className="form-control" placeholder="Enter ..." onChange={this.handleReason} />
              </div>
          
              </Box>
          </form>
        </Col>
      </Row>
      </Col>
      
      <Col md={6}>
          <Box title="Request Status" type="primary" collapsable>
            <div className="form-group">
                <label>todo</label>
            </div>
          </Box>
        </Col>
      </Row>
    </Content>);
  }
}

export default LeaveComponent;