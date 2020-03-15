import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import TimePicker from 'rc-time-picker';
import DatePicker from "react-datepicker";
import axios from 'axios';

import 'rc-time-picker/assets/index.css';

class UndertimeComponent extends Component {

 constructor(props){
    super(props);

    this.state = {
      date_filed: new Date(),
      from_time: moment(),
      to_time: moment(),
      reason: '',
      time_type: 2,
      status: 0,
      created_by: 1, //todo
      records : []
    };

  }
  timeStatus = ["Pending","Approved","Declined"];

  componentDidMount(){
    console.log(this.props);
    axios.get(`${process.env.REACT_APP_API_SERVER}/api/time`,{
      headers: { Authorization: `Bearer ${this.props.token}` }
    }) //params todo
    .then(result => {
        // console.log(result);
        
        this.setState({
          records: this.state.records.concat(result.data.filter(res => res.time_type == 2))
        });

        // console.log("state",this.state.records);
    })
    .catch(err => console.log(err));
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
    let obj = Object.assign({}, this.state);
    obj.from_time = obj.from_time.format('HH:mm:ss');
    obj.to_time = obj.to_time.format('HH:mm:ss');

    axios.post(`${process.env.REACT_APP_API_SERVER}/api/time`, obj, {
      headers: { Authorization: `Bearer ${this.props.token}` }
    })
    .then(response=> {
      console.log(response.data[0]);
      let {records} = this.state;
          
      records.push(response.data[0])

      this.setState({
        records,
        date_filed: new Date(),
        from_time: moment(),
        to_time: moment(),
        reason: '',
        time_type: 2,
        status: 0,
      })

    }).catch(error => {
      console.error(error);
    })
  };

  footer = [
    <Button key="btnSubmitUt" type="success" pullRight text="Submit" onClick={this.handleSubmit} />
  ];

  render() {
    return (
      <Content title="Undertime" subTitle="Requests" browserTitle="Undertime">
        <Row>
          <Col md={6}>
            <Row>
              <Col xs={12}>
                <Box title="Undertime Application" type="success" collapsable footer={this.footer}>
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
          <Box type="primary" collapsable title="Undertime Request">
                <table className="table table-head-fixed" id="EmployeesTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                      {this.state.records.map(ut => {
                          return  (<tr key={ut.id}>
                                      <td>{moment(ut.date_filed).format("YYYY-MM-DD")}</td>
                                      <td>{ut.from_time}</td>
                                      <td>{ut.to_time}</td>
                                      <td>{ut.reason}</td>
                                      <td>{this.timeStatus[ut.status]}</td>
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

export default connect(mapStateToProps)(UndertimeComponent);
