import React from 'react';

import s from './Form.module.css';

export const Form = () => {
  return (
    <div>
      <form className={s.form} action="">
        <div className={s.inputTextContainer}>
          <div className={s.inputContainer}>
            <input className={s.input} type="text" placeholder="Your name" />
            <input className={s.input} type="text" placeholder="Email" />
            <input className={s.input} type="text" placeholder="Phone" />
          </div>
          <p className={s.labelPhone}>+38 (XXX) XXX - XX - XX</p>
        </div>
        <fieldset className={s.fieldset} aria-labelledby="position-label">
          <p id="position-label" className={s.label}>
            Select your position
          </p>
          <div className={s.radioContainer}>
            <input
              className={s.radioButton}
              type="radio"
              id="frontend"
              name="position"
              value="frontend"
            />
            <label className={s.label} htmlFor="frontend">
              Frontend developer
            </label>
          </div>
          <div className={s.radioContainer}>
            <input
              className={s.radioButton}
              type="radio"
              id="backend"
              name="position"
              value="backend"
            />
            <label className={s.label} htmlFor="backend">
              Backend developer
            </label>
          </div>
          <div className={s.radioContainer}>
            <input
              className={s.radioButton}
              type="radio"
              id="designer"
              name="position"
              value="designer"
            />
            <label className={s.label} htmlFor="designer">
              Designer
            </label>
          </div>
          <div className={s.radioContainer}>
            <input
              className={s.radioButton}
              type="radio"
              id="qa"
              name="position"
              value="qa"
            />
            <label className={s.label} htmlFor="qa">
              QA
            </label>
          </div>
        </fieldset>
        <div className={s.uploadContainer}>
          <label htmlFor="photo" className={s.uploadButton}>
            Upload
          </label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            className={s.fileInput}
          />
          <span className={s.uploadText}>Upload your photo</span>
        </div>
        <button className={s.button}>Sign up</button>
      </form>
    </div>
  );
};
