document.addEventListener("DOMContentLoaded", function () {
  const questions = document.querySelectorAll(".question");
  const username = "user";
  const password = "password";
  const resultContainer = document.querySelector(".result");
  const fullnameInput = document.querySelector(".fullname-input");
  const startButton = document.getElementById("start-test");
  const fullnameField = document.getElementById("fullname");
  const questionList = document.querySelector(".question-list");
  //const retryButton = document.createElement("button"); // Создаем кнопку для повторного прохождения теста
  // retryButton.textContent = "Пройти тест заново"; // Устанавливаем текст кнопки
  // retryButton.style.display = "none"; // Скрываем кнопку по умолчанию
  // retryButton.classList.add("resetTestBtn");
  // retryButton.addEventListener("click", resetTest); // Добавляем обработчик события при клике на кнопку

  let score = 0;
  let numberOfQuestionsToShow = 10; // Specify the number of questions to display

  // Hide question list and result container initially
  questionList.style.display = "none";
  resultContainer.style.display = "none";

  startButton.addEventListener("click", startTest);

  function startTest() {
    score = 0; // Сбрасываем счет при начале нового теста
    const fullname = fullnameField.value.trim();

    if (fullname === "") {
      alert("Please enter your full name.");
      return;
    }

    // Show question list and hide full name input
    questionList.style.display = "block";
    fullnameInput.style.display = "none";
    //retryButton.style.display = "none"; // Скрываем кнопку повторного прохождения теста

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
  }

  function resetTest() {
    score = 0;
    resultContainer.style.display = "none";
    questions.forEach((question) => {
      question.classList.remove("answered");
      question.querySelectorAll(".option").forEach((option) => {
        option.disabled = false;
        option.classList.remove("correct", "incorrect");
      });
    });
    startTest();
  }

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

  // async function sendRequest() {
  //   try {
  //     const response = await fetch("http://localhost:8080/saveResult", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         name: "ИМЯJavaScript",
  //         score: 227,
  //         dateTime: "3",
  //       }),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }

  // sendRequest();

  function showResult() {
    const totalQuestions = numberOfQuestionsToShow;
    resultContainer.innerHTML = `<p>Результат: ${score} из ${totalQuestions}</p>`;
    resultContainer.style.display = "block";
    if (score < 4) {
      resultContainer.innerHTML += "<p>Тест не пройден</p>";

      //resultContainer.appendChild(retryButton); // Показываем кнопку повторного прохождения теста
      //retryButton.style.display = "block";
    } else {
      // Если результаты удовлетворительные, делаем POST-запрос на сервер

      // Ваш код для отправки данных на сервер (POST-запрос)
      // Например, используя fetch API
      try {
        let myDateTime = new Date().toLocaleString();
        myDateTime = myDateTime.replace(/['",]/g, "");
        const response = fetch(
          "https://initial-java2.onrender.com/saveResult",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: fullnameField.value.trim(),
              score: score,
              dateTime: myDateTime,
            }),
          }
        );
        const data = response.toLocaleString();
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
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
