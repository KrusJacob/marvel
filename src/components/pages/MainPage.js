import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/randomChar";
import CharList from "../charList/charList";
import CharInfo from "../charInfo/charInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CharForm from "../form/Form";

import vision from "../../resources/img/vision.png";

const MainPage = () => {
  const [selectedChar, setChar] = useState(null);

  const onCharSelected = (id) => {
    setChar(id);
  };

  console.log("main");

  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel information" />
        <title>Marvel information portal</title>
      </Helmet>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CharForm />
          </ErrorBoundary>
        </div>
      </div>
      <img className="bg-decoration" src={vision} alt="vision" />
    </>
  );
};

export default MainPage;
