import React, { Component } from 'react';
import { Content, Row, Col, Box, Button, SimpleTable } from 'adminlte-2-react';
import moment from 'moment';
import axios from 'axios';


class AttendanceComponent extends Component {
    state = {
      time_in: moment().valueOf(),
      time_out: moment().valueOf(),
      created_by : 1, //todo
      records: []
    }

    componentDidMount() {
      axios.get('http://localhost:8080/api/logs') //params todo
        .then(result => {
          console.log(result.data);
          result.data.forEach(res => {
          res.created_at = moment(res.created_at).format("YYYY-MMM-DD");
          res.time_in = moment(res.time_in).format("HH:mm:ss a");
          res.time_out = moment(res.time_out).format("HH:mm:ss a");
          })
          this.setState({records: result.data})
        })
        .catch(error => {
          console.error(error);
        })
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
          
          <Col md={9}>
            <Box title="Time History" type="primary" collapsable>
                <SimpleTable columns={this.columns}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
            </Box>
         </Col>
          
        </Row>
      </Content>);
    }
}

export default AttendanceComponent;