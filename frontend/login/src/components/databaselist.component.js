import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";

var list = ["abcd", "efgh", "ijkl", "mnop"];
const itemList = ["Item1", "Item2", "Item3", "Item4", "Item5"];

export default class DatabaseList extends Component {
  render() {
    // Add array index as the key
    const renderList = itemList.map((item, index) => <ListGroup.Item key={index}>{item}</ListGroup.Item>);
    // console.log(list);
    return (
      <ListGroup>
        {renderList}
      </ListGroup>
    );
  }
}
