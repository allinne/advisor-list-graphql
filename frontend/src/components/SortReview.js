import { useContext } from 'react';
import { CurrentSortingContext } from '../contexts/index';

function SortReview() {
  const { currentSorting, setCurrentSorting } = useContext(CurrentSortingContext);

  const handleButtonClick = () => {
    const sortByReviews = currentSorting.byReviews === 'desc' ? 'asc' : 'desc';
    setCurrentSorting({ ...currentSorting, byReviews: sortByReviews });
  };

  return (
    <td
      className="advisor-table__head-sort"
      onClick={handleButtonClick}
      role='button'
      data-sort-direction={currentSorting.byReviews}
      data-testid="filter-reviews"
      aria-label='Sort by Review number'
    >
      <div className={`advisor-table__sort advisor-table__sort--${currentSorting.byReviews}`}>
        reviews
      </div>
    </td>
  )
}

export default SortReview;
