import React from "react";
import {Table} from "react-bootstrap";
import { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';

export default function Manage(){
const [data, setData] = useState();
const [dataBook, setDataBook] = useState();
const [data2, setData2] = useState();
const [dataUser, setDataUser] = useState();
const [dataRequest, setDataRequest] = useState();
const id = sessionStorage.getItem("userid");
const isAdmin = sessionStorage.getItem("isAdmin");

useEffect(() => {
    fetch('https://localhost:7281/User/GetUsers')
      .then((response) => response.json())
      .then((json) => setData(json));
  }, []);
  useEffect(() => {
    fetch('https://localhost:7281/Request/getRequests')
      .then((response) => response.json())
      .then((json) => setDataRequest(json));
  }, []);
  

useEffect(() => {
    fetch('https://localhost:7281/Book/')
    .then(response => response.json())
    .then(json => setDataBook(json));
},[]    
); 
useEffect(() => {
    fetch('https://localhost:7281/Category/GetCategories')
      .then((response) => response.json())
      .then((json) => setData2(json));
  }, []);
  useEffect(()=>{
    fetch('https://localhost:7281/User/GetUsers')
    .then(response => response.json())
    .then(json => setDataUser(json));
} ,[]
);
            

        return isAdmin ? (
            <div>
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

                <h3 style={{ marginTop:"30px", marginLeft:"30px"}}>Books Management</h3>
                <Table className="mt-4" striped bordered hover size="sm"> 
                    <thead>
                        <tr>
                        <th>Book ID</th>
                        <th>Book name</th>
                        <th>Photo</th>
                        <th>Category</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataBook && dataBook.map((b) => (
                                <tr key={b.id}>
                                <td>{b.id}</td>
                                <td>{b.bookName}</td>  
                                <td><img src={'https://localhost:7281/Photos/'+b.photoFileName} alt="book" width="100px" height="100px"/></td>
                                {/* <td>{b.categoryID}</td> */}
                                <td>{data2 && data2.map((b2) => (
                                        <div key={b2.id}>
                                            {b2.id === b.categoryID && b2.name}
                                        </div>
                                    ))}
                                </td>
                                <td><Button variant="outlined" color="success"><Link to={`/updatebook/${b.id}`} style={{ textDecoration:'none'}} >Update</Link></Button></td>  
                            </tr>
                        ))}
                    </tbody>

                </Table>
          
            
                <h3 style={{ marginTop:"10px", marginLeft:"30px"}}>Requests Management</h3>
                <Table className="mt-4" striped bordered hover size="sm"> 
                    <thead>
                        <tr>
                        <th>Request ID</th>
                        <th>User</th>
                        <th>Book Name</th>
                        <th>Status</th>
                        <th>Request Date</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataRequest && dataRequest.map((b) => (
                            <tr key={b.id}>
                                <td>{b.id}</td>
                                <td>{dataUser && dataUser.map((b3) => (
                                        <div key={b3.id}>
                                            {b3.id === b.userID && b3.username}
                                        </div>
                                    ))}</td>
                                <td>
                                    {dataBook && dataBook.map((b2) => (
                                        <div key={b2.id}>
                                            {b2.id === b.bookID && b2.bookName}
                                        </div>
                                    ))}
                                </td>   
                                <td>{b.status}</td>
                                <td>{b.requestDate}</td>
                                <td><Button variant="outlined" color="success"><Link to={`/updaterequest/${b.id}`} style={{ textDecoration:'none'}} >Update</Link></Button></td> 
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