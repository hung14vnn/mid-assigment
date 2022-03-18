import { FormHelperText } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React,{useEffect,useState} from 'react'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
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

export default function Login() {
  const [value, setValues] = React.useState({
    username: '',
    password: '',
  });
  const [login,setLogin] = useState(false);

  const [touched, setTouched] = React.useState({
    username: false,
    password: false,
  });


  const handleChange = (event) => {
    setValues({
      ...value,
      [event.target.name]: event.target.value,
    });
  };


  useEffect(() => {
    if(sessionStorage.getItem("login")){
      setLogin(true)
    }
},[])


if(login){
  window.location.href = '/';
}


  const handleSubmit = (event) => {
    event.preventDefault();
   fetch('https://localhost:7281/User/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(value),
    })
      .then(response => response.json())  
      .then(function (response) {
        if(response === true){
          sessionStorage.setItem('login',true);
          sessionStorage.setItem('username',value.username);
          window.location.reload();
        }
        else{
          alert("Invalid Credentials");
        }
      })
  };


  const handleInputBlur = (event) => {
    setTouched({
      ...touched,
      [event.target.name]: true,
    });
  };


  const validateUsername = (username) => {
    if (!username) return 'Username is required';
    if (username.length < 3)
      return 'Username must be at least 3 characters long';
    const validUsername = String(username)
      .toLowerCase()
      .match(/^[a-z0-9]+$/);
    if (!validUsername) return 'Username can only contain letters and numbers';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 4) return 'Password must be at least 4 characters';
    if (password.length > 32) return 'Password must be less than 32 characters';
    return '';
  };
  const errorMessage = {
    username: validateUsername(value.username),
    password: validatePassword(value.password),
  };
  const validForm = errorMessage.password || errorMessage.username;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: '5px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={value.username}
              onChange={handleChange}
              onBlur={handleInputBlur}
            />
            {touched.username && (
            <FormHelperText
              style={{ display: 'flex', color: 'red' }}
            >
              {errorMessage.username}
            </FormHelperText>
          )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={value.password}
              onChange={handleChange}
              onBlur={handleInputBlur}
            />
            {touched.password && (
            <FormHelperText
              style={{ display: 'flex', color: 'red' }}
            >
              {errorMessage.password}
            </FormHelperText>
          )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={validForm}
              onClick={handleSubmit}
              sx={{ mt: 2, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                  _________________________________________________________________________________________         
              </Grid>
              </Grid>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?            
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}