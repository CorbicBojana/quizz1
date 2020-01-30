import React, { useState } from "react";

function Popup(props) {
  const { handleSubmit, data, changeCategory } = props;
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");

  /*const reduseData = Object.values(
    data.reduce((r, o) => {
      r[o.difficulty] = o;
      return r;
    }, {})
  );
  const sortData = reduseData.sort((a, b) => {
    if (a.difficulty < b.difficulty) return -1;
    if (a.difficulty > b.difficulty) return 1;
    return 0;
  });*/

  return (
    <div className="popup-container">
      <div className="popup">
        <h1>Welcome to Quizz</h1>
        <p>
          This is a quiz application built using ReactJS.
          <br />
          <br />
        </p>
        <div className="setup-questions">
          Number of Questions
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit({ numberOfQuestions, category, difficulty });
            }}
          >
            <input
              value={numberOfQuestions}
              onChange={e => setNumberOfQuestions(e.target.value)}
              min="1"
              max="50"
              type="number"
              className="setup-questions-input"
              name="numberOfQuestions"
            ></input>
            <div className="setup-questions">
              Difficulty
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="select"
                name="difficulty"
              >
                {/*sortData.map((x, y) => (
                  <option key={y}>{x.difficulty}</option>
                ))*/}
                <option>easy</option>
                <option>medium</option>
                <option>hard</option>
              </select>
            </div>
            <div className="setup-questions">
              Category
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="select"
                name="category"
              >
                {changeCategory.map((x, y) => (
                  <option key={y}>{x.name}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="button">
              Start the quiz with {numberOfQuestions} questions
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Popup;
