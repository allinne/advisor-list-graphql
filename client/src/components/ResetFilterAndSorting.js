import { useContext } from "react";
import hasInitialFiltersAndSorts from '../utils/useInitialFilteringAndSorting';
import { CurrentSortingContext, CurrentFilteringContext } from '../contexts/index';
import { INITIAL_SORTING, INITIAL_FILTERING } from '../constants';

function ResetFilterAndSorting() {
  const { currentSorting, setCurrentSorting } = useContext(CurrentSortingContext);
  const { currentFiltering, setCurrentFiltering } = useContext(CurrentFilteringContext);

  function handleButtonClick() {
    setCurrentFiltering(INITIAL_FILTERING);
    setCurrentSorting(INITIAL_SORTING);
  }

  const isDisabled = hasInitialFiltersAndSorts({ currentSorting, currentFiltering });

  return (
    <div className="reset-filters-sorting">
      <button
        onClick={handleButtonClick}
        disabled={isDisabled}
        className="reset-filters-sorting__button"
      >
        Reset filtering and sorting
      </button>
    </div>
  )
}

export default ResetFilterAndSorting;
