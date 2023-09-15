import img from "./error.gif";
import { useNavigate } from "react-router-dom";

const ErrorMessage = () => {
  const navigate = useNavigate();
  // Обращение к папке public
  //   return <img src={process.env.PUBLIC_URL + "/error.gif"} />;
  return (
    <>
      <img
        style={{ display: "block", width: "250px", height: "250px", objectFit: "contain", margin: "0 auto" }}
        src={img}
        alt="Error"
      />
      {/* <button
        style={{
          display: "block",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "24px",
          margin: "30px auto",
          padding: "5px",
          border: "1px solid #000",
          width: "max-content",
          cursor: "pointer",
        }}
        onClick={() => navigate(-1)}
      >
        Go Back
      </button> */}
    </>
  );
};

export default ErrorMessage;
