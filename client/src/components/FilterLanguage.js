import { useContext, useMemo } from 'react';
import { CurrentFilteringContext } from '../contexts/index';
import { LANGUAGES } from '../constants';

function FilterLanguage(props) {
  const { currentFiltering, setCurrentFiltering } = useContext(CurrentFilteringContext);

  const languageList = useMemo(() => {
    return ['all', ...LANGUAGES];
  }, []);
  const languages = languageList.map((el, i) => {
    return (
      <option value={i} key={i} data-testid="select-language-option">
        {el}
      </option>
    );
  });

  const currentValue = useMemo(() => {
    return languageList.findIndex((language) => language === currentFiltering.language);
  }, [languageList, currentFiltering.language]);

  const handleSelectChange = (ev) => {
    setCurrentFiltering({ ...currentFiltering, language: languageList[Number(ev.currentTarget.value)] });
  };

  const selectElement = props.createSelectElement({
    selectType: 'language',
    optionList: languages,
    currentValue,
    handleSelectChange
  });

  return selectElement;
}

export default FilterLanguage;
