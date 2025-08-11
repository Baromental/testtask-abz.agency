import React from 'react';
import { Form } from 'components/Form/Form';

import s from './PostComponent.module.css';

export const PostComponent = () => {
  return (
    <div className={s.postContainer}>
      <h2 className={s.title}>Working with POST request</h2>
      <Form />
    </div>
  );
};
