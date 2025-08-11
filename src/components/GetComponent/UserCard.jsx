import React from 'react';

import s from './GetComponent.module.css';

export const UserCard = ({ user }) => {
  return (
    <li key={user.id} className={s.userCard}>
      <img src={user.photo} alt={user.name} className={s.photo} />
      <p>{user.name}</p>
      <p>{user.position}</p>
      <p>{user.email}</p>
      <p>{user.phone}</p>
    </li>
  );
};
