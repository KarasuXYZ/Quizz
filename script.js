const startButton = document.getElementById("startButton");
const quizContainer = document.getElementById("quizContainer");
const questionText = document.getElementById("questionText");
const questionImage = document.getElementById("questionImage");
const answerButtons = document.querySelectorAll(".answerButton");

let score = 0; 
let questionCount = 0; 

// 15 pytań z zakresu informatyki – każdy obiekt zawiera tekst pytania, obrazek (dla uproszczenia placeholder lub dedykowane zasoby),
// tablicę z trzema opcjami oraz indeks poprawnej odpowiedzi.
const questions = [
  { 
    text: "Co jest mógzgiem komputera?",
    image: "Images/mózgpc.png",
    answers: ["Procesor", "Monitor", "Klawiatura"],
    correct: 0 
  },
  { 
    text: "Co to jest Ctrl+C?",
    image: "Images/control.png",
    answers: ["Skrót do kopiowania", "Skrót do cięcia", "Skrót do wklejania"],
    correct: 0 
  },
  { 
    text: "Co robi 'bug' w programie?",
    image: "Images/bug.png",
    answers: ["To błąd", "To dekoracyjny dodatek", "To nowa funkcja"],
    correct: 0 
  },
  { 
    text: "Czym jest klawiatura?",
    image: "Images/Klawiatura.png",
    answers: ["Urządzenie do pisania", "Instrument muzyczny", "Panel sterowania"],
    correct: 0 
  },
  { 
    text: "Dlaczego programiści robią kopie zapasowe?",
    image: "Images/Backup.jpg",
    answers: ["Bo komputer może się zepsuć", "Bo lubią niespodzianki", "Bo raz zgubili projekt"],
    correct: 0 
  },
  { 
    text: "Który program służy do edycji tekstu?",
    image: "Images/Word.png",
    answers: ["Word", "Excel", "PowerPoint"],
    correct: 0 
  },
  { 
    text: "Co to jest RAM?",
    image: "Images/Ram.png",
    answers: ["Pamięć operacyjna", "Rodzaj dysku", "Karta graficzna"],
    correct: 0 
  },
  { 
    text: "Co oznacza skrót HTML?",
    image: "Images/HTML.png",
    answers: ["HyperText Markup Language", "Hyper Transfer Mail Language", "HighText Machine Language"],
    correct: 0 
  },
  { 
    text: "Jaki program służy do tworzenia stron internetowych?",
    image: "Images/Program.png",
    answers: ["Visual Studio Code", "Notepad", "Excel"],
    correct: 0 
  },
  { 
    text: "Czym jest firewall?",
    image: "Images/Firewall.png",
    answers: ["Ochroną sieci", "Nowym wirusem", "Programem do edycji zdjęć"],
    correct: 0 
  },
  { 
    text: "Co oznacza debugowanie?",
    image: "Images/debugowanie.png",
    answers: ["Usuwanie błędów z kodu", "Pisanie dokumentacji", "Aktualizację systemu"],
    correct: 0 
  },
  { 
    text: "Jaki system operacyjny produkuje Apple?",
    image: "Images/Apple.png",
    answers: ["macOS", "Windows", "Linux"],
    correct: 0 
  },
  { 
    text: "Która firma produkuje procesory Ryzen?",
    image: "Images/Ryzen.png",
    answers: ["AMD", "Intel", "Nvidia"],
    correct: 0 
  },
  { 
    text: "Jaki protokół służy do przesyłania stron internetowych?",
    image: "Images/Protokół.png",
    answers: ["HTTP", "FTP", "SMTP"],
    correct: 0 
  },
  { 
    text: "Co to jest GPU?",
    image: "Images/GPU.png",
    answers: ["Karta graficzna", "Pamięć RAM", "Procesor"],
    correct: 0 
  }
];

// Quiz składa się z 15 pytań (wszystkie pytania wyświetlane są raz, kolejność jest losowa)
const TOTAL_QUESTIONS = 4;
let remainingQuestions = []; // kopia pytań do losowania

// Funkcja mieszająca tablicę – używana przy losowaniu pytań i mieszaniu odpowiedzi
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Start quizu
function startQuiz() {
  startButton.style.display = "none";
  quizContainer.classList.remove("conteiner-hidden");
  quizContainer.classList.add("conteiner-visible");
  score = 0;
  questionCount = 0;
  // Mieszamy całą tablicę pytań i kopiujemy ją do remainingQuestions
  remainingQuestions = shuffleArray([...questions]);
  loadQuestion();
}

// Ładowanie pytania – mieszamy kolejność odpowiedzi przed wyświetleniem
function loadQuestion() {
  if (questionCount >= TOTAL_QUESTIONS || remainingQuestions.length === 0) {
    endGame();
    return;
  }
  
  // Pobieramy pierwsze pytanie z pozostałych i usuwamy je, żeby się nie powtórzyło
  const currentQuestion = remainingQuestions.shift();
  
  questionText.innerText = currentQuestion.text;
  questionImage.src = currentQuestion.image;
  
  // Tworzymy tablicę obiektów z odpowiedziami i oznaczamy, która jest poprawna
  let answerOptions = currentQuestion.answers.map((ans, idx) => ({
    text: ans,
    correct: idx === currentQuestion.correct
  }));
  
  // Mieszamy kolejność odpowiedzi
  answerOptions = shuffleArray(answerOptions);
  
  // Wstawiamy odpowiedzi do przycisków
  answerButtons.forEach((button, index) => {
    button.innerText = answerOptions[index].text;
    button.classList.remove("correct", "wrong");
    button.setAttribute("data-correct", answerOptions[index].correct);
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


// Ekran końcowy – wynik wyświetlany jest, a za 5 sekund następuje odświeżenie strony
function endGame() {
    if (score === TOTAL_QUESTIONS) {
      quizContainer.innerHTML = "<h2 class='win'>Wygrałeś/aś! (" + score + "/" + TOTAL_QUESTIONS + ")</h2>";
    } else {
      quizContainer.innerHTML = "<h2 class='lose'>Przegrałeś/aś! (" + score + "/" + TOTAL_QUESTIONS + ")</h2>";
    }
      
    setTimeout(() => { location.reload(); }, 5000);
  }
  

startButton.addEventListener("click", startQuiz);
