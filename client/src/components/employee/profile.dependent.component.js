import { connect } from "react-redux";
import React, { Component } from 'react';
import { Content, Row, Col, Box, SimpleTable } from 'adminlte-2-react';
import axios from 'axios';
import moment from 'moment';

class ProfileDependentComponent extends Component {

  state = {
    // first_name: '',
    // last_name:'',
    // relationship: '',
    // birthday: '',
    // contact_no: '',
    records: []
  }



    componentDidMount() {
      axios.get('http://localhost:8080/api/dependents') //params todo
      .then(result => {
        
        result.data.forEach(res=> {
            res.birthday = moment(res.birthday).format("YYYY-MMM-DD");
            res.relationship = res.relationship.charAt(0).toUpperCase() +res.relationship.slice(1);
        })

        this.setState({records: result.data})
      })
      .catch(error => {
        console.error(error);
      })
    }

    
   columns_dep = [
      {
        title: "First Name",
        data: 'first_name',
      },
    {
        title: "Last Name",
        data: 'last_name',
      },
      {
        title: "Contact Number",
        data: 'contact_no',
      },
      {
        title: "Birthday",
        data: 'birthday',
      },
      {
        title: "Relationship",
        data: 'relationship',
      }
  ];
 
    render() {

      return (
        <Row>
          <Col md={12}>
            <Box title="Dependents Detail" type="info">
                <SimpleTable columns={this.columns_dep}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
            </Box>
         </Col>
        </Row>
      )}
}


const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  userData: JSON.parse(state.auth.userData)
});

export default connect(mapStateToProps)(ProfileDependentComponent);