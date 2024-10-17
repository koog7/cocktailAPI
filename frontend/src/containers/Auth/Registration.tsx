import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store.ts';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useRef, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { loginUser } from '../Thunk/AuthFetch.ts';

const Registration = () => {

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const urlFile = useRef(null)
    const [file, setFile] = useState<File | null>(null);


    const [login, setLogin] = useState({
        email: '',
        displayName: '',
        password: '',
    });

    const submitData = async (e: React.FormEvent) => {
        e.preventDefault();

        await dispatch(loginUser({email:login.email, displayName: login.displayName, password: login.password , avatar: file}));
        await navigate("/");
    };

    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target.files

        if (fileInput && fileInput[0]) {
            setFile(fileInput[0])
        } else {
            setFile(null)
        }
    }

    return (
        <div style={{marginLeft: '470px'}}>
            <h2>Sign Up</h2>
            <Box
                component="form"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '300px',
                    marginLeft: '-107px',
                    gap: 2,
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label="Email"
                    variant="filled"
                    fullWidth
                    required={true}
                    value={login.email}
                    onChange={(e) =>
                        setLogin({ ...login, email: e.target.value })
                    }
                    InputProps={{
                        style: { backgroundColor: 'white' },
                    }}
                />
                <TextField
                    label="Display name"
                    variant="filled"
                    fullWidth
                    value={login.displayName}
                    onChange={(e) =>
                        setLogin({ ...login, displayName: e.target.value })
                    }
                    InputProps={{
                        style: { backgroundColor: 'white' },
                    }}
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
                />

                <input ref={urlFile} accept="image/*" onChange={onFileChange} type={"file"} style={{ marginTop: '20px' }} />
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
    );
};

export default Registration;