import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import Layout from "./components/UI/Layout/Layout";
import EventsCalendar from "./containers/EventsCalendar/EventsCalendar";
import Registration from "./containers/Registration/Registration";
import Login from "./containers/Login/Login";
import AddEvent from "./containers/AddEvent/AddEvent";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
        <Route {...props}/> :
        <Redirect to={redirectTo}/>
};

const App = () => {
    const user = useSelector(state => state.users.user);

    return (
        <Layout>
            <Switch>
                <ProtectedRoute
                    isAllowed={user}
                    path="/"
                    exact component={EventsCalendar}
                    redirectTo="/login"
                />
                <Route path="/register" component={Registration}/>
                <Route path="/login" component={Login}/>
                <ProtectedRoute
                    isAllowed={user}
                    path="/events/new"
                    component={AddEvent}
                    redirectTo="/login"
                />
                <Route render={() => <h1>Not Found</h1>} />
            </Switch>
        </Layout>
    );
};

export default App;