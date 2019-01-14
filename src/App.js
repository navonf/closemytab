import React, { Fragment } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Map from './components/Map';
import Home from './components/Home';

const App = () => {
  document.body.style.backgroundColor = "#202424";
  return (
    <BrowserRouter>
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/map" component={Map} />
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
