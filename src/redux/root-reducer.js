import { combineReducers } from 'redux'
import cartReducer from './cart/cart.reducer'
import UserReducer from './user/user.reducer'

export default combineReducers({
    user: UserReducer,
    cart: cartReducer
})