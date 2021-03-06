import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Login from '../Login/login';
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

const theme = createTheme();
const isLoggedIn = sessionStorage.getItem("login");

export default function Album() {
    const Username = sessionStorage.getItem('username');
    const [data, setData] = useState();
    const [dataCategory, setDataCategory] = useState();
    useEffect(() => {
        fetch('https://localhost:7281/book')
          .then((response) => response.json())
          
          .then((json) => setData(json));
      }, []);
      useEffect(() => {
        fetch('https://localhost:7281/User/getUserId?username='+Username)
        .then(response => response.json()) 
        .then(function (response) {
            sessionStorage.setItem('userid',response);
        } 
        );
    },[]);
    useEffect(() => {
      fetch('https://localhost:7281/Category/GetCategories')
        .then((response) => response.json())
        .then((json) => setDataCategory(json));
    }, []);
    
    useEffect(() => {
      fetch('https://localhost:7281/User/getUserPermission?username='+Username)
      .then(response => response.json()) 
      .then(function (response) {
       if(response === true){
        sessionStorage.setItem('isAdmin',true);
       }
      } 
      );
  },[]
  );
    
    

     
  return isLoggedIn ? (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h2"
              variant="h3"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Book Borrowing System
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Looking for your favourite books. Well, here you go.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Main action</Button>
              <Button variant="outlined">Secondary action</Button>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data && data.map((b) => (
              <Grid item key={b.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={'https://localhost:7281/Photos/'+b.photoFileName}
                    alt="Book's Cover"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                    {b.bookName}
                    </Typography>
                    <Typography>
                    Book Code: {b.id} 
                    </Typography>
                    <Typography>
                     {dataCategory && dataCategory.map((c) => (
                                        <div key={c.id}>
                                            {c.id === b.categoryID && c.name}
                                        </div>
                                    ))}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">
                    <Link style={{textDecoration:'none'}} href={`/${b.id}`}>View</Link>
                  </Button>

                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  ): (
    <>
      <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Login is required for this page!
        </Typography>
      <Login />
    </>
  );;
}