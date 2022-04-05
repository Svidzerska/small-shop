import React from 'react';
import './App.scss';

import Menu from './components/Menu';
import Search from './components/Search';



function App() {
  return (
    <div className="App container border border-1 border-dark">
      <Menu/>
      <Search/>
    </div>
  );
}

export default App;
