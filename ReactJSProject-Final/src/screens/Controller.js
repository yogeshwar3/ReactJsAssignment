import React, {useState} from "react";
import Home from "./home/Home";
import Details from "../screens/details/Details";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import BookShow from "../screens/bookshow/BookShow";
import Confirmation from "../screens/confirmation/Confirmation";
import Header from "../common/header/Header";

const Controller = () => {
    const baseUrl = "/api/v1/";

    const [showBookShowButton, setShowBookShowButton] = useState(false)
    const [bookShowId, setBookShowId] = useState('')
    const changeBookShowId = (id) => {
        setBookShowId(id);
        id === '' ? setShowBookShowButton(false) : setShowBookShowButton(!showBookShowButton);
    }

    return (
        <Router>
            <div className="main-container">
                <Header showBookButton={showBookShowButton} bookShowId={bookShowId}/>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={(props) => <Home {...props} baseUrl={baseUrl} changeBookShowId={changeBookShowId} />}
                    />
                    <Route
                        path="/movie/:id"
                        render={(props) => <Details {...props} baseUrl={baseUrl} changeBookShowId={changeBookShowId} showBookButton={showBookShowButton}/>}
                    />
                    <Route
                        path="/bookshow/:id"
                        render={(props) => <BookShow {...props} baseUrl={baseUrl} />}
                    />
                    <Route
                        path="/confirm/:id"
                        render={(props) => <Confirmation {...props} baseUrl={baseUrl} />}
                    />
                </Switch>
            </div>
        </Router>
    );
};

export default Controller;