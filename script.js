// FORZA LO SCROLL IN ALTO AL CARICAMENTO (Risolve il bug su Mobile)
if ('scrollRestoration' in history) {
    // Dice al browser di non ricaricare l'ultima posizione di scroll
    history.scrollRestoration = 'manual';
}

// Assicura che la pagina parta dal pixel 0,0 non appena si carica
window.scrollTo(0, 0);

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