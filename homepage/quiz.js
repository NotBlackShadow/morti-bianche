const datiQuiz = [
    {
        domanda: "I dipendenti devono acquistare autonomamente i dispositivi di protezione individuale (DPI) necessari per il loro lavoro?",
        risposte: ["Sì", "No", "Solo se sono nuovi assunti", "Dipende dal contratto"],
        rispostaCorretta: "No"
    },
    {
        domanda: "In caso di infortunio sul lavoro, l'azienda è tenuta a fornire assistenza medica e supporto ai dipendenti coinvolti?",
        risposte: ["Sì", "No", "Solo in caso di emergenza grave"],
        rispostaCorretta: "Sì"
    },
    {
        domanda: "I dipendenti possono ignorare le procedure di sicurezza se ritengono che sia necessario per svolgere il lavoro più velocemente?",
        risposte: ["Sì", "No", "Solo in situazioni urgenti", "Solo con il permesso del responsabile"],
        rispostaCorretta: "No"
    },
    {
        domanda: "È consentito adottare misure temporanee o improvvisate per risolvere problemi di sicurezza ritenuti 'poco gravi'?",
        risposte: ["Sì", "No", "Solo con il permesso del superiore", "Dipende dal tipo di problema"],
        rispostaCorretta: "No"
    },
    {
        domanda: "L'azienda deve fornire ai dipendenti una formazione specifica sull'uso corretto dei macchinari e delle attrezzature di lavoro?",
        risposte: ["Sì", "No", "Solo per i nuovi dipendenti", "Solo se il macchinario è pericoloso"],
        rispostaCorretta: "Sì"
    },
    {
        domanda: "I lavoratori hanno il diritto di rifiutare un'attività se ritengono che le condizioni non siano sicure?",
        risposte: ["Sì", "No", "Solo con il permesso del supervisore", "Dipende dal contratto"],
        rispostaCorretta: "Sì"
    }
];


const contenitoreQuiz = document.getElementById('quiz');
const contenitoreRisultati = document.getElementById('risultati');

let indiceDomandaCorrente = 0;
let punteggio = 0;

function mostraDomanda() {
    if (indiceDomandaCorrente < datiQuiz.length) {
        const domandaCorrente = datiQuiz[indiceDomandaCorrente];
        contenitoreQuiz.innerHTML = `
            <div class="domanda">${domandaCorrente.domanda}</div>
            <div id="scelte">
                ${domandaCorrente.risposte.map(risposta => `
                    <button class="risposta" onclick="controllaRisposta('${risposta}')">${risposta}</button>
                `).join('')}
            </div>
            <div id="feedback"></div>
        `;
    } else {
        mostraRisultati();
    }
}

function controllaRisposta(risposta) {
    const domandaCorrente = datiQuiz[indiceDomandaCorrente];
    const feedback = document.getElementById('feedback');

    if (risposta === domandaCorrente.rispostaCorretta) {
        punteggio++;
        feedback.innerHTML = `<span style="color: green;">Risposta corretta!</span>`;
    } else {
        feedback.innerHTML = `<span style="color: red;">Risposta sbagliata. La risposta corretta è "${domandaCorrente.rispostaCorretta}".</span>`;
    }

    indiceDomandaCorrente++;
    setTimeout(mostraDomanda, 1500); // Attendi 1.5 secondi per mostrare il feedback, poi passa alla domanda successiva
}

function mostraRisultati() {
    contenitoreQuiz.innerHTML = '';

    let messaggioRisultati = '';

    if (punteggio === datiQuiz.length) {
        messaggioRisultati = 'Ottimo lavoro! Sei un maestro della sicurezza!';
    } else if (punteggio > datiQuiz.length / 2) {
        messaggioRisultati = 'Non male! Hai risposto correttamente alla maggior parte delle domande.';
    } else {
        messaggioRisultati = 'Puoi fare molto di meglio! Prova a rifare il quiz per schiarirti le idee sulla sicurezza.';
    }

    contenitoreRisultati.innerHTML = `
        <div class="risultati">Hai risposto correttamente a ${punteggio} domande su ${datiQuiz.length}.</div>
        <div class="risultati">${messaggioRisultati}</div>
        <button class="ricomincia" onclick="ricominciaQuiz()">Ricomincia il quiz</button>
    `;
}

function ricominciaQuiz() {
    indiceDomandaCorrente = 0;
    punteggio = 0;
    contenitoreRisultati.innerHTML = '';
    mostraDomanda();
}

mostraDomanda();
