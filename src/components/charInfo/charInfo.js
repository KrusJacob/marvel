import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; //

import "./charInfo.scss";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  const updateChar = () => {
    const { charId } = props;
    if (!charId) {
      return;
    }

    clearError();
    getCharacter(charId)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  useEffect(() => {
    updateChar();
  }, [props.charId]);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  // const skeleton = char || loading || error ? null : <Skeleton />;
  // const errorMessage = error ? <ErrorMessage /> : null;
  // const spinner = loading ? <Spinner /> : null;
  // const content = !(loading || error || !char) ? <View char={char} /> : null;

  return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;
  let imgStyle = { objectFit: "cover" };
  if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
    imgStyle = { objectFit: "unset" };
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <p className="char__basics-name">{name}</p>
          <div className="char__btns">
            <a href={homepage} className="btn btn__main">
              <div className="inner">HOMEPAGE</div>
            </a>
            <a href={wiki} className="btn btn__secondary">
              <div className="inner">WIKI</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "Comics not found"}
        {comics.map((item, i) => {
          // eslint-disable-next-line
          if (i > 10) {
            return;
          }

          return (
            <li key={i} className="char__comics-item">
              <Link to={`/comics/${item.resourceURI.split("/").pop()}`}>{item.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
