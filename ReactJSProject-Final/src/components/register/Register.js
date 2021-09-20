import React, {useState} from 'react';
import './Register.css';
import {Button, FormControl, FormHelperText, Input, InputLabel} from "@material-ui/core";
import {signup} from "../../api/auth";

export const Register = () => {
    const [firstName, setFirstName] = useState('')
    const [reqFirstName, setReqFirstName] = useState('no-helper')
    const [lastName, setLastName] = useState('')
    const [reqLastName, setReqLastName] = useState('no-helper')
    const [email, setEmail] = useState('')
    const [reqEmail, setReqEmail] = useState('no-helper')
    const [password, setPassword] = useState('')
    const [reqPassword, setReqPassword] = useState('no-helper')
    const [contact, setContact] = useState('')
    const [reqContact, setReqContact] = useState('no-helper')
    const [message, setMessage] = useState('');

    const onFirstNameChange = (e) => {
        setFirstName(e.target.value);
    }

    const onLastNameChange = (e) => {
        setLastName(e.target.value);
    }

    const onEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const onContactChange = (e) => {
        setContact(e.target.value);
    }

    const onSubmit = async (e) => {
        firstName === '' ? setReqFirstName("helper") : setReqFirstName('no-helper');
        lastName === '' ? setReqLastName("helper") : setReqLastName('no-helper');
        email === '' ? setReqEmail("helper") : setReqEmail('no-helper');
        password === '' ? setReqPassword("helper") : setReqPassword('no-helper');
        contact === '' ? setReqContact("helper") : setReqContact('no-helper');

        if(firstName === '' || lastName === '' || email === '' || password === '' || contact === '')
            return;

        const data = {
            "email_address": email,
            "first_name": firstName,
            "last_name": lastName,
            "mobile_number": contact,
            "password": password
        }

        try {
            await signup({path: 'signup', data});
            setMessage('Registration Successful. Please Login!');
        } catch(err) {
            setMessage(err.message);
        }
    }

    return (
        <div className='form'>
            <div className='form-fields'>
                {/*First Name*/}
                <FormControl required className="formControl">
                    <InputLabel htmlFor="firstname">
                        First Name
                    </InputLabel>
                    <Input
                        id="firstname"
                        value={firstName}
                        onChange={onFirstNameChange}
                    />
                    <FormHelperText className={reqFirstName}>
                        <span className="red">Required</span>
                    </FormHelperText>
                </FormControl>

                {/*Last Name*/}
                <FormControl required className="formControl">
                    <InputLabel htmlFor="lastname">
                        Last Name
                    </InputLabel>
                    <Input
                        id="lastname"
                        value={lastName}
                        onChange={onLastNameChange}
                    />
                    <FormHelperText className={reqLastName}>
                        <span className="red">Required</span>
                    </FormHelperText>
                </FormControl>

                {/*Email*/}
                <FormControl required className="formControl">
                    <InputLabel htmlFor="email">
                        Email
                    </InputLabel>
                    <Input
                        id="email"
                        value={email}
                        type="email"
                        onChange={onEmailChange}
                    />
                    <FormHelperText className={reqEmail}>
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

                {/*Contact Number*/}
                <FormControl required className="formControl">
                    <InputLabel htmlFor="contact">
                        Contact No.
                    </InputLabel>
                    <Input
                        id="contact"
                        value={contact}
                        onChange={onContactChange}
                    />
                    <FormHelperText className={reqContact}>
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
                REGISTER
            </Button>
        </div>
    );
}

export default Register;