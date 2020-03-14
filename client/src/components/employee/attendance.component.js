import React, { Component } from 'react';
import { connect } from "react-redux";

import { Content, Row, Col, Box, Button, SimpleTable } from 'adminlte-2-react';
import moment from 'moment';
import axios from 'axios';


class AttendanceComponent extends Component {

    state = {
      records: [],
      log_today: null
    };

    componentDidMount() {
      axios.get(`${process.env.REACT_APP_API_SERVER}/api/logs`,
      {
        headers: { Authorization: `Bearer ${this.props.token}` }
      }) //params todo
        .then(result => {
          
            if(result.data.length > 0) {
                result.data.forEach(res => {
                    res.created_at = moment(res.created_at).format("YYYY-MMM-DD");
                    res.time_in = moment(res.time_in).format("h:mm:ss a");
                    res.time_out = res.time_out? moment(res.time_out).format("h:mm:ss a") : null;
                });
                this.setState({records: result.data});
            }
            
            const date_today = moment().format("YYYY-MMM-DD");
            console.log(date_today)
            let log_today = this.state.records.find(log => log.created_at == date_today);
            
            if(log_today)
                this.setState({"log_today": log_today});

            console.log(this.state);
        })
        .catch(error => {
          console.error(error);
        })
    }

  handleTimeIn = event => {
    axios.post(`${process.env.REACT_APP_API_SERVER}/api/logs`,{},
    {
      headers: { Authorization: `Bearer ${this.props.token}` }
    }) //params todo
    .then(response=> {
      console.log(response.data);

      var logToday = response.data[0];
      logToday.created_at = moment(logToday.created_at).format("YYYY-MMM-DD");
      logToday.time_in = moment(logToday.time_in).format("h:mm:ss a");
      logToday.time_out = logToday.time_out? moment(logToday.time_out).format("h:mm:ss a") : null;
      
      this.setState({
        "records": this.state.records.concat(logToday),
        "log_today": null
      });

      const date_today = moment().format("YYYY-MMM-DD");
      let log_today = this.state.records.find(log => log.created_at == date_today);
      
      if(log_today)
          this.setState({"log_today": log_today});
      
    }).catch(error => {
      console.error(error);
    })
  };

  handleTimeOut = event => {
    axios.put(`${process.env.REACT_APP_API_SERVER}/api/logs/`+this.state.log_today.id,
    this.state.log_today,
    {
      headers: { Authorization: `Bearer ${this.props.token}` }
    }) //params todo
    .then(response=> {
      console.log("time out", response);

      var logToday = response.data[0];
      logToday.created_at = moment(logToday.created_at).format("YYYY-MMM-DD");
      logToday.time_in = moment(logToday.time_in).format("h:mm:ss a");
      logToday.time_out = logToday.time_out? moment(logToday.time_out).format("h:mm:ss a") : null;

      var previousLogs = this.state.records.filter(rec => rec.id != logToday.id);

      this.setState({
        "records": [...previousLogs,
          logToday]
      });
      console.log(this.state.records);
      const date_today = moment().format("YYYY-MMM-DD");
      let log_today = this.state.records.find(log => log.created_at == date_today);
      
      if(log_today)
          this.setState({"log_today": log_today});
    }).catch(error => {
      console.error(error);
    })
  };

    render() {
        return (<Content title="Attendance" subTitle="Employee Attendance" browserTitle="Attendance">
            <Row>
                <Col md={3}>
                <Box title="Actions" type="danger">
                    <Row>
                        <Col md={6}>
                        {
                            !this.state.log_today && 
                            <div>
                                <Button type="success" text="Time In" onClick={this.handleTimeIn} margin="true"/>
                            </div>
                         
                        }
                        
                        {
                            (this.state.log_today && !this.state.log_today.time_out) && 
                            <div>
                                <Button type="success" text="Time Out" onClick={this.handleTimeOut} margin="true"/>
                            </div>
                        }

                      </Col>
                    </Row>
                </Box>
                </Col>

                <Col md={9}>
                  <Box type="primary" collapsable title="Attendance">
                      <table className="table table-head-fixed" id="EmployeesTable">
                          <thead>
                              <tr>
                                  <th>Date</th>
                                  <th>Time In</th>
                                  <th>Time Out</th>
                              </tr>
                          </thead>
                          <tbody>
                                {this.state.records.map(time => {
                                    return  (<tr key={time.id}>
                                                <td>{time.created_at}</td>
                                                <td>{time.time_in}</td>
                                                <td>{time.time_out}</td>
                                              
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

export default connect(mapStateToProps)(AttendanceComponent);
