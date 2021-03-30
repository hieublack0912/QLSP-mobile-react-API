import * as Types from './../constants/ActionTypes';
import callApi from './../utils/apiCaller';

export const actFetchProductsRequest = () => {
    return (dispatch) => {
        return callApi('products', 'GET', null).then(res => {
            dispatch(actFetchProducts(res.data));
        });
    }
}

export const actFetchProducts = (products) => {
    return {
        type : Types.FETCH_PRODUCTS,
        products
    }
}

export const actDeleteProductsRequest = (id) => {
    return (dispatch) => {
        return callApi(`products/${id}`, 'DELETE', null).then(res => {
            dispatch(actDeleteProducts(id));
        });
    }
}

export const actDeleteProducts = (id) => {
    return {
        type : Types.DELETE_PRODUCTS,
        id
    }
}

export const actAddProductsRequest = (product) => {
    return (dispatch) => {
        return callApi('products', 'POST', product).then(res => {
            dispatch(actAddProducts(res.data));
        });
    }
}

export const actAddProducts = (product) => {
    return {
        type : Types.ADD_PRODUCTS,
        product
    }
}

export const actGetProductsRequest = (id) => {
    return (dispatch) => {
        return callApi(`products/${id}`, 'GET', null).then(res => {
            dispatch(actGetProducts(res.data));
        });
    }
}

export const actGetProducts = (product) => {
    return {
        type : Types.EDIT_PRODUCTS,
        product
    }
}

export const actUpdateProductsRequest = (product) => {
    return (dispatch) => {
        return callApi(`products/${product.id}`, 'PUT', product).then(res => {
            dispatch(actUpdateProducts(res.data));
        });
    }
}

export const actUpdateProducts = (product) => {
    return {
        type : Types.UPDATE_PRODUCTS,
        product
    }
}