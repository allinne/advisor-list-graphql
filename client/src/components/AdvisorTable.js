import { useEffect, useContext, useState, useRef } from 'react';
import axios from 'axios';
import { CurrentSortingContext, CurrentFilteringContext } from '../contexts/index';
import { LANGUAGES, ENDPOINT, FUNC_STUB } from '../constants';
import { infinityAdvisorsQuery } from '../queries';
import AdvisorList from "./AdvisorList";
import SortReview from './SortReview';
import FilterLanguage from './FilterLanguage';
import FilterStatus from './FilterStatus';
import { withFilterSelect } from '../HOC/withFilterSelect';

const FilterStatusComponent = withFilterSelect(FilterStatus);
const FilterLanguageComponent = withFilterSelect(FilterLanguage);

function AdvisorTable() {
  const [ advisors, setAdvisors ] = useState([]);
  const observerTarget = useRef(null);
  const [ isLoading, setIsLoading ] = useState(false);
  let pageInfo = useRef({ hasNextPage: false, startCursor: '' });

  useEffect(() => {
    let isFetched = false;
    let currentObserverTarget = observerTarget;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && pageInfo.current.hasNextPage) {
          fetchData();
        }
      },
      { threshold: 1 }
    );
  
    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    async function fetchData() {
      setIsLoading(true);

      const response = await axios({
        url: ENDPOINT,
        method: "POST",
        data: {
          query: infinityAdvisorsQuery(pageInfo.current.startCursor)
        }
      });
      const data = await response.data.data.getInfinityAdvisors;
      pageInfo.current = data.pageInfo;

      if (!isFetched) {
        setAdvisors(prev => [
          ...prev,
          ...data.edges
        ]);
        setIsLoading(false);
    }
    }
    fetchData();

    return () => {
      isFetched = true;
      if (currentObserverTarget.current) {
        observer.unobserve(currentObserverTarget.current);
      }
    };
  }, [observerTarget, pageInfo]);

  const { currentSorting } = useContext(CurrentSortingContext);
  const { currentFiltering } = useContext(CurrentFilteringContext);

  let filteredByLanguageAdvisors = [];
  if (LANGUAGES.includes(currentFiltering['language'])) {
    filteredByLanguageAdvisors = (advisors || []).filter(el => el.node.language === currentFiltering['language']);
  } else {
    filteredByLanguageAdvisors = advisors || [];
  }

  let filteredByStatusAdvisors = [];
  if (currentFiltering['status'] === 0) {
    filteredByStatusAdvisors = filteredByLanguageAdvisors;
  } else {
    filteredByStatusAdvisors = filteredByLanguageAdvisors.filter(el => el.node.status === currentFiltering['status']);
  }

  let sortedAdvisors = [];
  switch (currentSorting['byReviews']) {
    case 'asc':
      sortedAdvisors = [...filteredByStatusAdvisors].sort((a, b) => a.node.reviewNumber - b.node.reviewNumber);
      break;
    case 'desc':
      sortedAdvisors = [...filteredByStatusAdvisors].sort((a, b) => b.node.reviewNumber - a.node.reviewNumber);
      break;
    case '':
    default:
      sortedAdvisors = filteredByStatusAdvisors;
  }

  return (
    <>
    <table className='advisor-table' cellPadding={0} cellSpacing={0}>
      <thead className='advisor-table__head'>
        <tr>
          <td>Advisor</td>
          <FilterStatusComponent createSelectElement={FUNC_STUB}/>
          <FilterLanguageComponent createSelectElement={FUNC_STUB}/>
          <SortReview/>
        </tr>
      </thead>
      <AdvisorList advisors={sortedAdvisors}/>
    </table>
    <div ref={observerTarget}>{isLoading && 'Loading...'}</div>
    </>
  )
}

export default AdvisorTable;
