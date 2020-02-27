import React, { Component } from 'react';
import moment from 'moment';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import TimePicker from 'rc-time-picker';
import DatePicker from "react-datepicker";
import axios from 'axios';
import RequestStatusComponent from './requestStatus.component';

import 'rc-time-picker/assets/index.css';

class UndertimeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date_filed: new Date(),
      from_time: moment(),
      to_time: moment(),
      reason: '',
      time_type: 2,
      isAccepted: false,
      created_by: 1 //todo
    };
  }
  
  handleChangeDateFiled = date => {
    this.setState({'date_filed': date});
  };
 
  handleFromTime = time => {
    this.setState({from_time: time});
  };

  handleToTime = time => {
    this.setState({to_time: time});
  };

  handleReason = event => {
    this.setState({reason: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();

    let obj = Object.assign({}, this.state);
    obj.from_time = obj.from_time.format('HH:mm:ss');
    obj.to_time = obj.to_time.format('HH:mm:ss');

    axios.post('http://localhost:8080/api/time',obj)
    .then(response=> {
      console.log(response);
    }).catch(error => {
      console.error(error);
    })
  };

  footer = [
    <Button key="btnSubmit" type="success" pullRight text="Submit" onClick={this.handleSubmit} />, 
  ];
  records = [];
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
      
          <RequestStatusComponent timeType="2" title="Undertime Requests"/>
        </Row>
    </Content>);
  }
}

export default UndertimeComponent;