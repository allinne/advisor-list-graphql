import { useState } from 'react';
import AdvisorTable from './components/AdvisorTable';
import { CurrentSortingContext, CurrentFilteringContext } from './contexts';
import { INITIAL_SORTING, INITIAL_FILTERING } from './constants';
import './App.css';

function App() {
  const [ currentSorting, setCurrentSorting ] = useState(INITIAL_SORTING);
  const [ currentFiltering, setCurrentFiltering ] = useState(INITIAL_FILTERING);

  return (
    <div className='content'>
      <h1>Advisors</h1>
      <CurrentSortingContext.Provider value={{ currentSorting, setCurrentSorting }}>
        <CurrentFilteringContext.Provider value={{ currentFiltering, setCurrentFiltering }}>
          <AdvisorTable/>
        </CurrentFilteringContext.Provider>
      </CurrentSortingContext.Provider>
    </div>
  );
}

export default App;
