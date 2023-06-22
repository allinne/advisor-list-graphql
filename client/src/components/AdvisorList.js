import { useEffect, useContext, useState } from 'react';
import axios from 'axios';
import { CurrentSortingContext, CurrentFilteringContext } from '../contexts/index';
import { LANGUAGES } from '../constants';

import AdvisorPreview from './AdvisorPreview';

function AdvisorList() {
  const [ advisors, setAdvisors ] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await axios.get('/api/advisors');
      const data = response.data;
      setAdvisors(data);
    }
    loadData();
  }, []);

  const { currentSorting } = useContext(CurrentSortingContext);
  const { currentFiltering } = useContext(CurrentFilteringContext);

  let filteredByLanguageAdvisors = [];
  if (LANGUAGES.includes(currentFiltering['language'])) {
    filteredByLanguageAdvisors = advisors.filter(el => el.language === currentFiltering['language']);
  } else {
    filteredByLanguageAdvisors = advisors;
  }

  let filteredByStatusAdvisors = [];
  if (currentFiltering['status'] === 0) {
    filteredByStatusAdvisors = filteredByLanguageAdvisors;
  } else {
    filteredByStatusAdvisors = filteredByLanguageAdvisors.filter(el => el.status === currentFiltering['status']);
  }

  let sortedAdvisors = [];
  switch (currentSorting['byReviews']) {
    case 'asc':
      sortedAdvisors = [...filteredByStatusAdvisors].sort((a, b) => a.reviewNumber - b.reviewNumber);
      break;
    case 'desc':
      sortedAdvisors = [...filteredByStatusAdvisors].sort((a, b) => b.reviewNumber - a.reviewNumber);
      break;
    case '':
    default:
      sortedAdvisors = filteredByStatusAdvisors;
  }

  return (
    <tbody>
      {sortedAdvisors.map((el) => {
        return <AdvisorPreview key={el.id} advisor={el}/>
      })}
    </tbody>
  )
}

export default AdvisorList;
