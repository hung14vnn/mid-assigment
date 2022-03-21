import React from 'react';
import { useState, useEffect } from 'react';
import {useParams,Link} from 'react-router-dom';
import Box from '@mui/material/Box';
import {Image} from 'react-bootstrap'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { WindowSharp } from '@mui/icons-material';
export default function AddBook() {
    const [data, setData] = useState();
    const [data2, setData2] = useState();
    const [photoFileName, setPhotoFileName] = useState();
    const imagesrc = 'https://localhost:7281/Photos/'+photoFileName
    const [categoryID, setCategoryID] = useState();
    const [bookName, setbookName] = useState();

    const handleChange = (event) => {
      setCategoryID(event.target.value);
    };
    const handleChange2 = (event) => {
        setbookName(event.target.value);
        };
    const handleChange3 = (event) => {
        setPhotoFileName(event.target.value);
        };

    
    const handleSubmit = (event) => {
        event.preventDefault();
         fetch('https://localhost:7281/Book', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        
            body: JSON.stringify({  
                categoryID: categoryID,
                bookName : bookName,
                photoFileName : photoFileName
            }),
        })
        .then(response => response.json())
        .then(function (response) {
            if(response != null){
                alert("Book Created");
                window.location.reload();
            }
            else{
                alert("Something went wrong");
            }
        })
    };
     
    useEffect(() => {
        fetch('https://localhost:7281/Category/GetCategories')
          .then((response) => response.json())
          .then((json) => setData2(json));
      }, []);

    const handleFileUpload = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        fetch('https://localhost:7281/Book/SaveFile', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(function (response) {
            if(response != null){
                console.log(response);
                setPhotoFileName(response);
            }
            else{
                alert("Something went wrong");
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
        <Typography style={{ fontSizemarginTop:'20px'}}onChange={handleChange3} value={photoFileName} variant="outlined">{photoFileName}</Typography>
        <Image src={imagesrc} style={{ width: '90px', height: '160px' }} />
        <input onChange={handleFileUpload} type="file" />
        <Button onClick={handleSubmit} style={{ marginTop:"10px", marginLeft:"0px"}} type="submit" variant="outlined" color="success"><Link style={{ textDecoration:'none'}} to="/manage">Create</Link></Button>   
        </FormControl>
        
        </Box>

    );


  };