import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import Profile from './components/Profile';

const App = () => {
  return (
    <Router>
      <Switch>
        {/* futur HEADER component */}
        <Route exact path='/' component={Home} />
        <Route path='/profile' component={Profile} />
        {/* futur FOOTER component */}
      </Switch>
    </Router>
  );
};

export default App;
