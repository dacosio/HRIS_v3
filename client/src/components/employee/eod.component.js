import React, { Component } from 'react';
import { connect } from "react-redux";

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
  
    constructor(props){
      super(props);
    }

  componentDidMount() {
<<<<<<< Updated upstream
    axios.get(`${process.env.REACT_APP_API_SERVER}/api/eods/`,
=======
    axios.get(`${process.env.REACT_APP_API_SERVER}/api/eods`,
>>>>>>> Stashed changes
    {
      headers: { Authorization: `Bearer ${this.props.token}` }
    }) //params todo
      .then(result => {
        this.setState({records: result.data})
      })
      .catch(error => {
        console.error(error);
        
      })
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

    handleSubmit = event => {
      axios.post(`${process.env.REACT_APP_API_SERVER}/api/eods`,this.state,
      {
        headers: { Authorization: `Bearer ${this.props.token}` }
      }) //params todo
        .then(response=> {
          console.log(response.data[0]);
          let {records} = this.state;
          
          records.push(response.data[0])

          this.setState({
            records,
            accomplishments: '',
            impediments: '',
            concerns: '',
            next_day_target: '',
          })
        }).catch(error => {
          console.error(error);
        })
    }
  

    footer = [
      <Button key="btnSubmitEod" type="success" pullRight text="Submit" onClick={this.handleSubmit} />,
    ];

  

    render() {
      
      const target = this.state.records.filter(res => moment(res.created_at).format("DD-MM-YYYY") == moment().subtract(1, "days").format("DD-MM-YYYY"));
// console.log("filtered", target);
      return (<Content title="EOD" subTitle="End of Day Log" browserTitle="EOD">

        <Row>
          <Col md={8}>
            {/* <Box title="Accomplishment History" type="primary" collapsable>
                <SimpleTable columns={this.columns}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
                
            </Box> */}
            <Box type="primary" collapsable title="Accomplishments">
                <table className="table table-head-fixed" id="EmployeesTable">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Accomplishments</th>
                        </tr>
                    </thead>
                    <tbody>
                          {this.state.records.map(eod => {
                              return  (<tr key={eod.id}>
                                          <td>{moment(eod.created_at).format("YYYY-MMM-DD")}</td>
                                          <td>{eod.accomplishments}</td>
                                         
                                      </tr>);
                                  })}
                    </tbody>
                </table>
            </Box>
          </Col>
          <Col md={4}>
            {/* <Box title="Today's Target" type="primary" collapsable>
                  <SimpleTable columns={this.columns_target}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
            </Box> */}
            <Box type="info" title="Target">
                <table className="table table-head-fixed" id="EmployeesTable">
                    <thead>
                        <tr>
                            <th>Target Today</th>
                        </tr>
                    </thead>

                    <tbody>
                              {target.map(res => (<tr><td>{res.next_day_target}</td></tr>))}
                    </tbody>
                </table>
            </Box>
          </Col>
        </Row>

        <Row>
          <Col xs={12}>
            <Box title="Log" type="success" collapsable closable footer={this.footer}>
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

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  userData: JSON.parse(state.auth.userData)
});

export default connect(mapStateToProps)(EodComponent);
