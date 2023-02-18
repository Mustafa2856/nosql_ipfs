import React from "react";
import { useState, useEffect } from "react";
import { CollectionList } from "./CollectionList";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from 'react-router-dom';

export function DatabaseList() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [database, setDatabase] = useState("");
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  function openCollectionList(event) {
    setIsCollectionOpen(true);
    setDatabase(event.target.innerHTML);
  }

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:3000/")
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
    //setItems(["sample", "sample2", "sample3"]);
  }, []);
  if (isCollectionOpen) {
    return <CollectionList db={database}></CollectionList>;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>

        <h2 class="head2">List of DataBases : </h2>
            <div class="input-group mb-3 head4">
              <input type="text" class="form-control" placeholder="Database's Name" aria-label="Database's Name" aria-describedby="basic-addon2" />
              <div class="input-group-append">
              <button class="btn btn-outline-primary" type="button">+ Add</button>
              </div>
            </div>

        <ul class="list-group">
          {items.map((item) => (
            <li class="list-group-item" onClick={(event) => {openCollectionList(event);navigate('/' + item)}}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
