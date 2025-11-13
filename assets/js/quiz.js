let currentQuestion = 0;
let score = 0 ;
let question = [] ;
async function getQuestions() {
    const res = await fetch(quiz.json);
    const questions = await res.json;
    returnquiz();
}
function returnquiz() {
    const quiz = document.getElementById();
    const option = document.getElementById();
    const questionItems = 
}
