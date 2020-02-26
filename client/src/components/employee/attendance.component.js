import React, { Component } from 'react';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
import moment from 'moment';


class AttendanceComponent extends Component {
    state = {
      time_in: new Date().toLocaleString(),
      // time_in: moment().format("HH:MM:ss"),
      time_out: moment().format("HH:mm:ss"),
      created_by : 1, //todo
      text: "Time In"
    }

  handleTimeIn = time => {
    this.setState({
      time_in: time,
    })
  }

  handleTimeOut = time => {
    this.setState({
      time_out: time
    })
  }


    render() {
      return (<Content title="Attendance" subTitle="Employee Attendance" browserTitle="Attendance">
        <Row>
          <Col xs={3} md={3}>
            <Box title="Actions" collapsable>
             <Row>
             <Col xs={6}>
                <div>
                <Button type="success" text="Time In" onClick={this.handleTimeIn}/>
                </div>
              <br/>
                <div>
                  <Button type="success" text="Time Out" onClick={this.handleTimeOut}/>
                </div>
              </Col>
              <Col xs={6}>
                <div>
                  {this.state.time_in}
                </div>
              <br/>
                <div>
                  {this.state.time_out}
                </div>
              </Col>
            </Row>
            </Box>
          </Col>
          
          <Col xs={9} md={9}>
            <Box title="My first box" type="primary" collapsable>
              Hello World
              todo: list all attendance here
            </Box>
          </Col>
          
        </Row>
      </Content>);
    }
}

export default AttendanceComponent;