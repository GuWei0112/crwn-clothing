import { takeLatest, call, put, all } from 'redux-saga/effects'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.action'
import ShopActioTypes from './shop.type'

export function* fetchCollectionAsync() {
    try {
        const collectionRef = firestore.collection("colletions");
        const snapshot = yield collectionRef.get()
        const collectionMap = yield call(convertCollectionsSnapshotToMap, snapshot)
        yield put(fetchCollectionsSuccess(collectionMap))
    } catch (error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionStart() {
    yield takeLatest(ShopActioTypes.FETCH_COLLECTIONS_START, fetchCollectionAsync)
}

export function* shopSagas() {
    yield all([call(fetchCollectionStart)])
}