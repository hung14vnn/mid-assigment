import React from 'react';
import { useState, useEffect } from 'react';
import {useParams,Link} from 'react-router-dom';
import Button from '@mui/material/Button';
export default function BookDetail() {
    const [data, setData] = useState();
    const bookID = useParams().id;
    const [value, setValues] = React.useState({
        userId: sessionStorage.getItem("userid"),
        bookId: bookID,
      });
    useEffect(()=>{
        fetch('https://localhost:7281/Book/'+bookID)
        .then(response => response.json())
        .then(json => setData(json));
    } ,[]  
    );
    
    const handleSubmit = (event) => {
        event.preventDefault();
       fetch('https://localhost:7281/Request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(value),
        })
          .then(response => response.json())  
          .then(function (response) {
            if(response === true){
              alert("Request Sent");
              window.location.reload();
            }
            else{
              alert("This book is already requested by someone else");
            }
          })
      };
    return (
        <div>
        <ul>
        <div style={{marginTop: '20px'}}>ID: {data?.id}</div>
        <div>Book Name: {data?.bookName}</div> 
        </ul>
        <Button onClick={handleSubmit} style={{marginLeft:'30px'}} variant="outlined" color="success"><Link style={{ textDecoration:'none'}} to="/">Borrow this book</Link></Button>
    </div>
    );
  };