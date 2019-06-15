import React from 'react';
import styles from './App.module.scss';

import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults';

const App: React.FC = () => {
  return (
    <div className={styles.App}>
        <SearchBar/>
        <SearchResults/>
    </div>
  );
}

export default App;
