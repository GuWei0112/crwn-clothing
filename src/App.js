import React, { useState, useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux'
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shoppage/shop.component'
import Header from './components/header/header.component'
import SignIn from './pages/sign-in-out/sign-in-out.component'
import { Route, Switch, Redirect } from 'react-router-dom'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { setCurrentUser } from './redux/user/user.action'
const App = ({ setCurrentUser, currentUser }) => {

  let unsubscribeFromAuth = null

  useEffect(() => {

    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
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
  }, [unsubscribeFromAuth])

  return (
    <div >
      <Header />
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/signin'
          render={() => currentUser ?
            (<Redirect to='/' />)
            :
            (<SignIn />)} />
      </Switch>
    </div>
  );
}

const mapStateToProps = ({ user }) => {
  return { currentUser: user.currentUser };
};

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
