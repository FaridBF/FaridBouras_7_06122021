import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/home' component={Home} />
            <Route path='/profile' component={Profile} />
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default App;
