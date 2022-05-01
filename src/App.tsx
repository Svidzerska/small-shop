import React from 'react';

import './App.scss';

import Menu from './components/main_screen/menu/Menu';
import Search from './components/main_screen/search/Search';
import Cards from './components/main_screen/cards/Cards';

const App:React.FC = ():JSX.Element => {
   return (
      <>
         <Menu />
         <main>
            <Search />
            <Cards />
         </main>
      </>
   );
}

export default App;
