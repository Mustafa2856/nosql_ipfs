import React from "react";
import { useState, useEffect } from "react";


export function DocumentList(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isCollectionOpen, setIsCollectionOpen] = useState(false);
    const [database,setDatabase] = useState("");
    const [items, setItems] = useState([]);

    function expandDocument(event) {
        setIsCollectionOpen(true);
        setDatabase(event.target.innerHTML);
    }
  
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
      fetch("http://localhost:3000/" + props.path)
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result);
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <ul>
          {items.map(item => (
            <li onClick={expandDocument}>
              {JSON.stringify(item)}
            </li>
          ))}
        </ul>
      );
    }
  }