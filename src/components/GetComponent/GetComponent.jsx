import React from 'react';
import s from './GetComponent.module.css';

export const GetComponent = () => {
  return (
    <div className={s.getContainer}>
      <h2 className={s.title}>Working with GET request</h2>
      <ul className={s.list}></ul>
      <button className={s.button}>Show more</button>
    </div>
  );
};
