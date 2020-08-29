import React from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'
import Posts from '../Auth/posts'

const Home = ({ user}) => {
    if(!user) return <Redirect to="/signin" />
    return (
        <Posts />
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Home)