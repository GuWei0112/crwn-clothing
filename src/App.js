import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import CheckoutPage from './pages/checkout/checkout.component'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shoppage/shop.component'
import Header from './components/header/header.component'
import SignIn from './pages/sign-in-out/sign-in-out.component'

import { Route, Switch, Redirect } from 'react-router-dom'
import { selectCurrentUser } from './redux/user/user.selector'
import { checkUserSession } from './redux/user/user.action'
const App = ({ currentUser, checkUserSession }) => {

  let unsubscribeFromAuth = null

  useEffect(() => {
    checkUserSession()
    // unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
    //   if (userAuth) {/* EXISTS */
    //     const userRef = await createUserProfileDocument(userAuth) /* document ref */

    //     userRef.onSnapshot(snapShot => { /* document snapshot */
    //       setCurrentUser({
    //         id: snapShot.id,
    //         ...snapShot.data()
    //       })
    //     })
    //   }
    //   else {
    //     setCurrentUser(userAuth)
    //   }
    // })
    return () => {
      unsubscribeFromAuth();
    } /*ComponentWillUnMount */
  }, [unsubscribeFromAuth])

  return (
    <div >
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} exact />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin'
          render={() => currentUser ?
            (<Redirect to='/' />)
            :
            (<SignIn />)} />
      </Switch>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
