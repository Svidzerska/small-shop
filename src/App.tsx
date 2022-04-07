import React from 'react';
import './App.scss';

import Menu from './components/main_screen/menu/Menu';
import Search from './components/main_screen/search/Search';




function App() {
  return (
    <div className="App">
      <Menu/>
      <Search/>
    </div>
  );
}

export default App;
