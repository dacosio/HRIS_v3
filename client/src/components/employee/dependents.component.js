import React, { Component } from 'react';
import { Col, Box, SimpleTable } from 'adminlte-2-react';
import axios from 'axios';

class DependentsComponent extends Component {

  state = {
    records: [],
  }

    componentDidMount() {
      axios.get('http://localhost:8080/api/dependents') //params todo
      .then(result => {
        console.log(result.data)
        this.setState({records: result.data})
      })
      .catch(error => {
        console.error(error);
      })
    }

    columns = [
      {
        title: "First Name",
        data: 'first_name',
      },
    {
        title: "Last Name",
        data: 'last_name',
      },
      {
        title: "Relationship",
        data: 'relationship',
      },
      {
        title: 'Contact #',
        data: 'contact_no'
      }
  ];
 
    render() {

      return (
       
    <Col md={8}>
        <Box title="Dependents" type="warning" collapsable>
            <SimpleTable columns={this.columns}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
        </Box>
    </Col>
      );
    }
}



export default DependentsComponent;