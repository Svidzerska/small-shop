import React from 'react';
import './App.scss';

import Menu from './components/main_screen/menu/Menu';
import Search from './components/main_screen/search/Search';
import Cards from './components/main_screen/cards/Cards'




function App() {
  return (
    <div className="App">
      <Menu/>
      <Search/>
      <Cards/>
    </div>
  );
}

export default App;
