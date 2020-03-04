import React from 'react';
import { Box, Button } from 'adminlte-2-react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const EditDependent = props => {
    footer = [
        <Button key="btnSubmitDp1" type="success" pullRight text="Submit" onClick={props.updateDependent}} />,
        <Button key="btnSubmitDp2" type="warning" pullRight  text="Clear All" onClick={()=> props.setEditing(false)} />
      ]

    return(

       
          
          <Box title="Dependents" type="success" collapsable footer={this.footer}>
            <div className="form-group">
                <label for="first_name_dep">First Name</label>
                <input type="text" id="first_name_dep" className="form-control" required value={props.first_name} name="first_name" placeholder="Enter ..." onChange={props.handleFirstName}/>
            </div>
            <div className="form-group">
                <label for="last_name_dep">Last Name</label>
                <input type="text" id="last_name_dep" className="form-control" required value={props.last_name} name="last_name" placeholder="Enter ..." onChange={props.handleLastName} />
            </div>
            <div className="form-group">
                <label for="birthday_dep">Birthday</label>
                  <div id="birthday_dep">
                    <DatePicker selected={props.birthday} required onChange={props.handleBirthday} name="birthday"/>
                  </div>
            </div>
            <div className="form-group">
                <label for="relationship_dep">Relationship</label>
                <input type="text" id="relationship_dep"className="form-control" required value={props.relationship} name="relationship" placeholder="Enter ..." onChange={props.handleRelationship} />
            </div>
            <div className="form-group">
                <label for="contact_no_dep">Contact Number</label>
                <input type="text" id="contact_no_dep"className="form-control" required value={props.contact_no} name="contact_no" placeholder="Enter ..." onChange={props.handleContact} />
            </div>
          </Box>
    )

}


export default EditDependent;