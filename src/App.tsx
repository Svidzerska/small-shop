import React from 'react';

import './App.scss';

import Header from './components/main_screen/header/Header';
import Search from './components/main_screen/search/Search';
import Cards from './components/main_screen/cards/Cards';

const App:React.FC = ():JSX.Element => {
   return (
      <>
         <Header />
         <main>
            <Search />
            <Cards />
         </main>
      </>
   );
}

export default App;
