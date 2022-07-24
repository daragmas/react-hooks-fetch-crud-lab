import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
// import QuestionItem from "./QuestionItem";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionsList, setQuestionsList] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then((res) => res.json())
      .then((json) => setQuestionsList(json))
  }, [])

  const handleAddQuestion = (newQuestion) => {
    setQuestionsList([...questionsList, newQuestion])
  }

  const handleDeleteClick = (deletedQuestionID) => {
    const updatedQuestions = questionsList.filter((question) => question.id !== deletedQuestionID)
    setQuestionsList(updatedQuestions)
  }

  const handleUpdateQuestion = (updatedQuestion)=>{
    const updatedQuestions = questionsList.filter((question) =>{
      if (question.id === updatedQuestion.id) return updatedQuestion

      else{return question}
    })
    setQuestionsList(updatedQuestions)
  }

  console.log(questionsList)

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ?
        <QuestionForm onAddQuestion={handleAddQuestion} onChangePage={setPage} /> :
        <QuestionList 
          questions={questionsList} 
          onDeleteClick={handleDeleteClick} 
          onUpdateQuestion={handleUpdateQuestion}/>}
    </main>
  );
}

export default App;
