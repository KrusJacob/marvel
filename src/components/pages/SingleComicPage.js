import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import useMarvelService from "../../services/MarvelService";

import AppBanner from "../appBanner/appBanner";
import setContent from "../../utils/setContent";
import "./singleComicPage.scss";

const SingleComicPage = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const { getComic, clearError, process, setProcess } = useMarvelService();

  const updateComic = () => {
    clearError();
    getComic(comicId)
      .then(onComicLoaded)
      .then(() => setProcess("confirmed"));
  };

  useEffect(() => {
    updateComic();
  }, [comicId]);

  const onComicLoaded = (comic) => {
    setComic(comic);
  };

  return (
    <>
      <AppBanner />
      {setContent(process, View, comic)}
    </>
  );
};

const View = ({ data }) => {
  const { title, description, thumbnail, pages, price, language } = data;
  return (
    <div className="single__comic">
      <Helmet>
        <meta name="description" content={`${title} comics book`} />
        <title>{title}</title>
      </Helmet>

      <img src={thumbnail} alt={title} />
      <div className="comic__text">
        <h2 className="comic__title">{title}</h2>
        <p className="comic__descr">{description}</p>
        <p className="comic__page">{pages} pages</p>
        <p className="comic__language">{language}</p>
        <p className="comic__price">{price}</p>
      </div>

      <Link className="comic__back" to="/comics">
        Back to all
      </Link>
    </div>
  );
};

export default SingleComicPage;
