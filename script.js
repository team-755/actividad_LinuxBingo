let calledNumbers = [];
let card = [];

function generateCard() {
  const cardDiv = document.getElementById("bingo-card");
  cardDiv.innerHTML = "";
  card = [];

  // Encabezados BINGO
  const headers = ["B", "I", "N", "G", "O"];
  headers.forEach(h => {
    const cell = document.createElement("div");
    cell.className = "cell header";
    cell.textContent = h;
    cardDiv.appendChild(cell);
  });

  // Generar columnas con números
  for (let col = 0; col < 5; col++) {
    let nums = Array.from({length: 15}, (_, i) => i + 1 + col * 15);
    nums = nums.sort(() => Math.random() - 0.5).slice(0, 5);

    for (let row = 0; row < 5; row++) {
      const cell = document.createElement("div");
      cell.className = "cell";

      if (row === 2 && col === 2) {
        cell.textContent = "★";
        cell.classList.add("marked");
      } else {
        cell.textContent = nums[row];
        cell.onclick = () => cell.classList.toggle("marked");
      }

      cardDiv.appendChild(cell);
      card.push(cell);
    }
  }

  calledNumbers = [];
  document.getElementById("numbers").textContent = "";
}

function callNumber() {
  if (calledNumbers.length >= 75) {
    alert("Ya se cantaron todos los números");
    return;
  }

  let num;
  do {
    num = Math.floor(Math.random() * 75) + 1;
  } while (calledNumbers.includes(num));

  calledNumbers.push(num);

  const letters = ["B", "I", "N", "G", "O"];
  const letter = letters[Math.floor((num - 1) / 15)];
  document.getElementById("numbers").textContent += `${letter}${num} `;

  if (document.getElementById("autoMark").checked) {
    card.forEach(c => {
      if (c.textContent == num) c.classList.add("marked");
    });
  }

  checkWin();
}

function clearMarks() {
  card.forEach(c => {
    if (c.textContent !== "★") c.classList.remove("marked");
  });
}

function resetGame() {
  generateCard();
}

function checkWin() {
  const grid = [];
  for (let i = 0; i < 25; i++) grid.push(card[i].classList.contains("marked"));

  // Filas
  for (let r = 0; r < 5; r++) {
    if (grid.slice(r*5, r*5+5).every(Boolean)) return alert("¡Bingo en fila!");
  }

  // Columnas
  for (let c = 0; c < 5; c++) {
    if ([0,1,2,3,4].map(r => grid[r*5+c]).every(Boolean)) return alert("¡Bingo en columna!");
  }

  // Diagonales
  if ([0,6,12,18,24].map(i => grid[i]).every(Boolean)) return alert("¡Bingo en diagonal!");
  if ([4,8,12,16,20].map(i => grid[i]).every(Boolean)) return alert("¡Bingo en diagonal!");
}
generateCard();
