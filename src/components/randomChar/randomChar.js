import { useState, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import "./randomChar.scss";

import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { getCharacter, clearError, process, setProcess } = useMarvelService();
  const [show, setShow] = useState();

  useEffect(() => {
    updateChar();
  }, []);

  const onCharLoaded = (char) => {
    setChar(char);
    setShow(true);
  };

  const updateChar = () => {
    setShow(false);
    clearError();
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  return (
    <div className="randomchar">
      <CSSTransition in={show} timeout={400} classNames="randomchar__block">
        {setContent(process, View, char)}
      </CSSTransition>
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today! <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <div>
          <button className="btn btn__main">
            <div className="inner" onClick={updateChar}>
              try it
            </div>
          </button>
        </div>
        <img src={mjolnir} alt="mjolnir" />
      </div>
    </div>
  );
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki } = data;

  let imgStyle = { objectFit: "cover" };
  if (thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
    imgStyle = { objectFit: "unset" };
  }

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="thor" className="randomchar__img" style={imgStyle} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="btn btn__main">
            <div className="inner">HOMEPAGE</div>
          </a>
          <a href={wiki} className="btn btn__secondary">
            <div className="inner">WIKI</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
