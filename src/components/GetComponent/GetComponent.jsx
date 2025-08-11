import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../redux/user/slice';
import { fetchUsers } from '../../redux/user/operations';

import s from './GetComponent.module.css';
import { UserCard } from './UserCard';

export const GetComponent = () => {
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  console.log(users);

  useEffect(() => {
    dispatch(fetchUsers({ page: 1, count: 6 }));
  }, [dispatch]);

  const handleShowMore = () => {
    if (users.page < users.total_pages) {
      dispatch(fetchUsers({ page: users.page + 1, count: 6 }));
    }
  };

  return (
    <div className={s.getContainer}>
      <h2 className={s.title}>Working with GET request</h2>
      <ul className={s.list}>
        {users.items.map(user => (
          <UserCard user={user} key={user.id} />
        ))}
      </ul>
      <button className={s.button} onClick={handleShowMore}>
        Show more
      </button>
    </div>
  );
};
