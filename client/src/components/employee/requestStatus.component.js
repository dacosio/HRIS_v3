import React, { Component } from 'react';
import { Col, Box, SimpleTable } from 'adminlte-2-react';
import axios from 'axios';
import moment from 'moment';

class RequestStatusComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            records: [],
            title: props.title
        };

        axios.get('http://localhost:8080/api/time')
            .then(result => {
                console.log(result);

                result.data.forEach(res => {
                    res.date_filed = moment(res.date_filed).format("YYYY/MM/DD");
                    res.isAccepted = res.isAccepted? "Approved" : "Pending";
                });

                this.setState({
                    records: this.state.records.concat(result.data
                        .filter(res => res.time_type == props.timeType)
                    )
                });

                console.log("state",this.state);
            })
            .catch(err => console.log(err));
    }
 
    columns = [
        {
            title: "Date Filed",
            data: 'date_filed',
        },
        {
            title: 'Reason',
            data: 'reason'
        },
        {
            title: "From",
            data: 'from_time',
        },
        {
            title: "To",
            data: 'to_time',
        },
        {
            title: "Status",
            data: 'isAccepted'
        }
    ];

    render() {
      const {records} = this.state

      return (
        <Col md={6}>
            <Box title={this.state.title} type="primary" collapsable>
                <SimpleTable columns={this.columns} data={this.state.records} striped="true" hover="true" border="true"></SimpleTable>
            </Box>
        </Col>
      );
    }
}



export default RequestStatusComponent;