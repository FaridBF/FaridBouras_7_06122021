import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import Admin from './components/Admin';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

// ajout de la librairie des icônes
library.add(fas);

const App = () => {
  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <Router>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/home' component={Home} />
            <Route path='/profile' component={Profile} />
            <Route path='/admin' component={Admin} />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
