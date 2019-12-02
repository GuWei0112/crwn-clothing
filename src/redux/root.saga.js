import { all, call } from 'redux-saga/effects'
import { fetchCollectionStart } from './shop/shop.saga'
import { userSagas } from './user/user.saga'
import { cartSagas } from './cart/cart.saga'
import { shopSagas } from './shop/shop.saga'

export default function* rootSaga() {
    yield all([
        call(fetchCollectionStart),
        call(userSagas),
        call(cartSagas),
        call(shopSagas)
    ])
}