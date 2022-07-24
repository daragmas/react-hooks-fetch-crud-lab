import React from "react";

function QuestionItem({ question, onDeleteClick, onUpdateQuestion}) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleDeleteClick = ()=>{
    fetch(`http://localhost:4000/questions/${id}`,{
      method: 'DELETE'})
      .then((res)=>res.json())
        .then(()=>onDeleteClick(id))
  }

  const handleUpdateQuestion = (e)=>{
    const newAnswer = (e.target.value)
    fetch(`http://localhost:4000/questions/${id}`, {
      method:'PATCH',
      headers: {'Content-Type': 'application/json'},
      body:JSON.stringify({'correctIndex':parseInt(newAnswer)})
    })
      .then((res)=>res.json())
        .then((json)=>onUpdateQuestion(json))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdateQuestion}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
