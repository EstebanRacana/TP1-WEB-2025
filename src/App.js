import React, { useState } from 'react';
import IndexPage from './components/IndexPage';
import AdivinaPage from './components/AdivinaPage';
import Minijuego2Page from './components/Minijuego2Page';
import Minijuego3Page from './components/Minijuego3Page';

const App = () => {
  const [currentPage, setCurrentPage] = useState('index');

  const renderPage = () => {
    switch(currentPage) {
      case 'adivina':
        return <AdivinaPage setCurrentPage={setCurrentPage} />;
      case 'minijuego_2':
        return <Minijuego2Page setCurrentPage={setCurrentPage} />;
      case 'minijuego_3':
        return <Minijuego3Page setCurrentPage={setCurrentPage} />;
      default:
        return <IndexPage setCurrentPage={setCurrentPage} />;
    }
  };

  return <>{renderPage()}</>;
};

export default App;