import React from 'react';
import './popup.scss';

import Header from './header/Header';
import SettingsPanel from './settingsPanel/SettingsPanel';
import Categories from './categories/Categories';

const Popup:React.FC = ():JSX.Element => {
   return (
      <div className="popup">
         <Header />
         <SettingsPanel />
         <Categories />
      </div>
   )
}

export default Popup;