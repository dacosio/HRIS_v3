import React, { Component } from 'react';
import { Inputs, Content, Row, Col, Box, Button } from 'adminlte-2-react';

const { Select2, Date, DateTime, Text } = Inputs;
 
class OvertimeComponent extends Component {
 
    constructor(props) {
        super(props);

        this.state = {
            date_filed: new Date(),
            from_time: '',
            to_time: '',
            reason: '',
            time_type: '1',
            isAccepted: false,
            created_by: 1 //todo
        };
    }

 
  handleFromTime = event => {
    this.setState({
        from_time: event.target.value
    });
  };

  handleToTime = event => {
    this.setState({
        to_time: event.target.value
    });
  };


  handleReason = event => {
    this.setState({
      reason: event.target.value
    })
    console.log(event.target.value);
  }

  handleTimeType = event => {
    this.setState({
      reason: event.target.value
    })
    console.log(event.target.value);
  }

  handleSubmit = event => {
    alert(`${this.state.from_date}`)
    event.preventDefault();
  }

  render() {
    return (
      <Content title="Leaves" subTitle="Leave Requests" browserTitle="Leaves">
      <Row> 
        <Col xs={12}>
          <Box title="End of Day" type="primary" collapsable  onSubmit={this.handleSubmit} footer={[<Button type="success" pullRight text="Submit"  onSubmit={this.handleSubmit} />, <Button type="warning" pullRight text="Cancel" />]}>
          <div className="form-group">
              <label>Leave Type</label>
              <div>
                <select value={this.state.leave_type} onChange={this.leaveTypeChange}>
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
            <div></div>
          </div>
          <div className="form-group">
              <label>To</label>
            <div></div>
          </div>
          
          <div className="form-group">
              <label>Reason</label>
              <textarea type="text" value={this.state.reason} onChange={this.handleReason} className="form-control" placeholder="Enter ..." />
          </div>
         
          </Box>
        </Col>
      </Row>
      <Row>
     </Row>
    </Content>);
  }
}

export default OvertimeComponent;