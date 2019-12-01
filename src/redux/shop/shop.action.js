import ShopActionTypes from './shop.type'
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
export const fetchCollectionStart = () => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_START
})

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = errMsg => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errMsg
})

export const fetchCollecitonStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection("colletions");
        dispatch(fetchCollectionStart()) // because of redux-thunk
        collectionRef.get().then(async snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            dispatch(fetchCollectionsSuccess(collectionsMap))
        }).catch(error => dispatch(fetchCollectionsFailure(error.message)));
    }
}