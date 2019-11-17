import React, { useState, useEffect } from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from './pages/shoppage/shop.component'
import Header from './components/header/header.component'
import SignIn from './pages/sign-in-out/sign-in-out.component'
import { Route, Switch } from 'react-router-dom'
import { auth } from './firebase/firebase.utils'
function App() {
  const [state, setState] = useState({
    currentUser: null
  })

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setState(prevState => { return { ...prevState, 'currentUser': user } })
    })
  }, [])
  return (
    <div >
      <Header />
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/shop' component={ShopPage} />
        <Route path='/signin' component={SignIn} />
      </Switch>
    </div>
  );
}

export default App;
