import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './components/Home';

const App = () => {
  document.body.style.backgroundColor = "#282c34";
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
    </BrowserRouter>
  );
}

export default App;
