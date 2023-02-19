import React from "react";
import { useState, useEffect } from "react";
import { DocumentList } from "./DocumentList";
import "bootstrap/dist/css/bootstrap.css";
import { useNavigate, useParams } from "react-router-dom";

export function CollectionList(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [isFindAllOpen, setIsFindAllOpen] = useState(false);
  const [collection, setCollection] = useState("");
  const {db} = useParams();
  const navigate = useNavigate();

  function findAll(event) {
    setIsFindAllOpen(true);
    setCollection(event.target.innerHTML);
  }

  function addNewCollection(event) {
    fetch("http://localhost:3000/create/" + db  + "/" +  document.getElementById("collinput").value,{method:"PUT"});
    setItems(items.concat([document.getElementById("collinput").value]));
  }

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("http://localhost:3000/" + db)
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
    // setItems(["sample321", "sample2132", "sample3123"]);
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <div>

      <h2 class="head2">List of Collections : </h2>
          <div class="input-group mb-3 head4">
            <input type="text" class="form-control" placeholder="Collection's Name" aria-label="Collection's Name" aria-describedby="basic-addon2" id="collinput"/>
            <div class="input-group-append">
            <button class="btn btn-outline-primary" type="button" onClick={addNewCollection}>+ Add</button>
            </div>
          </div>

      <ul class="list-group">
        {items.map((item) => (
          <li class="list-group-item" onClick={(event) => {findAll(event);navigate('/'+db+'/'+item)}}>
            {item}
          </li>
        ))}
      </ul>
    </div>

      // <ul>
      //   {items.map((item) => (
      //     <li onClick={findAll}>{item}</li>
      //   ))}
      // </ul>
      //   <ul class="list-group">
      //     {items.map((item) => (
      //       <li class="list-group-item" onClick={findAll}>
      //         {item}
      //       </li>
      //     ))}
      //   </ul>
    );
  }
}
