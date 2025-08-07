import { GetComponent } from 'components/GetComponent/GetComponent';
import { PostComponent } from 'components/PostComponent/PostComponent';
import { TitleComponent } from 'components/TitleComponent/TitleComponent';
import React from 'react';

export const MainPage = () => {
  return (
    <div>
      <TitleComponent />
      <GetComponent />
      <PostComponent />
    </div>
  );
};
