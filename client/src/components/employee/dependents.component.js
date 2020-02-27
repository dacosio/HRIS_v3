import React, { Component } from 'react';
import { Col, Box } from 'adminlte-2-react';
import axios from 'axios';

class DependentsComponent extends Component {

  state = {
    dependents: [],
    errorMsg: ''
  }

    componentDidMount() {
      axios.get('http://localhost:8080/api/dependents/1') //params todo
      .then(response => {
        console.log(response.data)
        this.setState({dependents: response.data})
      })
      .catch(error => {
        console.error(error);
        this.setState({errorMsg: 'Error retrieving data'})
      })
    }
 
    render() {
      const {dependents, errorMsg} = this.state

      return (
       
        <Col md={6}>
            <Box title="Dependents" type="primary" collapsable>
                Name
                  {
                    dependents.length ?
                    dependents.map(dependent => <div key={dependent.id}>{dependent.first_name} {dependent.last_name}</div>) :
                    null
                  }
                  {errorMsg ? <div>{errorMsg}</div> : null}
            </Box>
        </Col>
      );
    }
}



export default DependentsComponent;