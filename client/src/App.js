import React, { useEffect, lazy, Suspense } from 'react';

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
//import CheckoutPage from './pages/checkout/checkout.component'
//import HomePage from './pages/homepage/homepage.component'
//import ShopPage from './pages/shoppage/shop.component'
import Header from './components/header/header.component'
//import SignIn from './pages/sign-in-out/sign-in-out.component'
import Spinner from './components/spinner/spinner.components'
import ErrorBoundary from './components/error-boundary/error-boundary.components'
import { Route, Switch, Redirect } from 'react-router-dom'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.action'
import { selectCurrentUser } from './redux/user/user.selector'

import { GlobalStyle } from './global.styles'

const HomePage = lazy(() => import('./pages/homepage/homepage.component'))
const ShopPage = lazy(() => import('./pages/shoppage/shop.component'))
const SignIn = lazy(() => import('./pages/sign-in-out/sign-in-out.component'))
const CheckoutPage = lazy(() => import('./pages/checkout/checkout.component'))
const App = ({ setCurrentUser, currentUser }) => {

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {/* EXISTS */
        const userRef = await createUserProfileDocument(userAuth) /* document ref */

        userRef.onSnapshot(snapShot => { /* document snapshot */
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      }
      else {
        setCurrentUser(userAuth)
      }
    })
    return () => {
      unsubscribeFromAuth();
    } /*ComponentWillUnMount */
  }, [])

  return (
    <div >
      <GlobalStyle />
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} exact />
            <Route path='/shop' component={ShopPage} />
            <Route exact path='/checkout' component={CheckoutPage} />
            <Route exact path='/signin'
              render={() => currentUser ?
                (<Redirect to='/' />)
                :
                (<SignIn />)} />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
