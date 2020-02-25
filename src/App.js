import React, { Component } from 'react';
import AdminLTE, { Sidebar } from 'adminlte-2-react';
import ProfileComponent from './components/employee/profile.component';
import AttendanceComponent from './components/employee/attendance.component';
import EodComponent from './components/employee/eod.component';
import Leaves from './components/employee/leaves.component';

const { Item, UserPanel } = Sidebar;

class App extends Component {

  children = [
    <Item key="profile" text="Profile" to="/profile" icon="fa-user-alt" />,
    <Item key="attendance" text="Attendance" to="/attendance" icon="fa-user-clock"/>,
    <Item key="eod" text="End of Day" to="/eod" icon="fa-file-alt" />,
    <Item key="leaves" text="Leaves" to="/leaves" icon="fa-leaf"/>,
    <Item key="undertime" text="Undertime" to="/undertime" icon="fa-clock"/>,
    <Item key="overtime" text="Overtime" to="/overtime" icon="fa-business-time" />
  ]

  sidebar = [
    <UserPanel key="userinfo" username="Don Cosio" status="Available" statusType="success" imageUrl="/user2-160x160.jpg" />,
    <Item key="employee" icon="fa-address-card" text="Employee" children={this.children}/>
  ]

  render() {
    return (
      <AdminLTE title={["HRIS"]} titleShort={["HRIS"]} theme="blue" sidebar={this.sidebar}>
        <ProfileComponent path="/profile" />
        <AttendanceComponent path="/attendance" />
        <EodComponent path="/eod"/>
        <Leaves path="/leaves"/>
      </AdminLTE>
    );
  }
}

export default App;