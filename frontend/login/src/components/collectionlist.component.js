import React, { Component } from "react";
import ListGroup from "react-bootstrap/ListGroup";

const itemList = ["Item1", "Item2", "Item3", "Item4", "Item5"];

export default class CollectionList extends Component {
  render() {
    // Add array index as the key
    const renderList = itemList.map((item, index) => <ListGroup.Item key={index}>{item}</ListGroup.Item>);
    // console.log(list);
    return <ListGroup>{renderList}</ListGroup>;
    // return <h3>This will Render all Collection List</h3>;
  }
}
