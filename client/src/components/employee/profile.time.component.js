import React, { Component } from "react";
import moment from "moment";
import { Content, Row, Col, Box, Button } from "adminlte-2-react";
import axios from "axios";

class TimeRequestsComponent extends Component {
  state = {
    id: 0,
    isAccepted: false,

    records: []
  };

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/time/timeRequest") //params todo
      .then(result => {
        this.setState({ records: result.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleAccept = id => {
    this.setState({
      isAccepted: true
    });
    console.log("state", this.state);
    console.log("records id", this.state.id);
    let time = this.state.records.find(time => time.id == id);
    console.log(time);
  };

  handleDecline = id => {
    console.log("state", this.state.records);
    console.log("records id", this.state.id);

    let time = this.state.records.find(time => time.id == id);
    console.log(time);
  };

  render() {
    return (
      <Row>
        <Col md={12}>
          <Box title="Time Requests" type="primary" collapsable>
            <table className="table table-head-fixed" id="TimesTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>From</th>
                  <th>To</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.records.map(time => {
                  return (
                    <tr key={time.id}>
                      <td>
                        {time.first_name.charAt(0).toUpperCase() +
                          time.first_name.slice(1)}{" "}
                        {time.last_name.charAt(0).toUpperCase() +
                          time.last_name.slice(1)}
                      </td>
                      <td>{time.type}</td>
                      <td>{moment(time.from_date).format("YYYY-MM-DD")}</td>
                      <td>{moment(time.to_date).format("YYYY-MM-DD")}</td>
                      <td>{time.reason}</td>
                      <td>
                        <Button
                          type="success"
                          text="Accept"
                          onClick={() => this.handleAccept(time.id)}
                        ></Button>
                      </td>
                      <td>
                        <Button
                          type="danger"
                          text="Decline"
                          onClick={() => this.handleDecline(time.id)}
                        ></Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Box>
        </Col>
      </Row>
    );
  }
}

export default TimeRequestsComponent;
