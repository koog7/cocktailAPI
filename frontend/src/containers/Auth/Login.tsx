import { Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authorizationUser, loginUser } from '../Thunk/AuthFetch.ts';

const Login = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const error = useSelector((state: RootState) => state.User.error)

    const [emailError, setEmailError] = useState<string | null>(null);
    const [passwordError, setPasswordError] = useState<string | null>(null);

    const [login, setLogin] = useState({
          email: '',
          password: '',
    });

    const submitData = async (e: React.FormEvent) => {
        e.preventDefault();

        if (login.email.trim() !== '') {
            setPasswordError('Field is required');
        }
        if(login.password.trim() !== ''){
            setEmailError('Field is required');
        }

        if(login.email.trim() !== '' && login.password.trim() !== ''){
            const dis = await dispatch(authorizationUser(login));

            if(dis.type === 'users/singUp/rejected'){
                return;
            }else{
                navigate('/');
            }
        }

    };

    return (
        <div style={{marginLeft: '0px'}}>
            <h2 style={{marginLeft: '460px'}}>Log in</h2>
            <Box component="form"
                 sx={{
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                   width: '300px',
                   margin: '40px auto',
                   gap: 2,

                 }}
                 noValidate
                 autoComplete="off"
            >
                <TextField
                  label="Email"
                  variant="filled"
                  fullWidth
                  value={login.email}
                  onChange={(e) =>
                    setLogin({ ...login, email: e.target.value })
                  }
                  InputProps={{
                    style: { backgroundColor: 'white' },
                  }}
                  required={true}
                  error={!!emailError}
                  helperText={emailError}
                />
                    <TextField
                      label="Password"
                      type="password"
                      variant="filled"
                      fullWidth
                      value={login.password}
                      onChange={(e) =>
                        setLogin({ ...login, password: e.target.value })
                      }
                      InputProps={{
                        style: { backgroundColor: 'white' },
                      }}
                      required={true}
                      error={!!passwordError}
                      helperText={passwordError}
                    />
                {error && (
                    <div style={{color:'red'}}>{error}</div>
                )}
                <Button
                    variant="contained"
                    sx={{
                      backgroundColor: 'white',
                      color: 'black',
                      '&:hover': {
                        backgroundColor: '#f0f0f0',
                      },
                    }}
                    onClick={submitData}
                    fullWidth>
                    Enter
                  </Button>
            </Box>
        </div>
    )};

  export default Login;