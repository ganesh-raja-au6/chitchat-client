import React, {useEffect} from 'react'
import { connect } from 'react-redux'
import {setposts} from '../../redux/store'

const Posts = ({posts, setposts}) => {
    useEffect(() => {
        setposts()
        
    },[])
    if(!posts) return <h1>No Posts</h1>
    return(
        <h2> pos </h2>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps, {setposts})(Posts)