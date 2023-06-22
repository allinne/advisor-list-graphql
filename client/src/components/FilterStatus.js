import { useContext, useMemo } from 'react';
import { CurrentFilteringContext } from '../contexts/index';
import { AVAILABILITY_STATUS_LIST } from '../constants';

function FilterStatus(props) {
  const { currentFiltering, setCurrentFiltering } = useContext(CurrentFilteringContext);

  const statuses = useMemo(() => {
    return AVAILABILITY_STATUS_LIST.map((el) => {
      return (
        <option value={el} key={el} data-testid="select-status-option">
          {el}
        </option>
      );
    });
  }, []);

  const handleSelectChange = (ev) => {
    setCurrentFiltering({ ...currentFiltering, status: AVAILABILITY_STATUS_LIST.indexOf(ev.currentTarget.value)});
  };

  const currentValue = AVAILABILITY_STATUS_LIST[currentFiltering.status];

  const selectElement = props.createSelectElement({
    selectType: 'status',
    optionList: statuses,
    currentValue,
    handleSelectChange
  });

  return selectElement;
}

export default FilterStatus;
