import React from 'react';
import { AVAILABILITY_STATUS_LIST } from '../constants';

const AdvisorPreview = ({ advisor }) => {
  const statusClassName = `advisor-item__status advisor-item__status--${AVAILABILITY_STATUS_LIST[advisor.status]}`;

  return (
    <tr data-testid="advisor-item" className='advisor-item'>
      <td data-testid="advisor-name" className='advisor-item__name'>
        {advisor.name}
      </td>
      <td
        className={statusClassName}
        data-testid="advisor-status"
      ></td>
      <td data-testid="advisor-language" className='advisor-item__language'>
        {advisor.language}
      </td>
      <td data-testid="advisor-reviews" className='advisor-item__reviews'>
        {advisor.reviewNumber}
      </td>
    </tr>
  )
}

export default AdvisorPreview;
