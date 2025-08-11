import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPositions, registerUser } from '../../redux/user/operations';
import { ReactComponent as SuccessIcon } from '../../images/success-image.svg';
import s from './Form.module.css';

export const Form = () => {
  const dispatch = useDispatch();
  const { items: positions, loading: positionsLoading } = useSelector(
    state => state.users.positions
  );
  const registerState = useSelector(state => state.users.register);

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      position_id: '',
      photoFile: null,
    },
  });

  useEffect(() => {
    dispatch(fetchPositions());
  }, [dispatch]);

  const onSubmit = data => {
    dispatch(
      registerUser({
        ...data,
        photoFile: data.photoFile[0],
      })
    );
  };

  if (registerState.success) {
    return (
      <div className={s.successContainer}>
        <SuccessIcon className={s.successIcon} />
      </div>
    );
  }

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={s.inputTextContainer}>
          <div className={s.inputContainer}>
            <input
              className={s.input}
              type="text"
              placeholder="Your name"
              {...register('name', { required: true })}
            />
            <input
              className={s.input}
              type="email"
              placeholder="Email"
              {...register('email', { required: true })}
            />
            <input
              className={s.input}
              type="tel"
              placeholder="Phone"
              {...register('phone', { required: true })}
            />
          </div>
          <p className={s.labelPhone}>+38 (XXX) XXX - XX - XX</p>
        </div>

        <fieldset className={s.fieldset} aria-labelledby="position-label">
          <p id="position-label" className={s.label}>
            Select your position
          </p>
          {positionsLoading && <p>Loading positions...</p>}
          {positions.map(pos => (
            <div key={pos.id} className={s.radioContainer}>
              <input
                className={s.radioButton}
                type="radio"
                id={`pos-${pos.id}`}
                value={pos.id}
                {...register('position_id', { required: true })}
              />
              <label className={s.label} htmlFor={`pos-${pos.id}`}>
                {pos.name}
              </label>
            </div>
          ))}
        </fieldset>

        <div className={s.uploadContainer}>
          <label htmlFor="photo" className={s.uploadButton}>
            Upload
          </label>
          <input
            type="file"
            id="photo"
            accept="image/*"
            {...register('photoFile')}
            className={s.fileInput}
          />
          <span className={s.uploadText}>Upload your photo</span>
        </div>

        <button
          type="submit"
          className={s.button}
          disabled={!isValid || registerState.loading}
        >
          {registerState.loading ? 'Submitting...' : 'Sign up'}
        </button>
      </form>
    </div>
  );
};
