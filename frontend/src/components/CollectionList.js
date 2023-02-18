import React from "react";
import { useState, useEffect } from "react";
import { DocumentList } from "./DocumentList";

export function CollectionList(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [isFindAllOpen, setIsFindAllOpen] = useState(false);
    const [collection, setCollection] = useState("");

    function findAll(event) {
        setIsFindAllOpen(true);
        setCollection(event.target.innerHTML);
    }

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("http://localhost:3000/" + props.db)
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
    if (isFindAllOpen) {
        return (
            <div>
                <ul>
                    {items.map(item => (
                        <li onClick={findAll}>
                            {item}
                        </li>
                    ))}
                </ul>
                <DocumentList path={props.db + "/"+collection}></DocumentList>
            </div>
        );
    }
    else if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {items.map(item => (
                    <li onClick={findAll}>
                        {item}
                    </li>
                ))}
            </ul>
        );
    }
}