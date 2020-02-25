import React, { Component } from 'react';
import { Content, Row, Col, Box, Button } from 'adminlte-2-react';

class ProfileComponent extends Component {
    state = {}

    render() {
      return (<Content title="Profile" subTitle="Employee Profile" browserTitle="Profile">
        <Row>
          <Col xs={12}>
            <Box title="Employee Details" type="primary" collapsable footer={<Button type="success" pullRight text="Save" />}>
              
            </Box>
          </Col>
        </Row>
      </Content>);
    }
}

export default ProfileComponent;