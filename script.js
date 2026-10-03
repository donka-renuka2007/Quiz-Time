const startScreen=document.getElementById('start-screen');
const quizScreen=document.getElementById('quiz-screen');
const resultScreen=document.getElementById('result-screen');
const startButton=document.getElementById('start-btn');
const questionText=document.getElementById('question-text');
const answersContainer=document.getElementById('answers-container');
const currentQuestionSpan=document.getElementById('current-question');
const totalQuestionSpan=document.getElementById('total-questions');
const scoreSpan=document.getElementById('score');
const finalScoreSpan=document.getElementById('final-score');
const maxScoreSpan=document.getElementById('max-score');
const resultMessage=document.getElementById('result-message');
const restartButton=document.getElementById('restart-btn');
const progressBar=document.getElementById('progress');



const quizQuestions = [
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false }
    ]
  },
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Madrid", correct: false },
      { text: "Paris", correct: true }
    ]
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    answers: [
      { text: "Gold", correct: false },
      { text: "Oxygen", correct: true },
      { text: "Osmium", correct: false },
      { text: "Silver", correct: false }
    ]
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      { text: "Vincent van Gogh", correct: false },
      { text: "Pablo Picasso", correct: false },
      { text: "Leonardo da Vinci", correct: true },
      { text: "Claude Monet", correct: false }
    ]
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Arctic Ocean", correct: false }
    ]
  },
  {
    question: "Which programming language is primarily used for Web page interactivity?",
    answers: [
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true },
      { text: "C++", correct: false },
      { text: "SQL", correct: false }
    ]
  }
];


let currentQuestionIndex=0;
let score=0;
let answersDisabled=false;

totalQuestionSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;

startButton.addEventListener("click",startQuiz)
restartButton.addEventListener("click",restartQuiz);


function startQuiz(){
  currentQuestionIndex=0;
  score=0;
  scoreSpan.textContent=0;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showQuestion()
}
function showQuestion(){
  answersDisabled=false;
  const currentQuestion=quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent=currentQuestionIndex+1;

  const progressPercent=(currentQuestionIndex/quizQuestions.length)*100;
  progressBar.style.width=progressPercent+"%";
  questionText.textContent=currentQuestion.question;

  answersContainer.innerHTML="";
  currentQuestion.answers.forEach(answer =>{
    const button=document.createElement("button");
    button.textContent=answer.text;
    button.classList.add("answer-btn");

    button.dataset.correct=answer.correct;
    button.addEventListener("click",selectAnswer);
    answersContainer.appendChild(button);
});
}

function selectAnswer(event){
  if(answersDisabled)return;
  answersDisabled=true;
  const selectedButton=event.target;
  const isCorrect=selectedButton.dataset.correct ==="true";

  Array.from(answersContainer.children).forEach(button =>{
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }else{
      button.classList.add('incorrect');
    }
  });
  if(isCorrect){
    score++;
    scoreSpan.textContent=score;
  }
  setTimeout(()=>{
    currentQuestionIndex++;
    if(currentQuestionIndex<quizQuestions.length){
      showQuestion();
    }else{
      showResults();
    }
  },1000);
}


function showResults(){
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent=score;
  const percentage=(score/quizQuestions.length)*100;

  if (percentage === 100) {
  resultMessage.textContent = "Perfect score! You're an absolute genius! 🏆";
} else if (percentage >= 80) {
  resultMessage.textContent = "Great job! You really know your stuff! 🌟";
} else if (percentage >= 50) {
  resultMessage.textContent = "Good effort! A little more practice and you'll master it! 👍";
} else {
  resultMessage.textContent = "Don't give up! Give it another try to boost your score! 💪";
}
}
function restartQuiz(){
  resultScreen.classList.remove("active");
  startQuiz();
}