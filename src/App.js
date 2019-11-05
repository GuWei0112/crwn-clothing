import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import ShopPage from'./pages/shoppage/shop.component'
import { Route, Switch } from 'react-router-dom'
function App() {
  return (
    <div >
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/shop' component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
