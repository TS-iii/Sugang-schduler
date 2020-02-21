import React from 'react';

import {Route} from 'react-router-dom';
import WritePage from './pages/WritePage';
import MainPage from './pages/MainPage';
import GraphPage from './pages/GraphPage';


function App() {
  return (
    <>
    <Route component={WritePage} path="/write"  />
    <Route component={MainPage} path={["/main","/"]} exact/>
    <Route component={GraphPage} path="/graph" />

    </>
    
  );
}

export default App;
