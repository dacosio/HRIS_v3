import React, { Component } from 'react';
import { Content, Row, Col, Box, Button, SimpleTable, DescriptionBlock } from 'adminlte-2-react';
import axios from 'axios';
import moment from 'moment'

class EodComponent extends Component {
   state = {
        accomplishments: '',
        impediments: '',
        concerns: '',
        next_day_target: '',
        created_by: 1,
        created_at: moment().valueOf(),
        records : [],

      }
  

  componentDidMount() {
    axios.get('http://localhost:8080/api/eods')
      .then(result => {
        console.log('didmount',result.data);
        result.data.forEach(res => {
          res.created_at = moment(res.created_at).format("YY/MM/DD");
        })
        this.setState({records: result.data})
        
      })
      .catch(error => {
        console.error(error);
        
      })
  }

  // componentWillMount() {
  //   axios.get('http://localhost:8080/api/eods')
  //     .then(result => {
  //      this.setState({
  //        next_day_target: result.data.filter(res => res.created_at == "2020-02-27T20:28:09.272Z" )//todo
        
  //       })

  //     })
  //     .catch(error => {
  //       console.error(error);
        
  //     })
  // }

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

    handleSubmit = event => {
      console.log(event);
      axios.post('http://localhost:8080/api/eods',this.state)
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
        title: "Date",
        data: "created_at",
      },
      {
        title: "Accomplishments",
        data: "accomplishments"
      }
    ] 

    columns_target = [
      {
        title: "Today's Target",
        data: "next_day_target"
      }
    ]

    render() {
      return (<Content title="EOD" subTitle="End of Day Log" browserTitle="EOD">

        <Row>
          <Col md={6}>
            <Box title="Accomplishment History" type="primary" collapsable>
                <SimpleTable columns={this.columns}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
            </Box>
          </Col>
          <Col md={6}>
          <Box title="Today's Target" type="primary" collapsable>
                <SimpleTable columns={this.columns_target}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
          </Box>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Box title="Log" type="success" collapsable footer={this.footer}>
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

        
      </Content>);
    }
}

export default EodComponent;