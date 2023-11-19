document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});

function loadQuestion() {
    // ここで質問をロードします。実際にはサーバーから取得するか、
    // あらかじめ定義された質問リストから選択します。
    const questionText = document.getElementById('question');
    const choicesList = document.getElementById('choices-list');
    const submitButton = document.getElementById('submit-btn');

    // 仮の問題データ
    const currentQuestion = {
        question: "ここに問題文が表示されます。",
        choices: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
        answer: "選択肢1"
    };

    questionText.textContent = currentQuestion.question;
    choicesList.innerHTML = '';

    currentQuestion.choices.forEach(choice => {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = choice;
        button.classList.add('choice-btn');
        button.addEventListener('click', () => selectChoice(button, currentQuestion.answer));
        li.appendChild(button);
        choicesList.appendChild(li);
    });

    submitButton.addEventListener('click', submitAnswer);
}

function selectChoice(button, correctAnswer) {
    // 選択された選択肢を処理します。
    const choiceButtons = document.querySelectorAll('.choice-btn');
    choiceButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.classList.add('correct');
        } else {
            btn.classList.add('wrong');
        }
    });
}

function submitAnswer() {
    // 回答を確認してフィードバックを提供します。
    const feedbackElement = document.getElementById('feedback');
    const selectedButton = document.querySelector('.choice-btn.correct');
    if (selectedButton && selectedButton.disabled) {
        feedbackElement.textContent = '正解です！';
        feedbackElement.style.color = 'green';
    } else {
        feedbackElement.textContent = '残念、不正解です。';
        feedbackElement.style
