import React, { Component } from 'react';
import { connect } from "react-redux";

import { Col, Box, SimpleTable,Button, Row} from 'adminlte-2-react';
import axios from 'axios';

class EmergencyContactComponent extends Component {

  state = {
    obj:{
      id: 0,
      first_name: '',
      last_name: '',
      relationship: '',
      contact_no: '',
      address: '',
      city: '',
      state: '',
      zip_code: ''
    },
    records : [],
    editing: false
  }

  constructor(props){
    super(props);
  }

  loadEc = () => {
    axios.get(`${process.env.REACT_APP_API_SERVER}/api/emergency`,
    {
      headers: { Authorization: `Bearer ${this.props.token}` }
    }) //params todo
    .then(result => {
      console.log(result.data)
      this.setState({records: result.data})
    })
    .catch(error => {
      console.error(error);
    })
  }

  componentDidMount() {
    this.loadEc();
  }
  
  handleFirstName = (event) => {
    var obj = {...this.state.obj};
    obj.first_name = event.target.value;

    this.setState({obj});

    console.log(event.target.value);
  }

  handleLastName = (event) => {
    var obj = {...this.state.obj};
    obj.last_name = event.target.value;
    
    this.setState({obj});
    console.log(event.target.value);
  }

  handleRelationship = (event) => {
    var obj = {...this.state.obj};
    obj.relationship = event.target.value;
    
    this.setState({obj});
    console.log(event.target.value);

  }
  
  handleContact = (event) => {
    var obj = {...this.state.obj};
    obj.contact_no = event.target.value;
    this.setState({obj})
    console.log(event.target.value);
  }
  
  handleAddress = (event) => {
    var obj = {...this.state.obj};
    obj.address = event.target.value;
    this.setState({obj})
    console.log(event.target.value);
  }
  
  handleCity = (event) => {
    var obj = {...this.state.obj};
    obj.city = event.target.value;
    this.setState({obj})
    console.log(event.target.value);
  }

  handleState = (event) => {
    var obj = {...this.state.obj};
    obj.state = event.target.value;
    this.setState({obj})
    console.log(event.target.value);
  }

  handleZipCode = (event) => {
    var obj = {...this.state.obj};
    obj.zip_code = event.target.value;
    this.setState({obj})
    console.log(event.target.value);
  }
  

  handleSubmit = event => {
    axios.post(`${process.env.REACT_APP_API_SERVER}/api/emergency`,this.state.obj,
    {
      headers: { Authorization: `Bearer ${this.props.token}` }
    }) //params todo
      .then(response=> {
        console.log(response.data[0]);
        let {records} = this.state;
        
        this.setState({
          "records": records.concat(response.data[0]),
          "obj" : {
            id: 0,
            first_name: '',
            last_name: '',
            relationship: '',
            contact_no: '',
            address: '',
            city: '',
            state: '',
            zip_code: ''
          }
        })
      }).catch(error => {
        console.error(error);
      })
  }

  handleClear = event => {
    this.setState({
     "obj" : {
       id: 0,
       first_name: '',
       last_name: '',
       relationship: '',
       contact_no: '',
       address: '',
       city: '',
       state: '',
       zip_code: ''
     }
    })
  }

  handleEdit = (id) => {
    console.log("edit", id)
    console.log(this.state.records)
    let ec = this.state.records.find(ec => ec.id == id)
    
    this.setState({editing:true});

      var obj = this.state.obj;
      obj.id = id;
      obj.first_name = ec.first_name;
      obj.last_name = ec.last_name;
      obj.relationship = ec.relationship
      obj.relationship = ec.relationship;
      obj.contact_no = ec.contact_no;
      obj.address = ec.address;
      obj.city = ec.city;
      obj.state = ec.state;
      obj.zip_code = ec.zip_code;
    
      this.setState(obj)
  }

  updateEcontact = event => {
    console.log('state',this.state.records)
    console.log('records',this.state.id)

    axios.put(`${process.env.REACT_APP_API_SERVER}/api/emergency/` + this.state.id, this.state.obj,
    {
      headers: { Authorization: `Bearer ${this.props.token}` }
    }) //params todo
      .then(response => {
        console.log('updateEc', response.data[0]);
        var updatedEc = response.data[0];


        var previousEc = this.state.records.filter(ec => ec.id != updatedEc.id);
        this.setState({"records": [...previousEc, updatedEc], "editing": false});

      })
      .catch(error => {
        console.error(error)
      })

     
       
    // console.log(updatedRecords)
    
    this.handleClear();
  }
  
  cancelEditing = (editing) => {
    this.setState({
      editing: false,
      });
    
    this.handleClear();
  }

  handleDelete = (id) => {
    console.log("delete", id)
    axios.delete(`${process.env.REACT_APP_API_SERVER}/api/emergency/` + id,
    {
      headers: { Authorization: `Bearer ${this.props.token}` }
    }) //params todo
            .then(response => {
              const newRecords = this.state.records.filter(res => {
                return res.id != id
              })

            this.setState({
              records: [...newRecords]
            })
              
            })
            .catch((error) => {
                console.error(error);
            })
  }
    


  footer_add = [
    <Button key="btnSubmitAdd1" type="success" pullRight text="Submit" onClick={this.handleSubmit} margin="true"/>,
    <Button key="btnSubmitAdd2" type="warning" pullRight  text="Clear All" onClick={this.handleClear} margin="true"/>
  ];

  footer_edit = [
    <Button key="btnSubmitEdit1" type="success" pullRight text="Save" onClick={this.updateEcontact} margin="true"/>,
    <Button key="btnSubmitEdit2" type="warning" pullRight  text="Cancel" onClick={()=> this.cancelEditing(false)} margin="true"/>
  ];
 
    render() {
      const {editing} = this.state;
      return (
        <Row>
        <Col md={6}>
        {editing ? (<Box title="Edit Emergency Contact" type="success" collapsable footer={this.footer_edit}>
          <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" required name="first_name" value={this.state.obj.first_name} placeholder="Enter ..." onChange={this.handleFirstName}/>
          </div>
          <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" required name="last_name" value={this.state.obj.last_name} placeholder="Enter ..." onChange={this.handleLastName} />
          </div>
          <div className="form-group">
              <label>Relationship</label>
              <input type="text" className="form-control" required name="relationship" value={this.state.obj.relationship} placeholder="Enter ..." onChange={this.handleRelationship} />
          </div>
          <div className="form-group">
              <label>Contact Number</label>
              <input type="text" className="form-control" required name="contact_no" value={this.state.obj.contact_no} placeholder="Enter ..." onChange={this.handleContact} />
          </div>
          <div className="form-group">
              <label>Address</label>
              <input type="text" className="form-control" required name="address" value={this.state.obj.address} placeholder="Enter ..." onChange={this.handleAddress} />
          </div>
          <div className="form-group">
              <label>City</label>
              <input type="text" className="form-control" required name="city" value={this.state.obj.city} placeholder="Enter ..." onChange={this.handleCity} />
          </div>
          <div className="form-group">
              <label>State</label>
              <input type="text" className="form-control" required name="state" value={this.state.obj.state} placeholder="Enter ..." onChange={this.handleState} />
          </div>
          <div className="form-group">
              <label>Zip Code</label>
              <input type="number" className="form-control" name="zip_code" value={this.state.obj.zip_code} placeholder="Enter ..." onChange={this.handleZipCode} />
          </div>
          </Box>

        ):<Box title="Add Emergency Contact" type="success" collapsable footer={this.footer_add}>
          <div className="form-group">
              <label>First Name</label>
              <input type="text" className="form-control" required name="first_name" value={this.state.obj.first_name} placeholder="Enter ..." onChange={this.handleFirstName}/>
          </div>
          <div className="form-group">
              <label>Last Name</label>
              <input type="text" className="form-control" required name="last_name" value={this.state.obj.last_name} placeholder="Enter ..." onChange={this.handleLastName} />
          </div>
          <div className="form-group">
              <label>Relationship</label>
              <input type="text" className="form-control" required name="relationship" value={this.state.obj.relationship} placeholder="Enter ..." onChange={this.handleRelationship} />
          </div>
          <div className="form-group">
              <label>Contact Number</label>
              <input type="text" className="form-control" required name="contact_no" value={this.state.obj.contact_no} placeholder="Enter ..." onChange={this.handleContact} />
          </div>
          <div className="form-group">
              <label>Address</label>
              <input type="text" className="form-control" required name="address" value={this.state.obj.address} placeholder="Enter ..." onChange={this.handleAddress} />
          </div>
          <div className="form-group">
              <label>City</label>
              <input type="text" className="form-control" required name="city" value={this.state.obj.city} placeholder="Enter ..." onChange={this.handleCity} />
          </div>
          <div className="form-group">
              <label>State</label>
              <input type="text" className="form-control" required name="state" value={this.state.obj.state} placeholder="Enter ..." onChange={this.handleState} />
          </div>
          <div className="form-group">
              <label>Zip Code</label>
              <input type="number" className="form-control" name="zip_code" value={this.state.obj.zip_code} placeholder="Enter ..." onChange={this.handleZipCode} />
          </div>
          </Box>
          }
          
        </Col>
      
      <Col md={6}>
       
          <Box type="primary" collapsable title="Emergency Contacts">
                <table className="table table-head-fixed" id="EmployeesTable">
                    <thead>
                        <tr>
                            <th>Emergency Contact Name</th>
                            <th>Relationship</th>
                            <th>Contact Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                          {this.state.records.map(ec => {
                              return  (<tr key={ec.id}>
                                          <td>{ec.first_name.charAt(0).toUpperCase()+ ec.first_name.slice(1)} {ec.last_name.charAt(0).toUpperCase()+ ec.last_name.slice(1)}</td>
                                          <td>{ec.relationship.charAt(0).toUpperCase() + ec.relationship.slice(1)}</td>
                                          <td>{ec.contact_no}</td>
                                          <td><Button type="warning" text="Edit" onClick={() => this.handleEdit(ec.id)}></Button></td>
                                          <td><Button type="danger" text="Delete" onClick={() => this.handleDelete(ec.id)}></Button></td>
                                      </tr>);
                                  })}
                    </tbody>
                </table>
            </Box>
      </Col>
      </Row>

      );
    }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  userData: JSON.parse(state.auth.userData)
});

export default connect(mapStateToProps)(EmergencyContactComponent);