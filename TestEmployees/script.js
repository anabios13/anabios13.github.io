document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".question");
  const resultContainer = document.querySelector(".result");
  const fullnameInput = document.querySelector(".fullname-input");
  const startButton = document.getElementById("start-test");
  const fullnameField = document.getElementById("fullname");
  const questionList = document.querySelector(".question-list");

  let score = 0;

  // Скрыть список вопросов при загрузке страницы
  questionList.style.display = "none";

  startButton.addEventListener("click", function () {
    const fullname = fullnameField.value.trim();

    if (fullname === "") {
      alert("Пожалуйста, введите ваше ФИО.");
      return;
    }

    // Показать список вопросов и скрыть поле ввода ФИО
    questionList.style.display = "block";
    fullnameInput.style.display = "none";
  });

  questions.forEach((question) => {
    const options = question.querySelectorAll(".option");

    options.forEach((option) => {
      option.addEventListener("click", function () {
        if (!question.classList.contains("answered")) {
          question.classList.add("answered");

          if (option.dataset.correct === "true") {
            option.classList.add("correct");
            score++;
          } else {
            option.classList.add("incorrect");
          }

          options.forEach((otherOption) => {
            if (otherOption !== option) {
              otherOption.disabled = true;
            }
          });

          const allAnswered = Array.from(questions).every((question) =>
            question.classList.contains("answered")
          );
          if (allAnswered) {
            showResult();
          }
        }
      });
    });
  });

  function showResult() {
    const totalQuestions = questions.length;
    resultContainer.innerHTML = `<p>Результат: ${score} из ${totalQuestions}</p>`;
    resultContainer.style.display = "block";
  }
});
