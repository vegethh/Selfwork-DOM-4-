let inputSecondi = document.querySelector("#inputSecondi");
let btnStart = document.querySelector("#btnStart");
let btnPausa = document.querySelector("#btnPausa");
let btnReset = document.querySelector("#btnReset");
let display = document.querySelector("#display");

let tempoRimanente = 0;
let intervallo = null;
let inPausa = false;

function aggiornaDisplay() {
  display.innerText = tempoRimanente;
}

// AVVIA / RIPRENDI
btnStart.addEventListener("click", function () {
  // se sta già girando, non fare nulla
  if (intervallo !== null) {
    return;
  }

  // se NON è in pausa, leggo i secondi dall'input
  if (inPausa === false) {
    let secondi = Number(inputSecondi.value);

    if (isNaN(secondi) || secondi <= 0) {
      alert("Inserisci un numero valido");
      return;
    }

    tempoRimanente = secondi;
    aggiornaDisplay();
  }

  // lancio il setInterval (senza clearInterval prima)
  intervallo = setInterval(function () {

    if (tempoRimanente > 0) {
      tempoRimanente = tempoRimanente - 1;
      aggiornaDisplay();
    } else {
      // QUI il clearInterval, come dice il tutor
      clearInterval(intervallo);
      intervallo = null;
      inPausa = false;
      display.innerText = "Tempo scaduto!";
    }

  }, 1000);

  inPausa = false;
});

// PAUSA
btnPausa.addEventListener("click", function () {
  if (intervallo !== null) {
    clearInterval(intervallo); // interrompe il ciclo
    intervallo = null;
    inPausa = true;
  }
});

// RESET
btnReset.addEventListener("click", function () {
  if (intervallo !== null) {
    clearInterval(intervallo);
    intervallo = null;
  }

  tempoRimanente = 0;
  inPausa = false;
  inputSecondi.value = "";
  display.innerText = "0";
});