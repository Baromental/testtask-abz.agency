import { Route, Routes } from 'react-router';
import { MainPage } from 'pages/MainPage/MainPage';
import { Layout } from 'components/Navbar/Layout';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
      </Route>
    </Routes>
  );
};
