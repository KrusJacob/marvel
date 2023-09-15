import "./appBanner.scss";

import avengers from "../../resources/img/Avengers.png";
import logo from "../../resources/img/Avengers_logo.png";

const AppBanner = () => {
  return (
    <div className="app__banner">
      <img src={avengers} alt="avengers" />
      <div className="app__banner-text">
        New comics every week! <br /> Stay tuned!
      </div>
      <img src={logo} alt="logo" />
    </div>
  );
};

export default AppBanner;
