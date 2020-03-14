import React, { Component } from 'react';
import { connect } from "react-redux";

import moment from "moment";
import { Content, Row, Col, Box, Button } from "adminlte-2-react";
import axios from "axios";

class LeaveRequestsComponent extends Component {
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
      .get(`${process.env.REACT_APP_API_SERVER}/api/leaves/leaveRequest`,
      {
        headers: { Authorization: `Bearer ${this.props.token}` }
      }) //params todo //params todo
      .then(result => {
        this.setState({ records: result.data });
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleAccept = id => {
    
    let leave = this.state.records.find(leave => leave.id == id);

    axios.put(`${process.env.REACT_APP_API_SERVER}/api/leaves/approveLeaveRequest/` + leave.id, {},
    {
      headers: { Authorization: `Bearer ${this.props.token}` }
    }) //params todo //params todo
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
    
    let leave = this.state.records.find(leave => leave.id == id);

    axios.put(`${process.env.REACT_APP_API_SERVER}/api/leaves/declineLeaveRequest/` + leave.id, {},
    {
      headers: { Authorization: `Bearer ${this.props.token}` }
    }) //params todo //params todo
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
      <Row>
        <Col md={12}>
          <Box title="Leave Requests" type="primary" collapsable>
            <table className="table table-head-fixed" id="LeavesTable">
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
                {this.state.records.map(leave => {
                  return (
                    <tr key={leave.id}>
                      <td>
                        {leave.first_name.charAt(0).toUpperCase() +
                          leave.first_name.slice(1)}{" "}
                        {leave.last_name.charAt(0).toUpperCase() +
                          leave.last_name.slice(1)}
                      </td>
                      <td>{leave.type}</td>
                      <td>{moment(leave.from_date).format("YYYY-MM-DD")}</td>
                      <td>{moment(leave.to_date).format("YYYY-MM-DD")}</td>
                      <td>{leave.reason}</td>
                      <td>
                        <Button
                          type="success"
                          text="Accept"
                          onClick={() => this.handleAccept(leave.id)}
                        ></Button>
                      </td>
                      <td>
                        <Button
                          type="danger"
                          text="Decline"
                          onClick={() => this.handleDecline(leave.id)}
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

export default connect(mapStateToProps)(LeaveRequestsComponent);
