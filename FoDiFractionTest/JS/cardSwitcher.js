const cardList = document.querySelectorAll('.cardList input[type="radio"]');
const lessonText = document.querySelector(".lessonText");
const projectFrames = document.querySelectorAll(".projectWindow");
const messageDiv = document.getElementById("messageDiv");
let currentIndex = -1;
let isLoaded = false;

function loadNextFrame() {
  currentIndex++;
  if (currentIndex < projectFrames.length) {
    projectFrames[currentIndex].src =
      projectFrames[currentIndex].getAttribute("data-src");
    projectFrames[currentIndex].addEventListener("load", loadNextFrame);
  } else {
    isLoaded = true;
    messageDiv.classList.remove("visuallyHidden");
  }
}

loadNextFrame();

cardList.forEach((card, index) => {
  card.addEventListener("change", function () {
    if (isLoaded) {
      if (card.checked) {
        isShouldBeHidden = true;
        projectFrames.forEach((frame) => frame.classList.add("visuallyHidden"));
        projectFrames[index].classList.remove("visuallyHidden");
        messageDiv.classList.add("visuallyHidden");
      }
    }
  });
});

var iframe = document.getElementById("geogebraIframe");
var iframeContent = iframe.contentDocument.documentElement.outerHTML;

// Измените строку согласно вашим требованиям
iframeContent = iframeContent.replace("p", "p");

iframe.contentDocument.open();
iframe.contentDocument.write(iframeContent);
iframe.contentDocument.close();
