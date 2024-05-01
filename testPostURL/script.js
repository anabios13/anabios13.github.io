function sendRequest() {
  const url = "https://initial-java2.onrender.com/login";
  // Отправляем GET-запрос
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ошибка при отправке запроса: ${response.status}`);
      }
      console.log("Запрос успешно отправлен");
    })
    .catch((error) => {
      console.error(error);
    });
}

// Отправляем запрос каждую минуту
setInterval(sendRequest, 60000);
