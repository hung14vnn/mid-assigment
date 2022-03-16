import React from "react";
import {Table} from "react-bootstrap";
import { useState, useEffect } from 'react';
export default function HomePage(){
const [data, setData] = useState();
useEffect(() => {
    fetch('https://localhost:7281/book')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

        return (
            <div >
                <Table className="mt-4" striped bordered hover size="sm"> 
                    <thead>
                        <tr>
                        <th>BookId</th>
                        <th>BookName</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((b) => (
                            <tr key={b.id}>
                                <td>{b.id}</td>
                                <td>{b.bookName}</td>
                            </tr>
                        ))}
                    </tbody>
                
                </Table>
                </div>
        );
    }
