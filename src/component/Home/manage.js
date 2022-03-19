import React from "react";
import {Table} from "react-bootstrap";
import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

export default function Manage(){
const [data, setData] = useState();
const [data2, setData2] = useState();
const id = sessionStorage.getItem("userid");
const isAdmin = sessionStorage.getItem("isAdmin");

useEffect(() => {
    fetch('https://localhost:7281/User/GetUsers')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);

useEffect(() => {
    fetch('https://localhost:7281/Book/')
    .then(response => response.json())
    .then(json => setData2(json));
},[]    
);
            

        return isAdmin ? (
            <div >
                <h3 style={{ marginTop:"10px", marginLeft:"30px"}}>Users Management</h3>
                <Table className="mt-4" striped bordered hover size="sm"> 
                    <thead>
                        <tr>
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Is Administrator</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((b) => (
                                <tr key={b.id}>
                                <td>{b.id}</td>
                                <td>{b.username}</td>  
                                <td>{b.isAdministrator.toString()}</td>
                                <td><Button variant="outlined" color="success"><Link to={`/updateuser/${b.id}`} style={{ textDecoration:'none'}} >Update</Link></Button></td> 
                            
                            </tr>
                        ))}
                    </tbody>

                </Table>
                </div>
        ) : (
            <>
              <Typography
                  variant="subtitle1"
                  align="center"
                  color="text.secondary"
                  component="p"
                >
                  You are not an administrator. Please return to home screen!
                </Typography>
            </>
          );;
    }