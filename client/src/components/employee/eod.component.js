import React, { Component } from 'react';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';
// import Card from 'react-bootstrap/Card'

class EodComponent extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
        accomplishments: '',
        impediments: '',
        next_day_target: '',
        concerns: '',
        created_by: 1
      }
    }

    handleAccomplishmentChange = (event) => {
      this.setState({
        accomplishments : event.target.value
      })
    }

    handleTargetChange = (event) => {
      this.setState({
        next_day_target: event.target.value
      })
    }

    handleImpedimentsChange = (event) => {
      this.setState({
        impediments: event.target.value
      })
    }

    handleConcernChange = (event) => {
      this.setState({
        concerns: event.target.value
      })
    }

    handleSubmit = (event) => {
      alert(`${this.state.accomplishments}`)
    }

    render() {
      return (<Content title="EOD" subTitle="End of Day Log" browserTitle="EOD">
     {/* <Card>
        <Card.Body>This is some text within a card body.</Card.Body>
      </Card> */}
        <Row>
          <Col xs={12}>
            <Box title="End of Day" type="primary" collapsable footer={<Button type="success" pullRight text="Submit"  />}>
            <div className="form-group">
                <label>Accomplishments</label>
                <textarea type="text" className="form-control" value={this.state.accomplishments} placeholder="Enter ..." onChange={this.handleAccomplishmentChange}/>
            </div>
            <div className="form-group">
                <label>Next Day Target</label>
                <textarea type="text" className="form-control" value={this.state.next_day_target} placeholder="Enter ..." onChange={this.handleTargetChange} />
            </div>
            <div className="form-group">
                <label>Impediments</label>
                <textarea type="text" className="form-control" value={this.state.impediments} placeholder="Enter ..." onChange={this.handleImpedimentsChange} />
            </div>
            <div className="form-group">
                <label>Concern</label>
                <textarea type="text" className="form-control" value={this.state.concerns} placeholder="Enter ..." onChange={this.handleConcernChange} />
            </div>
            </Box>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Box title="Yesterday Log" type="primary" collapsable>
            <div className="form-group">
                <label>Target</label>
            </div>
            </Box>
          </Col>
        </Row>
      </Content>);
    }
}

export default EodComponent;