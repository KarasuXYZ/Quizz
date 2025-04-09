const startButton = document.getElementById("startButton");
const quizContainer = document.getElementById("quizContainer");
const questionText = document.getElementById("questionText");
const questionImage = document.getElementById("questionImage");
const answerButtons = document.querySelectorAll(".answerButton");
let score = 0; 
let questionCount = 0; 

// Nowe, humorystyczne pytania dla dzieci z informatyki
const questions = [
  { 
    text: "Jaki element komputera nazywamy 'mózgiem'?", 
    image: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Intel_Core_i7_Processor.png", 
    answers: ["Procesor", "Monitor", "Klawiatura"], 
    correct: 0 
  },
  { 
    text: "Co to jest Ctrl+C?", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Keyboard_key_Ctrl.svg/1200px-Keyboard_key_Ctrl.svg.png", 
    answers: ["Skrót do kopiowania", "Taniej herbaty", "Zamiana na supermoc"], 
    correct: 0 
  },
  { 
    text: "Co robi 'bug' w programie?", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/ENIAC.jpg/800px-ENIAC.jpg", 
    answers: ["To błąd", "Prawdziwy robak w kodzie", "Zamienia kod w marchewkę"], 
    correct: 0 
  },
  { 
    text: "Czym jest klawiatura?", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Computer_keyboard_US.svg/1200px-Computer_keyboard_US.svg.png", 
    answers: ["Urządzenie do pisania", "Nowy rodzaj gitary", "Przeróbka na konsolę do gier"], 
    correct: 0 
  },
  { 
    text: "Dlaczego programiści robią kopie zapasowe?", 
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Backup_icon.svg/1200px-Backup_icon.svg.png", 
    answers: ["Bo komputer może się zepsuć", "Bo lubią niespodzianki", "Bo raz zgubili projekt i płakali"], 
    correct: 0 
  }
];

// Start quizu
function startQuiz() {
  startButton.style.display = "none";
  quizContainer.classList.remove("conteiner-hidden");
  quizContainer.classList.add("conteiner-visible");
  score = 0; 
  questionCount = 0; 
  loadQuestion();
}

// Ładowanie pytania – przed wstawieniem ustawiamy odpowiednim przyciskom czyste tło
function loadQuestion() {
  if (questionCount >= 3) {
    endGame();
    return;
  }
  
  // Losowanie pytania (można zmienić na sekwencyjne)
  const randomIndex = Math.floor(Math.random() * questions.length);
  const question = questions[randomIndex];
  
  questionText.innerText = question.text;
  questionImage.src = question.image;
  
  // Dla każdego przycisku odpowiedzi: ustaw tekst, usuń poprzednie klasy oraz odblokuj przycisk
  answerButtons.forEach((button, index) => {
    button.innerText = question.answers[index];
    button.classList.remove("correct", "wrong");
    button.setAttribute("data-correct", index === question.correct);
    button.style.backgroundColor = "";
    button.disabled = false;
  });
  
  questionCount++;
}

// Sprawdzanie odpowiedzi
function checkAnswer(index) {
  const correct = answerButtons[index].getAttribute("data-correct") === "true";
  
  if (correct) {
    answerButtons[index].classList.add("correct");
    score++;
  } else {
    answerButtons[index].classList.add("wrong");
  }
  
  // Blokujemy wszystkie przyciski
  answerButtons.forEach(button => button.disabled = true);
  
  setTimeout(loadQuestion, 1500);
}

// Ekran końcowy
function endGame() {
  quizContainer.innerHTML = score === 3 
    ? "<h2 class='win'>Wygrałeś/aś!</h2>" 
    : `<h2 class='lose'>Przegrałeś/aś! (${score}/3)</h2>`;
    
  setTimeout(() => { location.reload(); }, 5000);
}

startButton.addEventListener("click", startQuiz);
