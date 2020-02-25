import React, { Component } from 'react';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import DatePicker from "react-datepicker";
 
// import "react-datepicker/dist/react-datepicker.css";

// const { Select2, Date, DateTime, Text } = Inputs;
 
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
 
class Leaves extends Component {
 
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
 
  render() {
    return (
      <Content title="Leaves" subTitle="Leave Requests" browserTitle="Leaves">
      <Row> 
        <Col xs={12}>
          <Box title="End of Day" type="primary" collapsable  onSubmit={this.handleSubmit} footer={[<Button type="success" pullRight text="Submit" />, <Button type="warning" pullRight text="Cancel" />]}>
          <div className="form-group">
              <label>Leave Type</label>
              <div>
                <select value={this.state.leave_type} onChange={this.leaveTypeChange}>
                  <option value= '1'>Vacation</option>
                  <option value='2'>Sick</option>
                  <option value='3'>Compassionate</option>
                  <option value='4'>Maternity</option>
                  <option valie='5'>Paternity</option>
                </select>
              </div>
            </div>
          <div className="form-group">
              <label>From</label>
            <div><DatePicker selected={this.state.from_date} onChange={this.handleChangeFrom}/></div>
          </div>
          <div className="form-group">
              <label>To</label>
            <div><DatePicker selected={this.state.to_date} onChange={this.handleChangeTo}/></div>
          </div>
          
          <div className="form-group">
              <label>Reason</label>
              <textarea type="text" className="form-control" placeholder="Enter ..." />
          </div>
         
          </Box>
        </Col>
      </Row>
      <Row>
     </Row>
    </Content>);
  }
}

export default Leaves;