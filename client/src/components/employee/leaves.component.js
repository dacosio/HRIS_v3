import React, { Component } from 'react';
import { Content, Row, Col, Box, Button, SimpleTable} from 'adminlte-2-react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import moment from 'moment';
 
import "react-datepicker/dist/react-datepicker.css";
 
class LeaveComponent extends Component {

  state = {
    from_date: moment().valueOf(),
    to_date: moment().valueOf(),
    reason: '',
    leave_type: '1',
    created_by: 1, //todo
    records: []
  };

  componentDidMount() {
      axios.get('http://localhost:8080/api/leaves/') //params todo
        .then(result => {
          console.log(result.data)
          result.data.forEach(res => {
            res.from_date = moment(res.from_date).format("YY/MM/DD");
            res.to_date = moment(res.to_date).format("YY/MM/DD");
            res.isAccepted = res.isAccepted? "Approved" : "Pending"
            switch (res.leave_type) {
              case 1:
                res.leave_type = 'Vacation'
                break;
              case 2:
                res.leave_type = 'Sick'
                break;
              case 3:
                res.leave_type = 'Compassionate'
                break;
              case 4:
                res.leave_type = 'Maternity'
                break;
              case 5:
                res.leave_type = 'Paternity'
                break;
            }
          })
          this.setState({records: result.data})
        })
        .catch(error => {
          console.error(error);
        })
  }
   
  handleChangeFrom = date => {
    this.setState({
      from_date: date
    });
    // console.log(date);
    
  };

  handleChangeTo = date => {
    this.setState({
    to_date: date
    });
    // console.log(date)
  };

  leaveTypeChange = event => {
    this.setState({
      leave_type: event.target.value
    })
    // console.log(event.target.value);
  }

  handleReason = event => {
    this.setState({
      reason: event.target.value
    })
    // console.log(event.target.value);
    
  }

  handleSubmit = event => {
    event.preventDefault()
    axios.post('http://localhost:8080/api/leaves',this.state)
      .then(response=> {
        console.log(response);
      }).catch(error => {
        console.error(error);
      })
  }

  footer = [
    <Button key="btnSubmit" type="success" pullRight text="Submit" onClick={this.handleSubmit} />, 
  ];

  columns = [
    {
      title: "Leave Type",
      data: 'leave_type',
    },
  {
      title: "From",
      data: 'from_date',
    },
    {
      title: "To",
      data: 'to_date',
    },
    {
      title: 'Reason',
      data: 'reason'
    },
    {
      title: "Status",
      data: 'isAccepted'
    }
];




  render() {
    return (
      <Content title="Leaves" subTitle="Requests" browserTitle="Leaves">
      <Row>
      <Col md={4}>
      <Row> 
        <Col xs={12}>
          <form>
            <Box  title="Leave Application" type="primary" name="leave_type" collapsable footer={this.footer}>
              <div className="form-group">
                  <label>Leave Type</label>
                  <div>
                    <select value= {this.state.leave_type} onChange={this.leaveTypeChange}>
                      <option value='1'>Vacation</option>
                      <option value='2'>Sick</option>
                      <option value='3'>Compassionate</option>
                      <option value='4'>Maternity</option>
                      <option value='5'>Paternity</option>
                    </select>
                  </div>
                </div>
              <div className="form-group">
                  <label>From</label>
                  <div>
                    <DatePicker
                      selected={this.state.from_date}
                      onChange={this.handleChangeFrom}
                      name="from_date"
                    />
                  </div>
              </div>
              <div className="form-group">
                  <label>To</label>
                <div>
                <DatePicker
                      selected={this.state.to_date}
                      onChange={this.handleChangeTo}
                      name="to_date"
                    />
                </div>
              </div>
              
              <div className="form-group">
                  <label>Reason</label>
                  <textarea type="text" name="reason" value={this.state.reason} className="form-control" placeholder="Enter ..." onChange={this.handleReason} />
              </div>
          
              </Box>
          </form>
        </Col>
      </Row>
      </Col>
      
      <Col md={8}>
            <Box title="Leave Requests" type="warning" collapsable>
                <SimpleTable columns={this.columns}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
            </Box>
      </Col>
      </Row>

    </Content>);
  }
}

export default LeaveComponent;