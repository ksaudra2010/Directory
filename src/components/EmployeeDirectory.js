import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import API from "../utils/API";

class EmployeeDirectory extends Component {
  state = {
    results: [],
    search: ""
  };

  componentDidMount() {
API.generateUsers().then(res => {
    this.setState({
        results: res.data.results
    })
})
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
{
    this.state.results[0].gender
}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default EmployeeDirectory;
