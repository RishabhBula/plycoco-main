import React from 'react';

export const ErroredFieldComponent = (props: any) => {
  const { errors, touched } = props;
  return errors && touched ? (
    <div className='required-tooltip'>{errors}</div>
  ) : null;
};
