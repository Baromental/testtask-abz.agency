import React from 'react';

export const PostComponent = () => {
  return (
    <div>
      <h2>Working with POST request</h2>
      <form action="">
        <div>
          <input type="text" placeholder="" />
          <input type="text" placeholder="" />
          <input type="text" placeholder="" />
        </div>
        <fieldset>
          <legend>Select your position</legend>

          <input type="radio" id="frontend" name="position" value="frontend" />
          <label htmlFor="frontend">Frontend developer</label>

          <input type="radio" id="backend" name="position" value="backend" />
          <label htmlFor="backend">Backend developer</label>

          <input type="radio" id="designer" name="position" value="designer" />
          <label htmlFor="designer">Designer</label>

          <input type="radio" id="qa" name="position" value="qa" />
          <label htmlFor="qa">QA</label>
        </fieldset>
        <button>Sign up</button>
      </form>
    </div>
  );
};
