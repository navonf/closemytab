import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { MemoryRouter } from 'react-router';

import Map from './components/Map';
import Home from './components/Home';

const App = () => {
  document.body.style.backgroundColor = "#202424";
  return (
    <MemoryRouter>
      <Fragment>
        <Route exact path="/" component={Home} />
        <Route path="/map" component={Map} />
      </Fragment>
    </MemoryRouter>
  );
}

export default App;
