import React, { Component } from 'react';
import { connect } from "react-redux";

import { Content, Row, Col, Box, SimpleTable } from 'adminlte-2-react';
import axios from 'axios';

class ProfileEmergencyComponent extends Component {

  state = {
    first_name: '',
    last_name:'',
    contact_no: '',
    records: []
  }

  constructor(props){
    super(props);
    console.log("data", props);
  }


    componentDidMount() {

      axios.get(`${process.env.REACT_APP_API_SERVER}/api/emergency/${this.props.userData.id}`,
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

    
   columns_ec = [
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
        data: 'contact_no'
      }
  ];
 
    render() {

      return (
        <Row>
          <Col md={12}>
            <Box title="Emergency Contact Detail" type="info">
                <SimpleTable columns={this.columns_ec}  data={this.state.records} responsive="true" striped="true" hover="true" border="true"></SimpleTable>
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

export default connect(mapStateToProps)(ProfileEmergencyComponent);

