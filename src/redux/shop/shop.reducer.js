import ShopActionTypes from './shop.type'

const INITIAL_STATE = {
    collections: null,
    isFetching: false,
    errorMsg: undefined
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ShopActionTypes.FETCH_COLLECTIONS_START:
            return {
                ...state,
                isFetching: true
            }
        case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                collections: action.payload
            }
        case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMsg: action.payload
            }
        default:
            return state
    }
}