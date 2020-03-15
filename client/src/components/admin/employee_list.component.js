import { connect } from "react-redux";
import React, { Component } from 'react';
import ReactModal from 'react-modal';
import {
    Content,
    Row,
    Col,
    Box,
    Button
} from 'adminlte-2-react';
import axios from 'axios';
import moment from 'moment';
import DependentsComponent from '../employee/dependents.component';
import EmergencyContactComponent from '../employee/emergency_contact.component';


ReactModal.setAppElement(document.body);

class EmployeeListComponent extends Component {

    constructor(props){
        super(props);
        this.state = {
            records: [],
            openModal: false,
            modalData: {}
        };

        axios.get(`${process.env.REACT_APP_API_SERVER}/api/employees/employeeList`,
        {
          headers: { Authorization: `Bearer ${this.props.token}` }
        }) //params todo
            .then(result => {
                console.log(result)
                this.setState({
                    records: result.data
                });

                console.log(this.state.records);
            })
            .catch(error => {
                console.error(error);
            });
    }

    showEmployeeDetails = obj => {
        console.log("selected employee", obj);
        this.setState({modalData: obj})
        this.setState({openModal: true});
    };

    closeModal = () => this.setState({openModal: false});

    render() {
        return (
            <Content title="Employee Lists" browserTitle="Employee Lists">
                <Row>
                    <Col md={12}>
                        <Box type="primary">
                            <table className="table table-head-fixed" id="EmployeesTable">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Employee Name</th>
                                        <th>Date Hired</th>
                                        <th>Department</th>
                                        <th>Position</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.records.map(emp => {return (<tr key={emp.id}>
                                            <td>{emp.id}</td>
                                            <td>{emp.first_name} {emp.last_name}</td>
                                            <td>{moment(emp.date_hired).format("YYYY-MMM-DD")}</td>
                                            <td>{emp.department}</td>
                                            <td>{emp.position}</td>
                                            <td><Button onClick={() => this.showEmployeeDetails(emp)} type="info" text="Properties"></Button></td>
                                        </tr>);
                                    })}
                                </tbody>
                            </table>
                        </Box>
                    </Col>
                </Row>
                
                <ReactModal
                    style={{
                            overlay: {
                            'zIndex':10000
                            },
                            content: {
                            'zIndex':10000
                            }
                        }}
                    isOpen={this.state.openModal}
                    onAfterOpen={this.loadEmployeeProperties}
                    shouldFocusAfterRender={true}
                    shouldCloseOnOverlayClick={true}
                    shouldCloseOnEsc={true}
                    role={"dialog"}
                    data={this.state.modalData}>

                        <button type="button" className="close" aria-label="Close" onClick={this.closeModal}>
                            <span aria-hidden="true">×</span>
                        </button>
                        <h3>Employee Properties</h3> 

                    <Row>
                        <DependentsComponent employee={this.state.modalData}/>
                        <EmergencyContactComponent employee={this.state.modalData}/>
                    </Row>
                </ReactModal>
            </Content>
        );
    }
}


const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token,
    userData: JSON.parse(state.auth.userData)
  });
  
  export default connect(mapStateToProps)(EmployeeListComponent);
