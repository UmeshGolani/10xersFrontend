const initialState = {
    user : null,
    token: null,
    loading : false,
    error : null
};

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user : action.payload.user,
                token : action.payload.token,
                loading : false
            };
        case 'LOGIN_FAILED':
            return {
                ...state,
                error : action.payload,
                loading : false
            }
        case 'SIGNUP_SUCCESS':
            return {
                ...state,
                user : action.payload,
                loading : false
            }
        case 'SIGNUP_FAIL':
            return {
                ...state,
                error : action.payload,
                loading : false
            }
        default : 
        return state;
        

    }
}

export default userReducer;