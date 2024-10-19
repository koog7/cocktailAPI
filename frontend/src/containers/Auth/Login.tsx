import { Box, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { authorizationUser, googleLogin } from '../Thunk/AuthFetch.ts';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const error = useSelector((state: RootState) => state.User.error);

    const [login, setLogin] = useState({
          email: '',
          password: '',
    });
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (login.email.length > 0 && login.password.length > 0) {
            setIsValid(true);
        } else {
            setIsValid(false);
        }
    }, [login.email, login.password]);

    const submitData = async (e: React.FormEvent) => {
        e.preventDefault();

        const dis = await dispatch(authorizationUser(login));

        if(dis.type === 'users/singUp/rejected'){
            return;
        }else{
            navigate('/');
        }
    };

    const googleLoginHandler = async (credential: string) => {
        await dispatch(googleLogin(credential)).unwrap();
        navigate('/');
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
                    disabled={!isValid}
                    fullWidth>
                    Enter
                  </Button>
                <GoogleLogin theme={"filled_black"}  onSuccess={(credentialResponse) =>{
                    if (credentialResponse.credential) {
                        void googleLoginHandler(credentialResponse.credential);
                    }
                }}/>
            </Box>
        </div>
    );};

  export default Login;