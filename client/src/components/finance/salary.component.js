import React, { Component } from 'react';
import { Col, Box } from 'adminlte-2-react';

class SalaryComponent extends Component {

  state = {
    records: [],
  }
 
    render() {

      return (
       
    <Col md={4}>
        <Box title="Payroll details will go here" type="success" collapsable>
        todo...
        </Box>
    </Col>
      );
    }
}



export default SalaryComponent;