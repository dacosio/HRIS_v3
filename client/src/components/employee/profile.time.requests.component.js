import React, { Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment';
import { Content, Row, Col, Box, Button } from "adminlte-2-react";
import axios from "axios";

class TimeRequestsComponent extends Component {
  state = {
    obj : {id: 0,
    status: 0},
    records: []
  };

  constructor(props){
    super(props);
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_API_SERVER}/api/time/timeRequest`,
      {
        headers: { Authorization: `Bearer ${this.props.token}` }
      }) //params todo
      .then(result => {
        this.setState({ records: result.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleAccept = id => {
    
    let time = this.state.records.find(time => time.id == id);

    axios.put(`${process.env.REACT_APP_API_SERVER}/api/time/approveTimeRequest/` + time.id, {},
    {
      headers: { Authorization: `Bearer ${this.props.token}` }
    })
      .then(res=> {
        console.log(res)

        const newRecords = this.state.records.filter(res => {
                return res.id != id
              })

            this.setState({
              records: [...newRecords]
            })

      })
      .catch(err => {
        console.error(err)
      })

  };

  handleDecline = id => {
    
    let time = this.state.records.find(time => time.id == id);

    axios.put(`${process.env.REACT_APP_API_SERVER}/api/time/declineTimeRequest/` + time.id, {},
      {
        headers: { Authorization: `Bearer ${this.props.token}` }
      })
      .then(res=> {
        console.log(res)

        const newRecords = this.state.records.filter(res => {
                return res.id != id
              })

            this.setState({
              records: [...newRecords]
            }) 

      })
      .catch(err => {
        console.error(err)
      })

  };

  render() {
    return (
      (this.state.records.length > 0) && <Row>
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
                      <td>{time.from_time}</td>
                      <td>{time.to_time}</td>
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


const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  userData: JSON.parse(state.auth.userData)
});

export default connect(mapStateToProps)(TimeRequestsComponent);
