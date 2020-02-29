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

  // handleTimeIn = time => {
  //   this.setState({
  //     time_in: time,
  //   })
  // }

  handleTimeIn = event => {
    event.preventDefault();
    axios.post('http://localhost:8080/api/logs',{})
    .then(response=> {
      console.log(response);
    }).catch(error => {
      console.error(error);
    })
  };

  handleTimeOut = event => {
    event.preventDefault();
    axios.put('http://localhost:8080/api/logs/'+this.state.log_today.id,
    this.state.log_today)
    .then(response=> {
      console.log(response);
    }).catch(error => {
      console.error(error);
    })
  };

  columns = [
    {
      title: "Date",
      data: 'created_at',
    },
    {
      title: "Time In",
      data: 'time_in',
    },
  {
      title: "Time Out",
      data: 'time_out',
    }
];


    render() {
        return (<Content title="Attendance" subTitle="Employee Attendance" browserTitle="Attendance">
            <Row>
                <Col xs={3} md={3}>
                <Box title="Actions" type="danger">
                    <Row>
                        <Col xs={6}>
                        {
                            !this.state.log_today && 
                            <div>
                                <Button type="success" text="Time In" onClick={this.handleTimeIn} />
                            </div>
                        }
                        <br />
                        {
                            (this.state.log_today && !this.state.log_today.time_out) && 
                            <div>
                                <Button type="success" text="Time Out" onClick={this.handleTimeOut} />
                            </div>
                        }
                        </Col>
                        <Col xs={6}>
                        <div>
                            {/* {this.state.time_in} */}
                        </div>
                        <br />
                        <div>
                            {/* {this.state.time_out} */}
                        </div>
                        </Col>
                    </Row>
                </Box>
                </Col>

                <Col md={9}>
                <Box title="Time History" type="primary" collapsable>
                    <SimpleTable columns={this.columns} data={this.state.records} responsive="true" striped="true" hover="true"
                        border="true"></SimpleTable>
                </Box>
                </Col>

            </Row>
        </Content>);
    }
}

export default AttendanceComponent;