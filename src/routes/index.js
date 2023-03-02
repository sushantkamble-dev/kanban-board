import { useState, useEffect } from "react"
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import firebase from "../firebase";
import ProtectedRoute from "./ProtectedRoute";

// Pages
import Login from "../pages/Login/index";
import Signup from "../pages/Signup";
import PageNotFound from "../pages/PageNotFound";
import LandingPage from "../pages/LandingPage/index.jsx";
import Splash from "../pages/Splash";

const Routes = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const authListener = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                //set the user
                setIsAuthenticated(true)
            } else {
                // set user as blank
                setIsAuthenticated(false)
            }
            setTimeout(() => {
                setIsLoading(false)
            }, 1500);
        })
    }
    useEffect(() => {
        authListener()
    }, [])

    if (isLoading) {
        return (<Splash />)
    }

    return (
        <BrowserRouter>
            {isAuthenticated ? <Redirect to={{ pathname: '/LandingPage' }} /> : null}
            <Switch>
                <Route exact path='/' component={Login} />
                <Route exact path='/Signup' component={Signup} />
                <ProtectedRoute exact path='/LandingPage' component={LandingPage} isAuthenticated={isAuthenticated} />
                <Route path="*" component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    )
}
export default Routes