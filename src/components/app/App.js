import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/appHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const SingleCharPage = lazy(() => import("../pages/SingleCharPage"));

export const URLS = {
  main: "marvel/",
  comics: "marvel/comics",
  comicID: "marvel/comics/:comicId",
  charactersID: "marvel/characters/:charId",
};

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path={`${URLS.main}`} element={<MainPage />} />
              <Route path={`${URLS.comics}`} element={<ComicsPage />} />
              <Route path={`${URLS.comicID}`} element={<SingleComicPage />} />
              <Route path={`${URLS.charactersID}`} element={<SingleCharPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
