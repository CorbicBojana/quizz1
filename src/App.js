import React, { useState, useEffect } from "react";

import Popup from "./popup/Popup";
import Questions from "./questions/Questions";
import Footer from "./questions/Footer";

import instance from "./axios";

import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [showQuestions, setShowQuestions] = useState(false);
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [category, setCategory] = useState();
  const [difficulty, setDifficulty] = useState("");
  const [changeCategory, setChangeCategory] = useState([]);

  const getCategoryQuestions = () => {
    instance
      .get(`/api_category.php`)
      .then(response => {
        const categoryData = response.data.trivia_categories;
        setChangeCategory(categoryData);
      })
      .catch(error => console.log(error));
  };

  useEffect(() => {
    getCategoryQuestions();
  }, []);

  const handleRestart = () => {
    setShowQuestions(false);
  };

  const handleSubmit = values => {
    const { numberOfQuestions, category, difficulty } = values;

    const getData = () => {
      instance
        .get(
          `/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}&type=multiple`
        )
        .then(response => {
          const data = response.data.results;
          setData(data);
        })
        .catch(error => console.log(error));

      if (category === "" && difficulty === "") {
        instance
          .get(`/api.php?amount=${numberOfQuestions}`)
          .then(response => {
            const data = response.data.results;
            setData(data);
          })
          .catch(error => console.log(error));
      }
    };
    setShowQuestions(true);
    setNumberOfQuestions(numberOfQuestions);
    setCategory(category);
    setDifficulty(difficulty);
    getData();

    console.log("submit", numberOfQuestions, category, difficulty);
  };

  return (
    <>
      {showQuestions ? (
        <>
          <Questions handleRestart={handleRestart} data={data} />
          <Footer />
        </>
      ) : (
        <Popup
          data={data}
          handleSubmit={handleSubmit}
          changeCategory={changeCategory}
        />
      )}
    </>
  );
}

export default App;
