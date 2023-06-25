export function withFilterSelect(WrappedComponent) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name;

  const ComponentFilterSelect = (props) => {
    const createSelectElement = ({
      selectType,
      optionList,
      currentValue,
      handleSelectChange
    }) => {
      return (
        <td>
          <div className="advisor-table__head-filter">
            <label htmlFor={`select-${selectType}`}>
              {selectType}
            </label>
            <select
              onChange={handleSelectChange}
              value={currentValue}
              className="advisor-table__select"
              id={`select-${selectType}`}
              data-testid={`select-${selectType}`}
              aria-label={`Filter by ${selectType}`}
            >
              {optionList}
            </select>
          </div>
        </td>
      )
    };

    return (
      <WrappedComponent
        {...props}
        createSelectElement={createSelectElement}
      />
    );
  };

  ComponentFilterSelect.displayName = `withFilterSelect(${displayName})`;

  return ComponentFilterSelect;
}
