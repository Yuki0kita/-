let currentQuestionIndex = 0;
let correctAnswers = 0;
let allQuestions = [];
let selectedQuestions = [];
const NUM_QUESTIONS = 30;

function loadQuestions() {
  fetch('questions.json')
    .then(response => response.json())
    .then(data => {
      allQuestions = data;
      selectRandomQuestions();
      displayQuestion();
    })
    .catch(error => console.error('Error loading questions:', error));
}

function selectRandomQuestions() {
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  selectedQuestions = shuffled.slice(0, NUM_QUESTIONS);
  currentQuestionIndex = 0;
  correctAnswers = 0;
}

function displayQuestion() {
  const question = selectedQuestions[currentQuestionIndex];
  document.getElementById("question").textContent = question.question;
  const choicesContainer = document.getElementById("choices");
  choicesContainer.innerHTML = '';
  question.choices.forEach((choice, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = choice;
    button.onclick = () => selectAnswer(index);
    li.appendChild(button);
    choicesContainer.appendChild(li);
  });
  document.getElementById("submit").disabled = false;
}

function selectAnswer(choiceIndex) {
  const question = selectedQuestions[currentQuestionIndex];
  const isCorrect = question.choices[choiceIndex] === question.answer;
  document.getElementById("feedback").textContent = isCorrect ? "正解！" : "不正解";
  if (isCorrect) correctAnswers++;
  document.getElementById("explanation").textContent = question.explanation;
  document.getElementById("submit").disabled = true;
}

document.getElementById("submit").onclick = () => {
  if (currentQuestionIndex < selectedQuestions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
  } else {
    showResults();
  }
};

function showResults() {
  const score = document.getElementById("score");
  const passed = correctAnswers >= selectedQuestions.length * 0.6;
  score.textContent = `合計正解数: ${correctAnswers} / ${selectedQuestions.length} - ${passed ? "合格" : "不合格"}`;
