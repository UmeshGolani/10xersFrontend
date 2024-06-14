import {
    GET_PRODUCTS_REQUEST,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    CREATE_PRODUCTS_SUCCESS,
    CREATE_PRODUCTS_FAIL,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_FAIL,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL
} from '../Actions/productActions'

const initialState = {
    products: [],
    loading: false,
    error: null
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_PRODUCTS_REQUEST:
            return {
                ...state,
                loading: true
            };

        case GET_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload,
                loading: false,
                error: null
            };

        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                error: action.payload,
                products: [],
                loading: false
            };

        case CREATE_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: [...state.products, action.payload],
                loading: false,
                error: null
            };

        case CREATE_PRODUCTS_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case UPDATE_PRODUCT_SUCCESS:
            // Find the index of the updated product in the array
            const updatedIndex = state.products.findIndex(product => product._id === action.payload._id);
            // Create a new array with updated product data
            const updatedProducts = [...state.products];
            updatedProducts[updatedIndex] = action.payload; // Replace old product data with updated data
            return {
                ...state,
                products: updatedProducts,
                loading: false,
                error: null
            };

        case UPDATE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        case DELETE_PRODUCT_SUCCESS:
            // Filter out the deleted product from the array
            const filteredProducts = state.products.filter(product => product._id !== action.payload._id);
            return {
                ...state,
                products: filteredProducts,
                loading: false,
                error: null
            };

        case DELETE_PRODUCT_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            };

        default:
            return state;
    }
};

export default productReducer;
