document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".question");
  const resultContainer = document.querySelector(".result");
  const fullnameInput = document.querySelector(".fullname-input");
  const startButton = document.getElementById("start-test");
  const fullnameField = document.getElementById("fullname");
  const questionList = document.querySelector(".question-list");

  let score = 0;
  let numberOfQuestionsToShow = 10; // Specify the number of questions to display

  // Hide question list and result container initially
  questionList.style.display = "none";
  resultContainer.style.display = "none";

  startButton.addEventListener("click", function () {
    const fullname = fullnameField.value.trim();

    if (fullname === "") {
      alert("Please enter your full name.");
      return;
    }

    // Show question list and hide full name input
    questionList.style.display = "block";
    fullnameInput.style.display = "none";

    // Shuffle questions and options
    shuffleQuestionsAndOptions();

    // Show only a certain number of questions
    const shownQuestionsIndexes = getRandomIndexes(
      numberOfQuestionsToShow,
      questions.length
    );
    questions.forEach((question, index) => {
      if (!shownQuestionsIndexes.includes(index)) {
        question.style.display = "none";
      }
    });
  });

  function shuffleQuestionsAndOptions() {
    // Shuffle questions
    questionList.innerHTML = "";
    const shuffledQuestions = Array.from(questions).sort(
      () => Math.random() - 0.5
    );

    // Shuffle options in each question
    shuffledQuestions.forEach((question) => {
      const optionsContainer = question.querySelector(".options");
      const shuffledOptions = Array.from(optionsContainer.children).sort(
        () => Math.random() - 0.5
      );
      shuffledOptions.forEach((option) => {
        optionsContainer.appendChild(option);
      });
      questionList.appendChild(question);
    });
  }

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

          const answeredQuestions =
            document.querySelectorAll(".question.answered").length;
          if (answeredQuestions === numberOfQuestionsToShow) {
            showResult();
          }
        }
      });
    });
  });

  function showResult() {
    const totalQuestions = numberOfQuestionsToShow;
    resultContainer.innerHTML = `<p>Результат: ${score} из ${totalQuestions}</p>`;
    resultContainer.style.display = "block";
  }

  function getRandomIndexes(count, max) {
    const indexes = [];
    while (indexes.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indexes.includes(randomIndex)) {
        indexes.push(randomIndex);
      }
    }
    return indexes;
  }
});
