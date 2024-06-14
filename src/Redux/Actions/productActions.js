import axios from "axios";

export const GET_PRODUCTS_REQUEST = 'GET_PRODUCTS_REQUEST';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAIL = 'GET_PRODUCTS_FAIL';
export const CREATE_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const CREATE_PRODUCTS_FAIL = 'GET_PRODUCTS_FAIL';

export const getAllProducts = (admin_id="") => {
    return async (dispatch) => {
        dispatch({type : GET_PRODUCTS_REQUEST})
    try {
        const response = await axios.get(`https://one0xersbackend.onrender.com/api/products?admin_id=${admin_id}`);
        console.log("response data",response.data);
        dispatch({type : GET_PRODUCTS_SUCCESS, payload : response.data});
    } catch (error) {
        dispatch({type : GET_PRODUCTS_FAIL, payload : error.message});
    }
}
};

export const createProduct = (productData, token) => async (dispatch) => {
    try {
        const response = await axios.post('https://one0xersbackend.onrender.com/api/products',productData, {
            headers: {Authorization: `Bearer ${token}`}
        });
        dispatch({type : CREATE_PRODUCTS_SUCCESS, payload : response.data});
    } catch (error) {
        dispatch({type : CREATE_PRODUCTS_FAIL, payload : error.response.data});
    }
};

export const UPDATE_PRODUCT_SUCCESS = 'UPDATE_PRODUCT_SUCCESS';
export const UPDATE_PRODUCT_FAIL = 'UPDATE_PRODUCT_FAIL';

export const updateProduct = (productId, productData, token) => async (dispatch) => {
    try {
        const response = await axios.put(`https://one0xersbackend.onrender.com/api/products/${productId}`, productData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: UPDATE_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: UPDATE_PRODUCT_FAIL, payload: error.response.data });
    }
};

export const DELETE_PRODUCT_SUCCESS = 'DELETE_PRODUCT_SUCCESS';
export const DELETE_PRODUCT_FAIL = 'DELETE_PRODUCT_FAIL';

export const deleteProduct = (productId, token) => async (dispatch) => {
    try {
        const response = await axios.delete(`https://one0xersbackend.onrender.com/api/products/${productId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.response.data });
    }
};
