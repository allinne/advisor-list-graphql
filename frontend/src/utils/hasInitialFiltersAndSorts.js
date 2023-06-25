import { INITIAL_SORTING, INITIAL_FILTERING } from '../constants';

function hasInitialFiltersAndSorts({ currentSorting, currentFiltering }) {
  const hasInitialFilters =
    currentFiltering['status'] === INITIAL_FILTERING.status &&
    currentFiltering['language'] === INITIAL_FILTERING.language;
  const hasInitialSort = currentSorting['byReviews'] === INITIAL_SORTING.byReviews;

  return hasInitialFilters && hasInitialSort;
}

export default hasInitialFiltersAndSorts;
