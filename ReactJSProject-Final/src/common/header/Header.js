import React, {useState} from 'react';
import './Header.css';
import logoSVG from '../../assets/logo.svg';
import { Button } from "@material-ui/core";
import Modal from '../modal/Modal';
import Register from "../../components/register/Register";
import Login from "../../components/login/Login";
import {login} from "../../api/auth";
import {useHistory} from "react-router-dom";

export const Header = (props) => {
    const history = useHistory();
    const [loggedIn, setLoggedIn] = useState(!!sessionStorage.accessToken);
    const [showModal, setShowModal] = useState(false);
    const [isBookShowClick, setIsBookShowClick] = useState(false);

    const onLoginClick = () => {
        loggedIn ? onLogout() : setShowModal(true);
    }

    const onLogin = async (userName, password, bookShowId) => {
        const response = await login({path: 'auth/login', accessToken: `Basic ${window.btoa(`${userName}:${password}`)}`})
        if(response && response.statusText === 'OK') {
            sessionStorage.setItem('uuid', response.data.id);
            sessionStorage.setItem('access-token', response.headers.accessToken);
            setLoggedIn(true);
            setShowModal(false);
            props.showBookButton && isBookShowClick && history.push(`/bookshow/${props.bookShowId}`);
        } else {
            throw(response);
        }
    }

    const onLogout = async () => {
        sessionStorage.removeItem('uuid');
        sessionStorage.removeItem('access-token');
        setLoggedIn(false);
        props.showBookButton && history.push(`/`);
    }

    const onBookShowClick = () => {
        if(loggedIn)
            history.push(`/bookshow/${props.bookShowId}`);
        else {
            setShowModal(!showModal);
            setIsBookShowClick(true);
        }
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <React.Fragment>
            <div className='header'>
                <img className='logo' src={logoSVG} alt="React Logo" />
                <div className='buttons'>
                    {props.showBookButton && <Button className='button' variant='contained' color='primary' onClick={onBookShowClick}>BOOK SHOW</Button>}
                    <Button className='button' variant='contained' onClick={onLoginClick}>{loggedIn ? 'LOGOUT' : 'LOGIN'}</Button>
                </div>
            </div>
            {showModal &&
            <Modal
                open={showModal}
                close={closeModal}
                tabs={['Login', 'Register']}
                tabActions={{
                    Login: <Login onLogin={onLogin}/>,
                    Register: <Register/>
                }}
            />
            }
        </React.Fragment>
    );
}

export default Header;
