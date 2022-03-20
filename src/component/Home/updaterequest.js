import React from 'react';
import { useState, useEffect } from 'react';
import {useParams,Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
export default function UpdateRequest() {
    const RequestId = useParams().id
    const [data, setData] = useState();
    const [status, setStatus] = useState();

    const handleChange = (event) => {
      setStatus(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
         fetch('https://localhost:7281/Request/updateRequest', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: data.id,
                status: status,
                bookId: data.bookId,
                userId: data.userId,
                requestDate: data.requestDate,
                books: data.books,
            }),

        })
        .then(response => response.json())
        .then(function (response) {
            if(response != null){
                alert("Request Updated");
                window.location.reload();
            }
            else{
                alert("Request not found");
            }
        })
    };

    

    useEffect(()=>{
        fetch('https://localhost:7281/Request/getRequestById?id='+RequestId)
        .then(response => response.json())
        .then(json => setData(json));
    } ,[]
    );
    return (
        <Box sx={{ minWidth: 10 }}>
      <FormControl style={{ margin:'20px'}}>
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          id="status"
          label="status"
          onChange={handleChange}
        >
            <MenuItem value={'Pending'}>Pending</MenuItem>
            <MenuItem value={'Approved'}>Approved</MenuItem>
            <MenuItem value={'Rejected'}>Rejected</MenuItem>
        </Select>   
        <Button onClick={handleSubmit} type="submit" variant="outlined" color="success"><Link style={{ textDecoration:'none'}} to="/manage">Update Request Status</Link></Button> 

        </FormControl>
        </Box>

    );


  };