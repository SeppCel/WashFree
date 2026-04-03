
// FORZA LO SCROLL IN ALTO AL CARICAMENTO (Hack definitivo per Mobile e Hash URL)
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// 1. Se c'è un # qualcosa nell'URL (es: #pricing), lo pulisce in modo invisibile
if (window.location.hash) {
    history.replaceState(null, null, window.location.pathname + window.location.search);
}

// 2. Forza lo scroll in alto subito...
window.scrollTo(0, 0);

// 3. ... e lo forza di nuovo una frazione di secondo dopo per battere i browser testardi (es. Safari iOS)
setTimeout(() => {
    window.scrollTo(0, 0);
}, 50);


// Gestione dei Tab Pricing (Mese/Anno)
function switchPricing(type) {
    const btnMese = document.getElementById('btn-mese');
    const btnAnno = document.getElementById('btn-anno');
    const priceValues = document.querySelectorAll('.price-value');
    const pricePeriods = document.querySelectorAll('.price-period');

    if (type === 'mese') {
        btnMese.classList.add('bg-neon', 'text-dark', 'shadow-md');
        btnMese.classList.remove('text-slate-400');
        btnAnno.classList.remove('bg-neon', 'text-dark', 'shadow-md');
        btnAnno.classList.add('text-slate-400');

        priceValues.forEach(v => v.textContent = '€' + v.getAttribute('data-mese'));
        pricePeriods.forEach(p => p.textContent = '/mese');
    } else {
        btnAnno.classList.add('bg-neon', 'text-dark', 'shadow-md');
        btnAnno.classList.remove('text-slate-400');
        btnMese.classList.remove('bg-neon', 'text-dark', 'shadow-md');
        btnMese.classList.add('text-slate-400');

        priceValues.forEach(v => v.textContent = '€' + v.getAttribute('data-anno'));
        pricePeriods.forEach(p => p.textContent = '/anno');
    }
}

// SCRIPT PER L'ANIMAZIONE DELLO SCROLL (SUPER DINAMICO)
document.addEventListener('DOMContentLoaded', () => {
    // Selezioniamo direttamente le singole box, non l'intera sezione
    const boxes = document.querySelectorAll('.reveal-box');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Se la box entra nello schermo (scendendo)
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } 
            // Se la box esce dallo schermo (salendo o scendendo troppo)
            else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.1, // Scatta appena il 10% della card è visibile
        rootMargin: "0px 0px -15% 0px" // Fa scattare l'entrata/uscita leggermente prima del fondo pagina
    });

    // Osserva ogni singola box
    boxes.forEach(box => observer.observe(box));
});

// SCRIPT PER L'ANIMAZIONE LETTERA PER LETTERA DEL TITOLO (FIX MOBILE)
document.addEventListener('DOMContentLoaded', () => {
    const textBlocks = document.querySelectorAll('.split-text');
    let letterIndex = 0; // Contatore unico per far scorrere l'animazione tra le due righe

    textBlocks.forEach(block => {
        const text = block.textContent.trim(); // Prende il testo originale
        block.textContent = ''; // Svuota il contenitore temporaneamente

        // 1. Dividiamo prima per parole, non per singole lettere
        const words = text.split(' ');

        words.forEach((word, wIndex) => {
            // Creiamo un "guscio" per la parola che impedisce di spezzarla
            const wordSpan = document.createElement('span');
            wordSpan.style.display = 'inline-block';
            wordSpan.style.whiteSpace = 'nowrap'; // <-- La magia che tiene unite le lettere

            // 2. Ora dividiamo la parola in lettere
            word.split('').forEach((char) => {
                const charSpan = document.createElement('span');
                charSpan.classList.add('letter');
                charSpan.textContent = char;
                
                // Ritardo progressivo
                charSpan.style.animationDelay = `${letterIndex * 0.03}s`;
                letterIndex++;
                
                wordSpan.appendChild(charSpan);
            });

            block.appendChild(wordSpan);

            // 3. Ripristiniamo lo spazio tra una parola e l'altra (tranne per l'ultima)
            if (wIndex < words.length - 1) {
                const spaceSpan = document.createElement('span');
                spaceSpan.innerHTML = '&nbsp;';
                spaceSpan.classList.add('space');
                letterIndex++; // Facciamo contare anche lo spazio nel ritardo per fluidità
                block.appendChild(spaceSpan);
            }
        });
    });
});


// --- SCRIPT PER IL MODAL DI LOGIN / REGISTRAZIONE ---
document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-login-btn');
    const closeBtn = document.getElementById('close-login-btn');
    const modal = document.getElementById('auth-modal');
    
    // Elementi dinamici del form
    const toggleModeBtn = document.getElementById('toggle-auth-mode');
    const authTitle = document.getElementById('auth-title');
    const authSubtitle = document.getElementById('auth-subtitle');
    const authSubmitBtn = document.getElementById('auth-submit-btn');
    const authToggleText = document.getElementById('auth-toggle-text');
    const nameField = document.getElementById('name-field');
    
    let isLoginMode = true;

    // Apri Modal
    openBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        // Piccolo ritardo per permettere al display:flex di applicarsi prima dell'opacità
        setTimeout(() => modal.classList.add('modal-active'), 10);
    });

    // Chiudi Modal
    const closeModal = () => {
        modal.classList.remove('modal-active');
        setTimeout(() => modal.classList.add('hidden'), 300); // Aspetta la fine della transizione
    };

    closeBtn.addEventListener('click', closeModal);

    // --- LOGICA SPA: SIMULAZIONE ACCESSO E TRANSIZIONE ALLA DASHBOARD ---
    authSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Evita il ricaricamento della pagina
        
        // 1. Chiude il Modal con l'animazione
        closeModal();

        // 2. Aspetta che il modal sia svanito, poi cambia view
        setTimeout(() => {
            // Nasconde la Landing Page
            document.getElementById('landing-view').classList.add('hidden');
            
            // Mostra la Dashboard
            document.getElementById('dashboard-view').classList.remove('hidden');
            
            // Forza lo scroll in alto per non far atterrare l'utente a metà pagina
            window.scrollTo(0, 0);
        }, 300); // 300ms corrispondono al tempo della transizione CSS del modal
    });

    // Chiudi se si clicca fuori dal riquadro
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Toggle tra Login e Registrazione
    toggleModeBtn.addEventListener('click', () => {
        isLoginMode = !isLoginMode;
        
        if (isLoginMode) {
            // Modalità Login
            authTitle.textContent = 'Bentornato';
            authSubtitle.textContent = 'Inserisci i tuoi dati per accedere.';
            authSubmitBtn.textContent = 'Accedi';
            authToggleText.textContent = 'Non hai un account?';
            toggleModeBtn.textContent = 'Registrati';
            nameField.classList.add('hidden'); // Nasconde il campo Nome
        } else {
            // Modalità Registrazione
            authTitle.textContent = 'Crea Account';
            authSubtitle.textContent = 'Inizia a lavare la tua auto in modo smart.';
            authSubmitBtn.textContent = 'Registrati Ora';
            authToggleText.textContent = 'Hai già un account?';
            toggleModeBtn.textContent = 'Accedi';
            nameField.classList.remove('hidden'); // Mostra il campo Nome
        }
    });
});


// --- LOGICA LOGOUT: RITORNO ALLA LANDING PAGE ---
document.addEventListener('DOMContentLoaded', () => {
    const logoutBtn = document.getElementById('logout-btn');
    const landingView = document.getElementById('landing-view');
    const dashboardView = document.getElementById('dashboard-view');

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // 1. Nasconde la Dashboard
            dashboardView.classList.add('hidden');
            
            // 2. Mostra la Landing Page
            landingView.classList.remove('hidden');
            
            // 3. Aggiunge l'effetto dissolvenza per un rientro morbido
            landingView.classList.add('fade-in');
            
            // 4. Riporta lo scroll in cima per permettere all'utente 
            // di rivedere l'animazione del titolo se ricarica
            window.scrollTo(0, 0);

            // Opzionale: Rimuove la classe fade-in dopo l'uso per poterla riutilizzare
            setTimeout(() => {
                landingView.classList.remove('fade-in');
            }, 500);
        });
    }
});