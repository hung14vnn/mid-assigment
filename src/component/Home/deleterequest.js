import React from 'react';
import { useState, useEffect } from 'react';
import {useParams,Link} from 'react-router-dom';
import Button from '@mui/material/Button';
export default function DeleteRequest() {
    const RequestId = useParams().id
    const handleClick = (event) => {
    event.preventDefault();
   fetch('https://localhost:7281/Request/deleteRequest?id='+RequestId, {
      method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(function (response) {
            if(response != null){
                alert("Request deleted");
                window.location.reload();
    
            }
            else{
                alert("Request not deleted");
                window.location.href('/request');
                window.location.reload();
            }
        })
  };
    return (
        <div>
        <ul>
        <div style={{ margin:"30px"}}>Are you sure?</div> 
        </ul>
        <Button onClick={handleClick} style={{ marginLeft:"70px"}} variant="outlined" color="success"><Link style={{ textDecoration:'none'}} to="/request">Yes</Link></Button>
    </div>
    );
  };