import React, {useState} from 'react';
import './Login.css';
import {FormControl, FormHelperText, InputLabel, Input, Button} from "@material-ui/core";

export const Login = (props) => {
    const [userName, setUserName] = useState('')
    const [reqUsername, setReqUserName] = useState('no-helper')
    const [password, setPassword] = useState('')
    const [reqPassword, setReqPassword] = useState('no-helper')
    const [message, setMessage] = useState('');

    const onUserNameChange = (e) => {
        setUserName(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = async (e) => {
        userName === '' ? setReqUserName("helper") : setReqUserName('no-helper');
        password === '' ? setReqPassword("helper") : setReqPassword('no-helper');
        try {
            await props.onLogin(userName, password);
        } catch(err) {
            setMessage(err.message);
        }
    }

    return (
        <div className='form'>
            <div className='form-fields'>
                {/*User Name*/}
                <FormControl required className="formControl">
                    <InputLabel htmlFor="username">
                        Username
                    </InputLabel>
                    <Input
                        id="username"
                        value={userName}
                        onChange={onUserNameChange}
                    />
                    <FormHelperText className={reqUsername}>
                        <span className="red">Required</span>
                    </FormHelperText>
                </FormControl>

                {/*Password*/}
                <FormControl required className="formControl">
                    <InputLabel htmlFor="password">
                        Password
                    </InputLabel>
                    <Input
                        id="password"
                        value={password}
                        type="password"
                        onChange={onPasswordChange}
                    />
                    <FormHelperText className={reqPassword}>
                        <span className="red">Required</span>
                    </FormHelperText>
                </FormControl>
            </div>
            {setMessage && <div className='message'>{message}</div>}
            <Button
                variant="contained"
                onClick={onSubmit}
                color="primary"
                className={setMessage ? 'message' : 'submit'}
            >
                LOGIN
            </Button>
        </div>
    );
}

export default Login;