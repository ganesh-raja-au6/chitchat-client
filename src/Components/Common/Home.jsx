import React from 'react'
import {Redirect, withRouter} from 'react-router-dom'
import {isAuthenticated} from "../Auth/isAuthenticated"

const Home = ({ history}) => {
    return (
        <h1>Hello</h1>
    )
}

export default withRouter(Home)