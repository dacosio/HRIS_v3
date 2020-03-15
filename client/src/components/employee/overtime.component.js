import axios from 'axios';
import moment from 'moment';
import { connect } from "react-redux";
import React, { Component } from 'react';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import TimePicker from 'rc-time-picker';
import DatePicker from "react-datepicker";

import 'rc-time-picker/assets/index.css';

class OvertimeComponent extends Component {
 
  state = {
    date_filed: new Date(),
    from_time: moment(),
    to_time: moment(),
    reason: '',
    time_type: 1,
    status: 0,
    created_by: 1, //todo
    records: []
  };
    constructor(props){
    super(props);
  }

  timeStatus = ["Pending","Approved","Declined"];


    
  componentDidMount(){
    axios.get(`${process.env.REACT_APP_API_SERVER}/api/time`,{
      headers: { Authorization: `Bearer ${this.props.token}` }
    }) //params todo
    .then(result => {
        // console.log(result);
        // result.data.from_time = moment(result.from_time).format('HH:mm:ss a')
        result.data.forEach(res=> {
          // res.from_time = moment(res.from_time).format("HH:mm:ss a");
          // res.to_time = moment(res.to_time).format("HH:mm:ss a");
          console.log("time response",res.from_time)
        })
        
        this.setState({
          records: this.state.records.concat(result.data.filter(res => res.time_type == 1))

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

    if(obj.reason.trim() == ""){
      return alert("Please enter a reason.");
    }
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
        time_type: 1,
        status: 0,
      })

    }).catch(error => {
      console.error(error);
    })
  };

  footer = [
    <Button key="btnSubmitOt" type="success" pullRight text="Submit" onClick={this.handleSubmit} />,
  ];

  render() {
    return (
    <Content title="Overtime" subTitle="Requests" browserTitle="Overtime">
      <Row>
        <Col md={6}>
          <Row>
              <Col xs={12}>
                <Box title="Overtime Application" type="success" collapsable footer={this.footer}>
                    <div className="form-group">
                        <label>Date</label>
                        <div>
                            <DatePicker name="date_filed" selected={this.state.date_filed}
                                onChange={this.handleChangeDateFiled} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>From</label>
                        <div>
                            <TimePicker name="from_time" value={this.state.from_time} onChange={this.handleFromTime} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label>To</label>
                        <div>
                            <TimePicker name="to_time" value={this.state.to_time} onChange={this.handleToTime} required/>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Reason</label>
                        <textarea type="text" name="reason" value={this.state.reason} onChange={this.handleReason}
                            className="form-control" placeholder="Enter ..." required/>
                    </div>
                </Box>
              </Col>
          </Row>
        </Col>
        <Col md={6}>
          <Box type="primary" collapsable title="Overtime Request">
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
                      {this.state.records.map(ot => {
                          return  (<tr key={ot.id}>
                                      <td>{moment(ot.date_filed).format("YYYY-MMM-DD")}</td>
                                      <td>{ot.from_time}</td>
                                      <td>{ot.to_time}</td>
                                      <td>{ot.reason}</td>
                                      <td>{this.timeStatus[ot.status]}</td>
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

export default connect(mapStateToProps)(OvertimeComponent);
