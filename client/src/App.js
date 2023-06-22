import { useState } from 'react';
import AdvisorList from "./components/AdvisorList";
import SortReview from './components/SortReview';
import FilterLanguage from './components/FilterLanguage';
import FilterStatus from './components/FilterStatus';
import { withFilterSelect } from './HOC/withFilterSelect';
import { CurrentSortingContext, CurrentFilteringContext } from './contexts';
import { INITIAL_SORTING, INITIAL_FILTERING, FUNC_STUB } from './constants';
import './App.css';

const FilterStatusComponent = withFilterSelect(FilterStatus);
const FilterLanguageComponent = withFilterSelect(FilterLanguage);

function App() {

  const [ currentSorting, setCurrentSorting ] = useState(INITIAL_SORTING);
  const [ currentFiltering, setCurrentFiltering ] = useState(INITIAL_FILTERING);

  return (
    <div className='content'>
      <h1>Advisors</h1>
      <CurrentSortingContext.Provider value={{ currentSorting, setCurrentSorting }}>
        <CurrentFilteringContext.Provider value={{ currentFiltering, setCurrentFiltering }}>
          <table className='advisor-table' cellPadding={0} cellSpacing={0}>
            <thead className='advisor-table__head'>
              <tr>
                <td>Advisor</td>
                <FilterStatusComponent createSelectElement={FUNC_STUB}/>
                <FilterLanguageComponent createSelectElement={FUNC_STUB}/>
                <SortReview/>
              </tr>
            </thead>
            <AdvisorList/>
          </table>
        </CurrentFilteringContext.Provider>
      </CurrentSortingContext.Provider>
    </div>
  );
}

export default App;
