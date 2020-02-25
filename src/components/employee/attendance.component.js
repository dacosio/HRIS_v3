import React, { Component } from 'react';
import { Content, Row, Col, Box } from 'adminlte-2-react';

class AttendanceComponent extends Component {
    state = {}

    render() {
      return (<Content title="Attendance" subTitle="Employee Attendance" browserTitle="Attendance">
        <Row>
          <Col xs={3} md={3}>
            <Box title="Actions" collapsable>
              <ul>
                <li>
                  <a href="dummy_url">Time In</a>
                </li>
                <li>
                  <a href="dummy_url">Time Out</a>
                </li>
              </ul>
              
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