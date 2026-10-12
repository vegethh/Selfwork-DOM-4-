// Elementi del DOM
let inputSecondi = document.getElementById("inputSecondi");
let btnStart = document.getElementById("btnStart");
let btnPausa = document.getElementById("btnPausa");
let btnReset = document.getElementById("btnReset");
let display = document.getElementById("display");

// Variabili di controllo
let tempoRimanente = 0;
let intervallo = null;
let inPausa = false;

// Funzione che aggiorna il display
function aggiornaDisplay() {
    display.innerText = tempoRimanente;
}

// BOTTONE AVVIA / RIPRENDI
btnStart.addEventListener("click", function () {

    // Se il timer è già in esecuzione, non fare nulla
    if (intervallo !== null) {
        return;
    }

    // Se non è in pausa, prendo il valore dall'input
    if (inPausa === false) {
        let secondi = Number(inputSecondi.value);

        if (secondi <= 0 || isNaN(secondi)) {
            alert("Inserisci un numero di secondi valido");
            return;
        }

        tempoRimanente = secondi;
    }

    // Avvio il countdown
    intervallo = setInterval(function () {
        tempoRimanente = tempoRimanente - 1;
        aggiornaDisplay();

        // Quando arriva a zero
        if (tempoRimanente <= 0) {
            clearInterval(intervallo);
            intervallo = null;
            inPausa = false;
            display.innerText = "Tempo scaduto!";
        }
    }, 1000);

    inPausa = false;
});

// BOTTONE PAUSA
btnPausa.addEventListener("click", function () {

    if (intervallo !== null) {
        clearInterval(intervallo);
        intervallo = null;
        inPausa = true;
    }
});

// BOTTONE RESET
btnReset.addEventListener("click", function () {

    // Fermo il timer se è attivo
    if (intervallo !== null) {
        clearInterval(intervallo);
        intervallo = null;
    }

    // Azzero tutto
    tempoRimanente = 0;
    inPausa = false;
    inputSecondi.value = "";
    display.innerText = "0";
});