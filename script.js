const sections = {
  abecedario: {
    title: "Abecedario",
    prompt: "Presiona el botón para descubrir una letra.",
    items: [
      ["A", "A de Árbol"], ["B", "B de Barco"], ["C", "C de Casa"], ["D", "D de Dado"],
      ["E", "E de Elefante"], ["F", "F de Flor"], ["G", "G de Gato"], ["H", "H de Hielo"],
      ["I", "I de Isla"], ["J", "J de Jirafa"], ["K", "K de Koala"], ["L", "L de Luna"],
      ["M", "M de Mano"], ["N", "N de Nube"], ["Ñ", "Ñ de Ñandú"], ["O", "O de Oso"],
      ["P", "P de Pato"], ["Q", "Q de Queso"], ["R", "R de Rana"], ["S", "S de Sol"],
      ["T", "T de Tren"], ["U", "U de Uva"], ["V", "V de Vaca"], ["W", "W de Wifi"],
      ["X", "X de Xilófono"], ["Y", "Y de Yogur"], ["Z", "Z de Zapato"]
    ]
  },
  vocales: {
    title: "Vocales",
    prompt: "Aprende las vocales con ejemplos.",
    items: [["A", "A de Avión"], ["E", "E de Estrella"], ["I", "I de Iglesia"], ["O", "O de Oveja"], ["U", "U de Unicornio"]]
  },
  numeros: {
    title: "Números",
    prompt: "Aprende a contar del 1 al 10.",
    items: [
      ["1", "Uno ☝️"], ["2", "Dos ✌️"], ["3", "Tres 🐻"], ["4", "Cuatro 🚗"], ["5", "Cinco ⭐"],
      ["6", "Seis 🍎"], ["7", "Siete 🌈"], ["8", "Ocho 🎈"], ["9", "Nueve 🐟"], ["10", "Diez 🧩"]
    ]
  },
  ingles: {
    title: "Inglés básico",
    prompt: "Escucha y repite palabras en inglés.",
    items: [
      ["Hello", "Hola"], ["Bye", "Adiós"], ["Red", "Rojo"], ["Blue", "Azul"], ["Dog", "Perro"],
      ["Cat", "Gato"], ["One", "Uno"], ["Two", "Dos"], ["Apple", "Manzana"], ["Sun", "Sol"]
    ]
  }
};

let activeSection = "abecedario";
let currentIndex = 0;

const titleEl = document.getElementById("section-title");
const promptEl = document.getElementById("prompt");
const symbolEl = document.getElementById("main-symbol");
const wordEl = document.getElementById("main-word");
const tabs = document.querySelectorAll(".tab");
const nextBtn = document.getElementById("next-btn");

function renderLesson() {
  const section = sections[activeSection];
  const [symbol, word] = section.items[currentIndex];
  titleEl.textContent = section.title;
  promptEl.textContent = section.prompt;
  symbolEl.textContent = symbol;
  wordEl.textContent = word;
}

function setSection(sectionKey) {
  activeSection = sectionKey;
  currentIndex = 0;
  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.section === sectionKey);
  });
  renderLesson();
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setSection(tab.dataset.section));
});

nextBtn.addEventListener("click", () => {
  const section = sections[activeSection];
  currentIndex = (currentIndex + 1) % section.items.length;
  renderLesson();
});

const vowels = ["A", "E", "I", "O", "U"];
const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const vowelQuestion = document.getElementById("vowel-question");
const vowelOptions = document.getElementById("vowel-options");
const startVowel = document.getElementById("start-vowel");

function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function uniqueOptions(correct, pool, size = 4) {
  const opts = new Set([correct]);
  while (opts.size < size) {
    opts.add(randomItem(pool));
  }
  return [...opts].sort(() => Math.random() - 0.5);
}

function startVowelGame() {
  const correct = randomItem(vowels);
  const options = uniqueOptions(correct, alphabet);
  vowelQuestion.textContent = `¿Cuál de estas es la vocal ${correct}?`;
  vowelQuestion.className = "";
  vowelOptions.innerHTML = "";

  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "option-btn";
    btn.addEventListener("click", () => {
      if (opt === correct) {
        vowelQuestion.textContent = "¡Muy bien! 🎉";
        vowelQuestion.className = "good";
      } else {
        vowelQuestion.textContent = `Ups, era ${correct}. ¡Inténtalo otra vez!`;
        vowelQuestion.className = "bad";
      }
    });
    vowelOptions.appendChild(btn);
  });
}

const countQuestion = document.getElementById("count-question");
const countOptions = document.getElementById("count-options");
const startCount = document.getElementById("start-count");

function startCountGame() {
  const correct = Math.floor(Math.random() * 5) + 1;
  const circles = "🟡".repeat(correct);
  const options = uniqueOptions(correct, [1, 2, 3, 4, 5]);

  countQuestion.textContent = `¿Cuántos círculos hay? ${circles}`;
  countQuestion.className = "";
  countOptions.innerHTML = "";

  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "option-btn";
    btn.addEventListener("click", () => {
      if (opt === correct) {
        countQuestion.textContent = "¡Correcto! 👏";
        countQuestion.className = "good";
      } else {
        countQuestion.textContent = `No exactamente, eran ${correct}.`;
        countQuestion.className = "bad";
      }
    });
    countOptions.appendChild(btn);
  });
}

startVowel.addEventListener("click", startVowelGame);
startCount.addEventListener("click", startCountGame);

renderLesson();
