import { useState } from "react";
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from "formik";
import { Link } from "react-router-dom";

import "./form.scss";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "This field is required";
  }

  return errors;
};

const CharForm = () => {
  const [char, setChar] = useState(null);
  const { getCharacterByName, clearError, process, setProcess } = useMarvelService();

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = (char) => {
    clearError();

    getCharacterByName(char)
      .then(onCharLoaded)
      .then(() => setProcess("confirmed"));
  };

  const errorMessage = process === "error" ? <ErrorMessage /> : null;
  const results = !char ? null : char.length > 0 ? (
    <SuccesFound char={char} />
  ) : (
    <div className="search search-error">The character was not found. Check the name and try again</div>
  );

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validate={validate}
      onSubmit={(value) => {
        updateChar(value.name);
      }}
    >
      <Form className="form" onChange={(e) => (!e.target.value ? setChar(null) : null)}>
        <label htmlFor="name">Or find a character by name:</label>
        <div className="input">
          <Field placeholder="Enter name" name="name" type="text" />

          <button disabled={process === "loading"} className="btn btn__main" type="submit">
            <div className="inner">FIND</div>
          </button>
          {results}
          {errorMessage}
          <FormikErrorMessage className="search search-error" name="name" component="div" />
        </div>
      </Form>
    </Formik>
  );
};

const SuccesFound = (props) => {
  return (
    <>
      <div className="search search-success">There is! Visit {props.char[0].name} page?</div>
      <Link to={`/characters/${props.char[0].id}`} className="btn btn__secondary">
        <div className="inner">To page</div>
      </Link>
    </>
  );
};

export default CharForm;
