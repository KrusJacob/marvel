import { Helmet } from "react-helmet";

import AppBanner from "../appBanner/appBanner";
import ComicList from "../comicList/comicList";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of our comics" />
        <title>Comics page</title>
      </Helmet>
      <AppBanner />
      <ComicList />
    </>
  );
};

export default ComicsPage;
