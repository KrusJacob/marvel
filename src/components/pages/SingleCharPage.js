import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import useMarvelService from "../../services/MarvelService";

import AppBanner from "../appBanner/appBanner";
import setContent from "../../utils/setContent";
import "./singleComicPage.scss";

const SingleCharPage = () => {
  const { charId } = useParams();
  const [char, setChar] = useState(null);
  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  const updateChar = () => {
    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  useEffect(() => {
    updateChar();
  }, [charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  return (
    <>
      <AppBanner />
      {setContent(process, View, char)}
    </>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail } = data;
  return (
    <div className="single__comic">
      <Helmet>
        <meta name="description" content={`${name} page`} />
        <title>{name}</title>
      </Helmet>
      <img src={thumbnail} alt={name} />
      <div className="comic__text">
        <h2 className="comic__title">{name}</h2>
        <p className="comic__descr">{description}</p>
      </div>

      <Link className="comic__back" to="/">
        Back to all
      </Link>
    </div>
  );
};

export default SingleCharPage;
