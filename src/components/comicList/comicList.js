import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import "./comicList.scss";

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case "waiting":
      return <Spinner />;

    case "loading":
      return newItemLoading ? <Component /> : <Spinner />;

    case "confirmed":
      return <Component />;

    case "error":
      return <ErrorMessage />;

    default:
      throw new Error("Unexpected process state");
  }
};

const ComicList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(200);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { getAllComics, process, setProcess } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);

    getAllComics(offset)
      .then(onCharListLoaded)
      .then(() => setProcess("confirmed"));
  };

  const onCharListLoaded = (newComicList) => {
    let ended = false;
    if (newComicList.length < 8) {
      ended = true;
    }

    setComicsList((comicsList) => [...comicsList, ...newComicList]);
    setNewItemLoading(false);
    setOffset((offset) => offset + 8);
    setComicsEnded(ended);
  };

  function renderItems(arr) {
    const items = arr.map((item, id) => {
      return (
        <CSSTransition key={item.id} timeout={500} classNames="comic__item">
          <li className="comic__item">
            <Link to={`${item.id}`}>
              <img src={item.thumbnail} alt={item.title} />
              <div className="comic__item-name">{item.title}</div>
              <div className="comic__item-price">{item.price}</div>
            </Link>
          </li>
        </CSSTransition>
      );
    });
    return (
      <ul className="comic__grid">
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
  }

  return (
    <div className="comic__list">
      {setContent(process, () => renderItems(comicsList), newItemLoading)}

      <button
        className="btn btn__main btn__long "
        disabled={newItemLoading}
        style={{ display: comicsEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">LOAD MORE</div>
      </button>
    </div>
  );

  // return (
  //   <div className="comic__list">
  //     <ul className="comic__grid">
  //       <li className="comic__item">
  //         <a href="#">
  //           <img src={uw} alt="ULTIMATE X-MEN" />
  //           <div className="comic__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
  //           <div className="comic__item-price">9.99$</div>
  //         </a>
  //       </li>
  //       <li className="comic__item">
  //         <a href="#">
  //           <img src={xMen} alt="X-MEN" />
  //           <div className="comic__item-name">X-Men: Days of Future Past</div>
  //           <div className="comic__item-price">NOT AVAILABLE</div>
  //         </a>
  //       </li>
  //       <li className="comic__item">
  //         <a href="#">
  //           <img src={uw} alt="ULTIMATE X-MEN" />
  //           <div className="comic__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
  //           <div className="comic__item-price">9.99$</div>
  //         </a>
  //       </li>
  //       <li className="comic__item">
  //         <a href="#">
  //           <img src={xMen} alt="X-MEN" />
  //           <div className="comic__item-name">X-Men: Days of Future Past</div>
  //           <div className="comic__item-price">NOT AVAILABLE</div>
  //         </a>
  //       </li>
  //       <li className="comic__item">
  //         <a href="#">
  //           <img src={uw} alt="ULTIMATE X-MEN" />
  //           <div className="comic__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
  //           <div className="comic__item-price">9.99$</div>
  //         </a>
  //       </li>
  //       <li className="comic__item">
  //         <a href="#">
  //           <img src={xMen} alt="X-MEN" />
  //           <div className="comic__item-name">X-Men: Days of Future Past</div>
  //           <div className="comic__item-price">NOT AVAILABLE</div>
  //         </a>
  //       </li>
  //       <li className="comic__item">
  //         <a href="#">
  //           <img src={uw} alt="ULTIMATE X-MEN" />
  //           <div className="comic__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
  //           <div className="comic__item-price">9.99$</div>
  //         </a>
  //       </li>
  //       <li className="comic__item">
  //         <a href="#">
  //           <img src={xMen} alt="X-MEN" />
  //           <div className="comic__item-name">X-Men: Days of Future Past</div>
  //           <div className="comic__item-price">NOT AVAILABLE</div>
  //         </a>
  //       </li>
  //     </ul>
  //     <button className="btn btn__main btn__long ">
  //       <div className="inner">LOAD MORE</div>
  //     </button>
  //   </div>
  // );
};

export default ComicList;
