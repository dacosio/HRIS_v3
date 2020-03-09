import React, { Component } from 'react';
import { Col, Box, SimpleTable,Button, Row } from 'adminlte-2-react';
import DatePicker from "react-datepicker";
import axios from 'axios';
import moment from 'moment'

import "react-datepicker/dist/react-datepicker.css";

class DependentsComponent extends Component {
  constructor(props){
    super(props);

    this.state = {
      obj: {
        id:0,
        first_name: '',
        last_name: '',
        birthday: new Date(),
        relationship: '',
        contact_no: '',
      },
      records : [],
      editing: false
    }

  }


  loadDependents = () => {
    axios.get('http://localhost:8080/api/dependents/') //params todo
      .then(result => {
        console.log(result.data)
        this.setState({
          records: result.data
        })
      })
      .catch(error => {
        console.error(error);
      })
  };

  componentDidMount() {
    this.loadDependents();
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

  handleBirthday = (date) => {
    var obj = {...this.state.obj};
    obj.birthday = date;
    
    this.setState({obj});
    console.log(date);
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
    
    this.setState({obj});
    console.log(event.target.value);
  }
  

  handleSubmit = event => {
    axios.post('http://localhost:8080/api/dependents/',this.state.obj) //todo
      .then(response=> {
        console.log(response.data[0])
        let {records} = this.state;
        
        this.setState({
          "records": records.concat(response.data[0]),
          "obj":{
            id:0,
            first_name: '',
            last_name: '',
            birthday: new Date(),
            relationship: '',
            contact_no: '',
          }
        })
      })
      .catch(error => {
        console.error(error);
      })
  }

  handleClear = event => {
    this.setState({
      "obj":{
        id:0,
        first_name: '',
        last_name: '',
        birthday: new Date(),
        relationship: '',
        contact_no: ''
      }
    })
  }

  handleEdit = (id) => {
    console.log("edit", id)
    console.log(this.state.records)
    let dep = this.state.records.find(dep => dep.id == id)
    let bday = moment(dep.birthday).format("YYYY-MM-DD")
    console.log("new birthday",bday)
    
    this.setState({editing:true});

    var obj = this.state.obj;
    obj.id = id;
    obj.first_name = dep.first_name;
    obj.last_name = dep.last_name;
    obj.birthday = new Date(moment(dep.birthday).format("YYYY-MM-DD"));
    obj.relationship = dep.relationship;
    obj.contact_no = dep.contact_no;
    this.setState(obj);
  }

  updateDependent = event => {
    console.log('state',this.state.records)
    console.log('records',this.state.id)

    axios.put('http://localhost:8080/api/dependents/' + this.state.id, this.state.obj)
      .then(response => {
        console.log('updateDependent', response.data[0]);
        var updatedDependent = response.data[0];

        var previousDependents = this.state.records.filter(dep => dep.id != updatedDependent.id);
        this.setState({"records": [...previousDependents, updatedDependent], "editing": false});

        console.log("Previous Dependent",previousDependents,"Updated Dependent",updatedDependent);
      })
      .catch(error => {
        console.error(error)
      })
       
    // console.log(updatedRecords)
    this.handleClear();
  }
  
  cancelEditing = (editing) => {
    this.setState({
      editing: false
    });

    this.handleClear();
  }

  handleDelete = (id) => {
    console.log("delete", id)
    axios.delete('http://localhost:8080/api/dependents/' + id)
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
    <Button key="btnSubmitAdd2" type="warning" pullRight  text="Clear All" onClick={this.handleClear} margin="true" />
  ];

  footer_edit = [
    <Button key="btnSubmitEdit1" type="success" pullRight text="Save" onClick={this.updateDependent} margin="true"/>,
    <Button key="btnSubmitEdit2" type="warning" pullRight  text="Cancel" onClick={()=> this.cancelEditing(false)} margin="true"/>
  ];

    render() {
      const {editing} = this.state;
      return (
        <Row>
        <Col md={6}>
        {editing ? (
          <Box title="Edit Dependent" type="danger" collapsable footer={this.footer_edit}>
            <div className="form-group">
                <label for="first_name_dep">First Name</label>
                <input type="text" id="first_name_dep" className="form-control" required value={this.state.obj.first_name} name="first_name" placeholder="Enter ..." onChange={this.handleFirstName}/>
            </div>
            <div className="form-group">
                <label for="last_name_dep">Last Name</label>
                <input type="text" id="last_name_dep" className="form-control" required value={this.state.obj.last_name} name="last_name" placeholder="Enter ..." onChange={this.handleLastName} />
            </div>
            <div className="form-group">
                <label for="birthday_dep">Birthday</label>
                  <div id="birthday_dep">
                    <DatePicker selected={this.state.obj.birthday} required onChange={this.handleBirthday} name="birthday"/>
                  </div>
            </div>
            <div className="form-group">
                <label for="relationship_dep">Relationship</label>
                <input type="text" id="relationship_dep"className="form-control" required value={this.state.obj.relationship} name="relationship" placeholder="Enter ..." onChange={this.handleRelationship} />
            </div>
            <div className="form-group">
                <label for="contact_no_dep">Contact Number</label>
                <input type="text" id="contact_no_dep"className="form-control" required value={this.state.obj.contact_no} name="contact_no" placeholder="Enter ..." onChange={this.handleContact} />
            </div>
          </Box>
          
        ):<Box title="Add Dependent" type="success" collapsable footer={this.footer_add}>
            <div className="form-group">
                <label for="first_name_dep">First Name</label>
                <input type="text" id="first_name_dep" className="form-control" required value={this.state.obj.first_name} name="first_name" placeholder="Enter ..." onChange={this.handleFirstName}/>
            </div>
            <div className="form-group">
                <label for="last_name_dep">Last Name</label>
                <input type="text" id="last_name_dep" className="form-control" required value={this.state.obj.last_name} name="last_name" placeholder="Enter ..." onChange={this.handleLastName} />
            </div>
            <div className="form-group">
                <label for="birthday_dep">Birthday</label>
                  <div id="birthday_dep">
                    <DatePicker selected={this.state.obj.birthday} required onChange={this.handleBirthday} name="birthday"/>
                  </div>
            </div>
            <div className="form-group">
                <label for="relationship_dep">Relationship</label>
                <input type="text" id="relationship_dep"className="form-control" required value={this.state.obj.relationship} name="relationship" placeholder="Enter ..." onChange={this.handleRelationship} />
            </div>
            <div className="form-group">
                <label for="contact_no_dep">Contact Number</label>
                <input type="text" id="contact_no_dep"className="form-control" required value={this.state.obj.contact_no} name="contact_no" placeholder="Enter ..." onChange={this.handleContact} />
            </div>
          </Box>
        
        }
          
        </Col>
        
        <Col md={6}>
            <Box type="primary" collapsable title="Dependents">
                <table className="table table-head-fixed" id="EmployeesTable">
                    <thead>
                        <tr>
                            <th>Dependent Name</th>
                            <th>Birthday</th>
                            <th>Relationship</th>
                            <th>Contact Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                          {this.state.records.map(dep => {
                              return  (<tr key={dep.id}>
                                          <td>{dep.first_name.charAt(0).toUpperCase() + dep.first_name.slice(1)} {dep.last_name.charAt(0).toUpperCase() + dep.last_name.slice(1)}</td>
                                          <td>{moment(dep.birthday).format("YYYY-MMM-DD")}</td>
                                          <td>{dep.relationship.charAt(0).toUpperCase() + dep.relationship.slice(1)}</td>
                                          <td>{dep.contact_no}</td>
                                          <td><Button type="warning" text="Edit" onClick={() => this.handleEdit(dep.id)}></Button></td>
                                          <td><Button type="danger" text="Delete" onClick={() => this.handleDelete(dep.id)}></Button></td>
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



export default DependentsComponent;


