import React from 'react';
import { useState, useEffect } from 'react';
import {useParams,Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
export default function UpdateBook() {
    const RequestId = useParams().id
    const [data, setData] = useState();
    const [dataBook, setDataBook] = useState();
    const [data2, setData2] = useState();
    const [categoryID, setCategoryID] = useState();
    const [bookName, setbookName] = useState();

    const handleChange = (event) => {
      setCategoryID(event.target.value);
    };
    const handleChange2 = (event) => {
        setbookName(event.target.value);
        };
    const handleSubmit = (event) => {
        event.preventDefault();
         fetch('https://localhost:7281/Book/UpdateBook', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        
            body: JSON.stringify({
                Id: data.id,    
                categoryID: categoryID,
                bookName : bookName,
                photoFileName : data.photoFileName,
                categories: data.categories
            }),
        })
        .then(response => response.json())
        .then(function (response) {
            if(response != null){
                alert("Book Updated");
                window.location.reload();
            }
            else{
                alert("Something went wrong");
            }
        })
    };
    

    useEffect(()=>{
        fetch('https://localhost:7281/Book/GetBooksById?id='+RequestId)
        .then(response => response.json())
        .then(json => setData(json));
    } ,[]
    );
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
    const handleClick = (event) => {
    event.preventDefault();

   fetch('https://localhost:7281/Book/DeleteBook?id='+RequestId, {
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
                alert("This book was not deleted");
                window.location.href('/request');
                window.location.reload();
            }
        })
  };
    return (
        <Box sx={{ minWidth: 10 }}>

        <FormControl style={{ margin:'20px'}} variant="standard" color="success">
        <TextField onChange={handleChange2} style={{ marginBottom:'20px' }} label={"Name"} value={bookName} variant="outlined" />
        <Typography style={{fontSize:"10px"}}>Category</Typography>
        <Select
          value={categoryID}
          id="category"
          onChange={handleChange}
        >
            {data2 && data2.map(b2 => (
                <MenuItem value={b2.id}>
                       <div>
                            {b2.name}
                       </div>
                    </MenuItem>
            ))}

    
        </Select>
        
        <div>
        <Button onClick={handleSubmit} style={{ marginTop:"10px", marginLeft:"10px"}} type="submit" variant="outlined" color="success"><Link style={{ textDecoration:'none'}} to="/manage">Update</Link></Button> 
        <Button onClick={handleClick} style={{ marginTop:"10px", marginLeft:"5px"}} variant="outlined" color="error"><Link style={{ textDecoration:'none'}} to="/manage">Delete</Link></Button>
        </div>
        </FormControl>
        </Box>

    );


  };