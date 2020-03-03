import React, { Component } from 'react';
import { Content, Row, Col, Box, Button, SimpleTable } from 'adminlte-2-react';
import moment from 'moment';
import axios from 'axios';


class AttendanceComponent extends Component {

    state = {
      records: [],
      log_today: null
    };

    componentDidMount() {
      axios.get('http://localhost:8080/api/logs') //params todo
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
    axios.post('http://localhost:8080/api/logs',{})
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
    axios.put('http://localhost:8080/api/logs/'+this.state.log_today.id,
    this.state.log_today)
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

      //todo reload record
      //update state of button

    }).catch(error => {
      console.error(error);
    })
  };

//   columns = [
//     {
//       title: "Date",
//       data: 'created_at',
//     },
//     {
//       title: "Time In",
//       data: 'time_in',
//     },
//   {
//       title: "Time Out",
//       data: 'time_out',
//     }
// ];


    render() {
        return (<Content title="Attendance" subTitle="Employee Attendance" browserTitle="Attendance">
            <Row>
                <Col md={3}>
                <Box title="Actions" type="danger">
                    <Row>
                        <Col xs={6}>

                        {
                            !this.state.log_today && 
                            <div>
                                <Button type="success" text="Time In" onClick={this.handleTimeIn}/>
                            </div>
                         
                        }
                        
                        {
                            (this.state.log_today && !this.state.log_today.time_out) && 
                            <div>
                                <Button type="success" text="Time Out" onClick={this.handleTimeOut} />
                            </div>
                        }

                        </Col>
                        <Col xs={6}>
                        <div>
                            {/* {this.state.records.forEach(time => time.time_in )} */}
                        </div>
                        
                        </Col>
                    </Row>
                </Box>
                </Col>

                <Col md={9}>
                  {/* <Box title="Time History" type="primary" collapsable>
                      <SimpleTable columns={this.columns} data={this.state.records} responsive="true" striped="true" hover="true"
                          border="true"></SimpleTable>
                  </Box> */}

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

export default AttendanceComponent;