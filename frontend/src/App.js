import React from 'react';
import {Route, Switch} from "react-router-dom";
import Layout from "./components/UI/Layout/Layout";
import EventsCalendar from "./containers/EventsCalendar/EventsCalendar";
import Registration from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";

const App = () => {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact component={EventsCalendar}/>
                <Route path="/register" component={Registration}/>
                <Route path="/login" component={Login}/>
                <Route render={() => <h1>Not Found</h1>} />
            </Switch>
        </Layout>
    );
};

export default App;