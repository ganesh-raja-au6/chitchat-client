import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from 'axios'
import thunk from "redux-thunk";

/////////////////////////////////////////      initial state
const initialState = {
  user: JSON.parse(localStorage.getItem("test")) || null,
  error: '',
  posts: null,
};

/////////////////////////////////////////       actions
export const setuser = (user) => async dispatch => {
    try{
        const {email, password} = user
        const {data} = await axios.post(`https://enigmatic-beach-53552.herokuapp.com/api/v1/auth/signin`, {
            email, password
        })
        dispatch({type : "setuser", payload : data})
    }catch(err){
        dispatch({type : 'error', payload : err.error})
    }
} 
export const setposts = () => async dispatch => {
    try{
        const {data} = await axios.get(`https://enigmatic-beach-53552.herokuapp.com/api/v1/post/`)
        dispatch({type : 'setposts', payload : data})
    }catch(err){
        dispatch({type : 'error', payload : err.error})
    }
}
export const logoutuser = () => async dispatch => {
    try{
        // const {data} = await axios.delete(`https://enigmatic-beach-53552.herokuapp.com/api/v1/auth/signout`)
        dispatch({type : 'logoutuser'})
    }catch(err){
        dispatch({type : 'error', payload : err.error})
    }
}

/////////////////////////////////////////         reducers
const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "setuser":
      localStorage.setItem("test", JSON.stringify(payload));
      return { ...state, user: payload };
    case 'error': return {...state, error : payload}
    case "logoutuser":
      localStorage.removeItem("test");
      return { ...state, user: null };
    case "setposts":
      return { ...state, posts: payload };
    default:
      return state;
  }
};

///////////////////////////////////////////////     store
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
