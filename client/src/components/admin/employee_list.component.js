import React, { Component } from 'react';
import { Content, Row, Col, Box, SimpleTable } from 'adminlte-2-react';


class EmployeeListComponent extends Component {

  state = {
    // first_name: "",
    records: []
  }

    // componentDidMount() {
    //   axios.get('http://localhost:8080/api/employees/') //params todo
    //   .then(result => {
    //     console.log(result.data)
    //     result.data.forEach(res=> {
    //       switch (res.department_id) {
    //         case 1:
    //           res.department_id = 'Engineering'
    //           break;
    //         case 2:
    //           res.department_id = 'Human Resource Management'
    //           break;
    //         case 3:
    //           res.department_id = 'Marketing and Sales'
    //           break;
    //         case 4:
    //           res.department_id = 'Accounting and Finance'
    //           break;
    //         case 5:
    //           res.department_id = 'Purchasing and Logistics'
    //           break;
    //         case 6:
    //           res.department_id = 'Information System'
    //           break;
    //         case 7:
    //           res.department_id = 'Software Development'
    //           break;
    //       }
    //     })
        
    //     this.setState({records: result.data})
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   })
    // }

    
    columns = [
      {
        title: "ID",
        data: 'employee.id',
      },
      {
        title: "Employee",
        data: 'first_name',
      },
      {
        title: "Position",
        data: 'first_name',
      },
      {
        title: "Department",
        data: 'first_name',
      },
      {
        title: "Emergency Contact",
        data: 'first_name',
      },
      {
        title: "Dependent",
        data: 'first_name',
      }
    
  ];
 
    render() {

      return (<Content title="Employee Lists" subTitle="Employee Lists" browserTitle="Employee Lists">
        <Row>
          <Col md={12}>
            <Box title="Employee List" type="primary" collapsable>
                <SimpleTable columns={this.columns}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
            </Box>
         </Col>
        </Row>
      </Content>);
    }
}



export default EmployeeListComponent;