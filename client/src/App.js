import React, { Component } from 'react';
import AdminLTE, { Sidebar } from 'adminlte-2-react';
import ProfileComponent from './components/employee/profile.component';
import AttendanceComponent from './components/employee/attendance.component';
import EodComponent from './components/employee/eod.component';
import LeaveComponent from './components/employee/leaves.component';
import UndertimeComponent from './components/employee/undertime.component';
import OvertimeComponent from './components/employee/overtime.component';
import InterviewComponent from './components/recruitment/interviews.component'
import OnBoardingComponent from './components/recruitment/onboarding.component';

const { Item, UserPanel } = Sidebar;

class App extends Component {

  children_employee = [
    <Item key="profile" text="Profile" to="/profile" icon="fa-user-alt" />,
    <Item key="attendance" text="Attendance" to="/attendance" icon="fa-user-clock"/>,
    <Item key="eod" text="End of Day" to="/eod" icon="fa-file-alt" />,
    <Item key="leaves" text="Leaves" to="/leaves" icon="fa-leaf"/>,
    <Item key="undertime" text="Undertime" to="/undertime" icon="fa-clock"/>,
    <Item key="overtime" text="Overtime" to="/overtime" icon="fa-business-time" />
  ]

  children_admin = [
    <Item key="employeeLists" text="Employees" to="/employeelists" icon="fa-users" />,
    <Item key="dependentLists" text="Dependents" to="/dependentlists" icon="fa-user-friends" />,
    <Item key="emergencyContactLists" text="Emergency Contacts" to="/contactlists" icon="fa-mobile" />
  ]

  children_recruitment = [
    <Item key="recruitmentLists" text="Interviews" to="/interviews" icon="fa-calendar-alt" />,
    <Item key="onBoardingLists" text="On Boarding" to="/onboarding" icon="fa-calendar-check" />
  ]

  children_finance = [
    <Item key="payroll" text="Payslip" to="/payslips" icon="fa-receipt" />
  ]


  sidebar = [
    <UserPanel key="userinfo" username="Don Cosio" status="Available" statusType="success" imageUrl="/user2-160x160.jpg" />,
    <Item key="employee" icon="fa-address-card" text="Employee" children={this.children_employee}/>,
    <Item key="admin" icon="fa-user-cog" text="Administrator" children={this.children_admin}/>,
    <Item key="recruitment" icon="fa-paperclip" text="Recruitment" children={this.children_recruitment}/>,
    <Item key="finance" icon="fa-wallet" text="Finance" children={this.children_finance}/>
  ]

  

  render() {
    return (
      <AdminLTE title={["HR Info System"]} titleShort={["HRIS"]} theme="blue" sidebar={this.sidebar}>
        <ProfileComponent path="/profile" />
        <AttendanceComponent path="/attendance" />
        <EodComponent path="/eod"/>
        <LeaveComponent path="/leaves"/>
        <UndertimeComponent path="/undertime"/>
        <OvertimeComponent path="/overtime"/>
        <InterviewComponent path="/interviews"/>
        <OnBoardingComponent path="/onboarding"/>
      </AdminLTE>
    );
  }
}

export default App;