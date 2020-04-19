import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import API from "../utils/API";

class EmployeeDirectory extends Component {
  state = {
    results: [],
    search: "",
    filterBy: ""
  };
// This code runs when the component is loaded
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
  
//   The search and filter functions 
userSearch = (user) => {
        return user.name.first.toLowerCase().indexOf(this.state.search.toLowerCase())===0 || 
        user.name.last.toLowerCase().indexOf(this.state.search.toLowerCase())===0;
}
userFilter = (user1,user2) => {
    if (this.state.filterBy === "lastName"){
        return user1.name.last < user2.name.last ? -1 : 1
    }
    else if (this.state.filterBy === "country"){
        return user1.location.country < user2.location.country ? -1 : 1
    }
}
  render() {
    return (<div>
        <div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1 className="display-4">Employee Directory</h1>
    <p className="lead">Search Current Employees</p>
    <input name="search" onChange={this.handleInputChange}/>
  </div>
</div>
      <Container>
        <Row>
          <Col size="md-12">
          <table className="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col" onClick = {() => this.setState({filterBy:"lastName"})}>Last</th>
      <th scope="col">Photo</th>
      <th scope="col">Age</th>
      <th scope="col" onClick = {() => this.setState({filterBy:"country"})}>Country</th>
    </tr>
  </thead>
  <tbody>
   
    {this.state.results.filter(this.userSearch).sort(this.userFilter).map((user,index) => (
             <tr key={index}>
             <th scope="row">{index}</th>
             <td>{user.name.first}</td>
             <td>{user.name.last}</td>
             <td> <img src = {user.picture.medium} alt = 'profile pic'/></td>
             <td>{user.dob.age}</td>
             <td>{user.location.country}</td>
           </tr>
          ))}
  </tbody>
</table>
         
        </Col>
        </Row>
      </Container>
   </div>
    );
  }
}

export default EmployeeDirectory;
