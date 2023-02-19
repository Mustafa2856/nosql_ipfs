import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export function DocumentList(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCollectionOpen, setIsCollectionOpen] = useState(false);
  const [database, setDatabase] = useState("");
  const [items, setItems] = useState([]);

  function expandDocument(event) {
    setIsCollectionOpen(true);
    setDatabase(event.target.innerHTML);
  }

  const { db, coll } = useParams();
  const path = db + "/" + coll;

  function addNewDoc(event) {
    fetch("http://localhost:3000/create/" + path, {
      method: "POST", headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }, body: document.getElementById('insertDoc').value
    });
    setItems(items.concat([JSON.parse(document.getElementById("insertDoc").value)]));
  }

  function deleteDocument(object) {
    fetch("http://localhost:3000/delete-one/" + path, {
      method: "POST", headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }, body: JSON.stringify(object)
    });
    setItems(items.filter((val) => {return val!=object}))
  }

  function updateDoc(object) {
    fetch("http://localhost:3000/update-one/" + path, {
      method: "POST", headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      }, body: JSON.stringify({filter:object,update:JSON.parse(document.getElementById("insertDoc").value)})
    });
    fetch("http://localhost:3000/" + path)
      .then((res) => res.json())
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
      );
  }

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:3000/" + path)
      .then((res) => res.json())
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
      );
    // setItems(["sample", "sample2", "sample3"]);
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      // <ul>
      //   {items.map(item => (
      //     <li onClick={expandDocument}>
      //       {JSON.stringify(item)}
      //     </li>
      //   ))}
      // </ul>
      <div>
        <h2 className="head2">List of Documents : </h2>
        <div className="input-group mb-3 head4">
          <input type="text" className="form-control" placeholder="JSON Object" aria-label="JSON Object" aria-describedby="basic-addon2" id="insertDoc" />
          <div className="input-group-append">
            <button className="btn btn-outline-primary" type="button" onClick={addNewDoc}>
              + Add
            </button>
          </div>
        </div>

        <ul className="list-group">
          {items.map((item) => (
            <li className="list-group-item">
              <div>
                <span onClick={expandDocument}>{JSON.stringify(item)}</span>
                <span className="right">
                  <button className="btn btn-outline-warning margin-btn" onClick={()=>updateDoc(item)}>update</button>
                  <button className="btn btn-outline-danger margin-btn" onClick={()=>{deleteDocument(item)}}>delete</button>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
