import React from 'react';
import { useState, useEffect } from 'react';
import {useParams,Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
export default function DeleteUser() {
    const RequestId = useParams().id
    const [data, setData] = useState();
    const [permission, setPermission] = useState();

    const handleChange = (event) => {
      setPermission(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
         fetch('https://localhost:7281/User/UpdateUser', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Id: data.id,    
                isAdministrator: permission,
                username : data.username,
                password : data.password,
                bookborrowingrequests: data.bookborrowingrequests
            }),
        })
        .then(response => response.json())
        .then(function (response) {
            if(response != null){
                alert("User Updated");
                window.location.reload();
            }
            else{
                alert("User not found");
            }
        })
    };
    

    useEffect(()=>{
        fetch('https://localhost:7281/User/getUserById?id='+RequestId)
        .then(response => response.json())
        .then(json => setData(json));
    } ,[]
    );
    const handleClick = (event) => {
    event.preventDefault();

   fetch('https://localhost:7281/User/DeleteUser?id='+RequestId, {
      method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(function (response) {
            if(response != null){
                alert("Deleted");
                window.location.reload();
    
            }
            else{
                alert("User was not deleted");
                window.location.href('/request');
                window.location.reload();
            }
        })
  };
    return (
<Box sx={{ minWidth: 10 }}>
      <FormControl style={{ margin:'20px'}}>
        <InputLabel>Permission</InputLabel>
        <Select
          value={permission}
          id="permission"
          label="Permission"
          onChange={handleChange}
        >
          <MenuItem value={true}>Administrator</MenuItem>
          <MenuItem value={false}>Basic user</MenuItem>
        </Select>
        <div>
        <Button onClick={handleSubmit} type="submit" variant="outlined" color="success"><Link style={{ textDecoration:'none'}} to="/manage">Update</Link></Button> 
        <Button onClick={handleClick} style={{ marginLeft:"5px"}} variant="outlined" color="error"><Link style={{ textDecoration:'none'}} to="/manage">Delete</Link></Button>
        </div>
        </FormControl>
        </Box>

    );


  };