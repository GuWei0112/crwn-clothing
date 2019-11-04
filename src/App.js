import React from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component'
import { Route, Switch } from 'react-router-dom'
function App() {
  return (
    <div >
      <Switch>
        <Route path='/' component={HomePage} exact />
      </Switch>
    </div>
  );
}

export default App;
