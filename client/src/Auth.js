import React, { Component } from 'react';
import { connect } from "react-redux";
import AdminLTE, { Sidebar, Navbar} from 'adminlte-2-react';
import { Redirect } from "react-router-dom";
import * as authActions from "./store/actions/authActions";

import ProfileComponent from './components/employee/profile.component';
import AttendanceComponent from './components/employee/attendance.component';
import EodComponent from './components/employee/eod.component';
import LeaveComponent from './components/employee/leaves.component';
import UndertimeComponent from './components/employee/undertime.component';
import OvertimeComponent from './components/employee/overtime.component';
import ApplicantComponent from './components/recruitment/applicants.component'
import OnBoardingComponent from './components/recruitment/onboarding.component';
import EmployeeListComponent from './components/admin/employee_list.component';

const axios = require('axios').default;
const { Item, UserPanel } = Sidebar;
const {Entry} = Navbar;

class Auth extends Component {

  constructor(props){
    super(props);
  }

  componentDidMount() {
    console.log(this.props);
    if (this.props.isLoggedIn) {
      document.body.classList.add("fixed");
      axios
        .get(`${process.env.REACT_APP_API_SERVER}/api/secret`, {
          headers: { Authorization: `Bearer ${this.props.token}` }
        })
        .then(response => response.data)
        .then(data => {
          localStorage.setItem("userData", JSON.stringify(data));
        });
    }
  }



  logout = event => {
    this.props.logoutDispatch();
  }

  render() {
    if (this.props.isLoggedIn) {

      this.children_employee = [
        <Item key="profile" text="Profile" to="/profile" icon="fa-user-alt" />,
        <Item key="attendance" text="Attendance" to="/attendance" icon="fa-user-clock"/>,
        <Item key="eod" text="End of Day" to="/eod" icon="fa-file-alt" />,
        <Item key="leaves" text="Leaves" to="/leaves" icon="fa-leaf"/>,
        <Item key="undertime" text="Undertime" to="/undertime" icon="fa-clock"/>,
        <Item key="overtime" text="Overtime" to="/overtime" icon="fa-business-time" />
      ];

      this.children_admin = [
        <Item key="employeeLists" text="Employees" to="/employeelists" icon="fa-users" />,
      ];

      this.children_recruitment = [
        <Item key="recruitmentLists" text="Interviews" to="/applicants" icon="fa-calendar-alt" />,
        <Item key="onBoardingLists" text="On Boarding" to="/onboarding" icon="fa-calendar-check" />
      ];

      this.sidebar = [
        <UserPanel key="userinfo" username={this.props.userData.first_name + " " + this.props.userData.last_name} status={this.props.userData.position} statusType="success" imageUrl="/user2-160x160.jpg" />,
        <Item key="employee" icon="fa-address-card" text="Employee" children={this.children_employee}/>,
        this.props.userData.role_id == 1 && <Item key="admin" icon="fa-user-cog" text="Administrator" children={this.children_admin}/>,
        this.props.userData.department_id == 2 && this.props.userData.role_id == 1 && <Item key="recruitment" icon="fa-paperclip" text="Recruitment" children={this.children_recruitment}/>
      ];

      return (
          <AdminLTE title={["HR Info System"]} titleShort={["HRIS"]} theme="blue" sidebar={this.sidebar}>
              <Navbar.Core>
                  <Entry headerText="logout" icon="fa-sign-out-alt" onClick={this.logout}/>
              </Navbar.Core>
              <ProfileComponent path="/profile" />
              <AttendanceComponent path="/attendance" />
              <EodComponent path="/eod"/>
              <LeaveComponent path="/leaves"/>
              <UndertimeComponent path="/undertime"/>
              <OvertimeComponent path="/overtime"/>
              <ApplicantComponent path="/applicants"/>
              <OnBoardingComponent path="/onboarding"/>
              <EmployeeListComponent path="/employeelists"/>
          </AdminLTE>
      );
    }
    else {
      return <Redirect to="/login" />;
    }
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  token: state.auth.token,
  userData: JSON.parse(state.auth.userData)
});

const mapDispatchToProps = dispatch => ({
  logoutDispatch: () => {
    dispatch(authActions.logoutAction());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
