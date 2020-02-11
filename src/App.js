import React from 'react';

import {Route} from 'react-router-dom';
import WritePage from './pages/WritePage';
import mainPage from './pages/mainPage';
import GraphPage from './pages/GraphPage';


function App() {
  return (
    <>
    <Route component={WritePage} path="/write"  />
    <Route component={mainPage} path="/" />
    <Route component={GraphPage} path="/graph" />

    </>
    
  );
}

export default App;
