import ErrorMessage from "../errorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Page404 = () => {
  console.log("404");
  const navigate = useNavigate();
  return (
    <div>
      <Helmet>
        <meta name="description" content="This page is not found" />
        <title>Page doesn't exist</title>
      </Helmet>
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "28px", margin: "50px 0" }}>
        Page doesn't exist
      </p>
      <ErrorMessage />
      <button
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
      </button>
    </div>
  );
};

export default Page404;
