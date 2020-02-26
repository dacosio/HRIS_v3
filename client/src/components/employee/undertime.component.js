import React, { Component } from 'react';
import moment from 'moment';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import TimePicker from 'rc-time-picker';
import DatePicker from "react-datepicker";


import 'rc-time-picker/assets/index.css';

class UndertimeComponent extends Component {
 
  state = {
    date_filed: new Date(),
    from_time: moment(),
    to_time: moment(),
    reason: '',
    time_type: 1,
    isAccepted: false,
    created_by: 1 //todo
    };
    

  handleChangeDateFiled = date => {
    this.setState({
      date_filed: date
    });
    console.log(date)
  };
 
  handleFromTime = time => {
    this.setState({
        from_time: time
    });
    console.log(time.format('HH:mm:ss'));
    
  };

  handleToTime = time => {
    this.setState({
        to_time: time
    });
    console.log(time.format('HH:mm:ss'));
  };

 

  handleReason = event => {
    this.setState({
      reason: event.target.value
    })
    console.log(event.target.value);
  }


  handleSubmit = event => {
    alert(` ${this.state.date_filed}, ${this.state.reason}`)
    event.preventDefault();
  }

  footer = [
    <Button key="btnSubmit" type="success" pullRight text="Submit" onClick={this.handleSubmit} />, 
  ];

  render() {
    return (
      <Content title="Undertime" subTitle="Requests" browserTitle="Undertime">
      <Row>
      <Col md={6}>
      <Row> 
        <Col xs={12}>
          <Box title="Undertime Application" type="primary" collapsable footer={this.footer}>
          <div className="form-group">
              <label>Date</label>
              <div>
                <DatePicker selected={this.state.date_filed} onChange={this.handleChangeDateFiled}/>
              </div>
            </div>
          <div className="form-group">
              <label>From</label>
              <div>
                <TimePicker defaultValue={this.state.from_time} onChange={this.handleFromTime} />
              </div>
          </div>
          <div className="form-group">
              <label>To</label>
            <div>
              <TimePicker defaultValue={this.state.from_time} onChange={this.handleToTime} />
            </div>
          </div>
          
          <div className="form-group">
              <label>Reason</label>
              <textarea type="text" value={this.state.reason} onChange={this.handleReason} className="form-control" placeholder="Enter ..." />
          </div>
         
          </Box>
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

export default UndertimeComponent;