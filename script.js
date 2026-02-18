const data = {
  abecedario: [
    { value: "A", description: "A de Árbol", speech: "A de árbol" },
    { value: "B", description: "B de Barco", speech: "B de barco" },
    { value: "C", description: "C de Casa", speech: "C de casa" },
    { value: "D", description: "D de Dado", speech: "D de dado" },
    { value: "E", description: "E de Elefante", speech: "E de elefante" },
    { value: "F", description: "F de Flor", speech: "F de flor" },
    { value: "G", description: "G de Gato", speech: "G de gato" }
  ],
  vocales: [
    { value: "A", description: "A como en Árbol", speech: "Vocal A" },
    { value: "E", description: "E como en Estrella", speech: "Vocal E" },
    { value: "I", description: "I como en Isla", speech: "Vocal I" },
    { value: "O", description: "O como en Oso", speech: "Vocal O" },
    { value: "U", description: "U como en Uva", speech: "Vocal U" }
  ],
  numeros: [
    { value: "1", description: "Uno 🍎", speech: "Número uno" },
    { value: "2", description: "Dos 🍎🍎", speech: "Número dos" },
    { value: "3", description: "Tres 🍎🍎🍎", speech: "Número tres" },
    { value: "4", description: "Cuatro ⭐", speech: "Número cuatro" },
    { value: "5", description: "Cinco ⭐", speech: "Número cinco" },
    { value: "6", description: "Seis ⭐", speech: "Número seis" },
    { value: "7", description: "Siete ⭐", speech: "Número siete" },
    { value: "8", description: "Ocho ⭐", speech: "Número ocho" },
    { value: "9", description: "Nueve ⭐", speech: "Número nueve" },
    { value: "10", description: "Diez ⭐", speech: "Número diez" }
  ],
  english: [
    { value: "Red", description: "Rojo", speech: "Red" },
    { value: "Blue", description: "Azul", speech: "Blue" },
    { value: "Dog", description: "Perro", speech: "Dog" },
    { value: "Cat", description: "Gato", speech: "Cat" },
    { value: "Sun", description: "Sol", speech: "Sun" },
    { value: "Moon", description: "Luna", speech: "Moon" }
  ]
};

const quizData = {
  abecedario: {
    question: "¿Cuál es la primera letra del abecedario?",
    options: ["A", "E", "Z"],
    answer: "A"
  },
  vocales: {
    question: "¿Cuál de estas letras es una vocal?",
    options: ["M", "O", "T"],
    answer: "O"
  },
  numeros: {
    question: "¿Qué número viene después del 2?",
    options: ["3", "5", "1"],
    answer: "3"
  },
  english: {
    question: "¿Cómo se dice “gato” en inglés?",
    options: ["Dog", "Cat", "Bird"],
    answer: "Cat"
  }
};

const cardLabel = document.getElementById("cardLabel");
const cardValue = document.getElementById("cardValue");
const cardDescription = document.getElementById("cardDescription");
const speakBtn = document.getElementById("speakBtn");
const quizQuestion = document.getElementById("quizQuestion");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");

let category = "abecedario";
let index = 0;

function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function renderCard() {
  const current = data[category][index];
  cardLabel.textContent = capitalize(category);
  cardValue.textContent = current.value;
  cardDescription.textContent = current.description;
}

function speak(text) {
  if (!window.speechSynthesis) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = category === "english" ? "en-US" : "es-ES";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function nextCard() {
  index = (index + 1) % data[category].length;
  renderCard();
}

function prevCard() {
  index = (index - 1 + data[category].length) % data[category].length;
  renderCard();
}

function randomCard() {
  index = Math.floor(Math.random() * data[category].length);
  renderCard();
}

function renderQuiz() {
  const currentQuiz = quizData[category];
  quizQuestion.textContent = currentQuiz.question;
  quizFeedback.textContent = "";
  quizFeedback.className = "quiz-feedback";
  quizOptions.innerHTML = "";

  currentQuiz.options.forEach((option) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => {
      const success = option === currentQuiz.answer;
      quizFeedback.textContent = success
        ? "🎉 ¡Muy bien!"
        : `💡 Inténtalo otra vez. La respuesta correcta es ${currentQuiz.answer}.`;
      quizFeedback.className = `quiz-feedback ${success ? "success" : "error"}`;
    });
    quizOptions.appendChild(button);
  });
}

function setCategory(newCategory) {
  category = newCategory;
  index = 0;
  renderCard();
  renderQuiz();

  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });
}

document.getElementById("nextBtn").addEventListener("click", nextCard);
document.getElementById("prevBtn").addEventListener("click", prevCard);
document.getElementById("randomBtn").addEventListener("click", randomCard);
speakBtn.addEventListener("click", () => {
  const current = data[category][index];
  speak(`${current.value}. ${current.speech}`);
});

document.querySelectorAll(".category-btn").forEach((btn) => {
  btn.addEventListener("click", () => setCategory(btn.dataset.category));
});

renderCard();
renderQuiz();
