import axios from "axios";

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';
export const LOGIN_SUCCESS = 'SIGNUP_SUCCESS';
export const LOGIN_FAILURE = 'SIGNUP_FAILURE';

export const signup = (userdata) => async (dispatch) => {
    try{
        const response = await axios.post('http://localhost:8000/api/auth/signup', userdata);
        dispatch({type : SIGNUP_SUCCESS, payload : response.data});
    }catch(err) {
        dispatch({type: SIGNUP_FAILURE, payload: err.response.data});
    }
}

export const login = (userdata) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/login', userdata);
        const { token, admin_id } = response.data;

        sessionStorage.setItem('authToken', token);
        sessionStorage.setItem('admin_id', admin_id);

        dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        return response; // Return the axios response for handling in Login component
    } catch (error) {
        dispatch({ type: LOGIN_FAILURE, payload: error.response.data });
        throw error; // Rethrow error to handle in Login component
    }
};