import React from "react";
import {Table} from "react-bootstrap";
import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

export default function YourRequest(){
const [data, setData] = useState();
const [data2, setData2] = useState();
const id = sessionStorage.getItem("userid");

useEffect(() => {
    fetch('https://localhost:7281/Request/getRequestsById?id='+id)
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

useEffect(() => {
    fetch('https://localhost:7281/Book/')
    .then(response => response.json())
    .then(json => setData2(json));
},[]    
);
            

        return (
            <div >
                <Table className="mt-4" striped bordered hover size="sm"> 
                    <thead>
                        <tr>
                        <th>Request ID</th>
                        <th>Book ID</th>
                        <th>Book Name</th>
                        <th>Status</th>
                        <th>Request Date</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((b) => (
                            <tr key={b.id}>
                                <td>{b.id}</td>
                                <td>{b.bookID}</td>
                                <td>
                                    {data2 && data2.map((b2) => (
                                        <div key={b2.id}>
                                            {b2.id === b.bookID && b2.bookName}
                                        </div>
                                    ))}
                                </td>   
                                <td>{b.status}</td>
                                <td>{b.requestDate}</td>
                                <td><Button variant="outlined" color="error" startIcon={<DeleteIcon />}><Link to={`/request/${b.id}`} style={{ textDecoration:'none'}} >Cancel</Link></Button></td> 
                            </tr>
                        ))}
                    </tbody>

                </Table>
                </div>
        );
    }