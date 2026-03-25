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

// SCRIPT PER L'ANIMAZIONE LETTERA PER LETTERA DEL TITOLO
document.addEventListener('DOMContentLoaded', () => {
    const textBlocks = document.querySelectorAll('.split-text');
    let letterIndex = 0; // Contatore unico per far scorrere l'animazione tra le due righe

    textBlocks.forEach(block => {
        const text = block.textContent; // Prende il testo originale
        block.textContent = ''; // Svuota il contenitore temporaneamente

        text.split('').forEach((char) => {
            const span = document.createElement('span');
            span.classList.add('letter');
            
            if (char === ' ') {
                span.innerHTML = '&nbsp;';
                span.classList.add('space');
            } else {
                span.textContent = char;
            }
            
            // Ritardo progressivo: 0.03s tra una lettera e l'altra (molto rapido!)
            span.style.animationDelay = `${letterIndex * 0.03}s`;
            letterIndex++;
            
            block.appendChild(span);
        });
    });
});