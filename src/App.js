import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shoppage/shop.component'
import Header from './components/header/header.component'
import SignIn from './pages/sign-in-out/sign-in-out.component'
import { Route, Switch } from 'react-router-dom'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
function App() {
  const [state, setState] = useState({
    currentUser: null
  })

  let unsubscribeFromAuth = null

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {/* EXISTS */
        const userRef = await createUserProfileDocument(userAuth) /* document ref */

        userRef.onSnapshot(snapShot => { /* document snapshot */
          setState(prevState => {
            return {
              ...prevState, 'currentUser': {
                id: snapShot.id,
                ...snapShot.data()
              }
            }
          })
        })
      }
      else {
        setState(prevState => {/* NULL */
          return {
            ...prevState, 'currentUser': userAuth
          }
        })
      }
    })

    return () => { unsubscribeFromAuth() } /*ComponentWillUnMount */
  }, [])

  return (
    <div >
      <Header currentUser={state.currentUser} />
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignIn} />
      </Switch>
    </div>
  );
}

export default App;
